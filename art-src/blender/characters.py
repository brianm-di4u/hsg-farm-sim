# Valley of Vapors: one jointed character, rendered to layered sprite atlases that the game tints per person.
#
#   "C:\Program Files\Blender Foundation\Blender 5.2\blender.exe" -b --factory-startup --python art-src/blender/characters.py
#
# Writes art-src/blender/characters.blend and art-src/chars-<atlas>.png (packed to WebP by art-pack).
# Units: 1 = one map tile. The character faces -Y ("down", toward the camera) at rest; "left" is rendered,
# "right" is mirrored in the game. Each frame cell is 128x192 px; the ground point under the feet sits at
# (64, 164). Every layer is rendered on its own with the other layers as holdouts, in flat toon greys, so the
# game can multiply-tint skin, hair, shirt and trousers per person. Layer and frame order is mirrored in
# src/js/render/sprites.js (CHAR_LAYERS, CHAR_FRAMES).
import bpy, bmesh, math, os, sys
import numpy as np
from mathutils import Vector

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.normpath(os.path.join(HERE, '..'))
TMP = os.path.join(HERE, 'renders', 'chars')
os.makedirs(TMP, exist_ok=True)
CW, CH = 128, 192
FEET_V = 164 / CH  # ground point, fraction from the top

bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene
scene.render.engine = 'BLENDER_EEVEE'
scene.render.resolution_x, scene.render.resolution_y = CW, CH
scene.render.film_transparent = True
scene.render.image_settings.file_format = 'PNG'
scene.render.image_settings.color_mode = 'RGBA'
scene.view_settings.view_transform = 'Standard'
scene.view_settings.look = 'None'
try: scene.eevee.taa_render_samples = 16
except Exception: pass
scene.world = bpy.data.worlds.new('W'); scene.world.color = (0, 0, 0)

# ------------------------------------------------------------------ materials
def toon(name, col=(1, 1, 1), levels=(0.6, 0.82, 0.97)):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    nt = m.node_tree; nt.nodes.clear()
    d = nt.nodes.new('ShaderNodeBsdfDiffuse'); d.inputs['Color'].default_value = (1, 1, 1, 1)
    s2r = nt.nodes.new('ShaderNodeShaderToRGB')
    bw = nt.nodes.new('ShaderNodeRGBToBW')
    ramp = nt.nodes.new('ShaderNodeValToRGB')
    cr = ramp.color_ramp; cr.interpolation = 'EASE'
    cr.elements[0].position = 0.0; cr.elements[0].color = (levels[0] * 0.92,) * 3 + (1,)
    cr.elements[1].position = 0.12; cr.elements[1].color = (levels[0],) * 3 + (1,)
    e = cr.elements.new(0.22); e.color = (levels[1],) * 3 + (1,)
    e = cr.elements.new(0.42); e.color = (levels[2],) * 3 + (1,)
    e = cr.elements.new(0.75); e.color = (min(1.0, levels[2] * 1.06),) * 3 + (1,)
    mul = nt.nodes.new('ShaderNodeMix'); mul.data_type = 'RGBA'; mul.blend_type = 'MULTIPLY'
    mul.inputs['Factor'].default_value = 1.0
    mul.inputs['B'].default_value = (*col, 1)
    em = nt.nodes.new('ShaderNodeEmission')
    out = nt.nodes.new('ShaderNodeOutputMaterial')
    L = nt.links
    L.new(d.outputs[0], s2r.inputs[0]); L.new(s2r.outputs['Color'], bw.inputs[0]); L.new(bw.outputs[0], ramp.inputs[0])
    L.new(ramp.outputs['Color'], mul.inputs['A']); L.new(mul.outputs['Result'], em.inputs['Color']); L.new(em.outputs[0], out.inputs[0])
    return m

M = {
    'grey': toon('grey'),
    'eye': toon('eye', (0.10, 0.07, 0.06), (1, 1, 1)),
    'shoe': toon('shoe', (0.24, 0.16, 0.11)),
    'white': toon('white', (0.96, 0.95, 0.92)),
    'mouth': toon('mouth', (0.45, 0.22, 0.2), (1, 1, 1)),
    'lens': toon('lens', (0.12, 0.12, 0.13), (1, 1, 1)),
}

# ------------------------------------------------------------------ helpers
COLL = scene.collection
def empty(name, loc, parent=None):
    o = bpy.data.objects.new(name, None); COLL.objects.link(o)
    o.parent = parent; o.location = loc; o.rotation_mode = 'XYZ'
    return o

def mesh_obj(name, bm, parent, loc=(0, 0, 0), mat='grey', smooth=True):
    me = bpy.data.meshes.new(name); bm.to_mesh(me); bm.free()
    if smooth:
        for p in me.polygons: p.use_smooth = True
    o = bpy.data.objects.new(name, me); COLL.objects.link(o)
    o.parent = parent; o.location = loc
    me.materials.append(M[mat])
    return o

def sphere(r, scale=(1, 1, 1), seg=24, rings=16, cut=None):
    bm = bmesh.new()
    bmesh.ops.create_uvsphere(bm, u_segments=seg, v_segments=rings, radius=r)
    for v in bm.verts: v.co = Vector((v.co.x * scale[0], v.co.y * scale[1], v.co.z * scale[2]))
    if cut:
        kill = [v for v in bm.verts if not cut(v.co)]
        bmesh.ops.delete(bm, geom=kill, context='VERTS')
    return bm

def capsule(r, length, seg=16):
    # Along -Z from the origin (a limb hanging from its joint).
    bm = bmesh.new()
    bmesh.ops.create_uvsphere(bm, u_segments=seg, v_segments=12, radius=r)
    for v in bm.verts:
        if v.co.z < 0: v.co.z -= length
    return bm

def cone(r1, r2, h, seg=24, z0=0.0):
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=True, cap_tris=False, segments=seg, radius1=r1, radius2=r2, depth=h)
    for v in bm.verts: v.co.z += z0 + h / 2
    return bm

def torus(R, r, seg=20, rseg=8):
    bm = bmesh.new()
    verts = []
    for i in range(seg):
        a = 2 * math.pi * i / seg
        ring = []
        for j in range(rseg):
            b = 2 * math.pi * j / rseg
            ring.append(bm.verts.new(((R + r * math.cos(b)) * math.cos(a), (R + r * math.cos(b)) * math.sin(a), r * math.sin(b))))
        verts.append(ring)
    for i in range(seg):
        for j in range(rseg):
            bm.faces.new((verts[i][j], verts[(i + 1) % seg][j], verts[(i + 1) % seg][(j + 1) % rseg], verts[i][(j + 1) % rseg]))
    return bm

LAYER = {}  # object name -> layer name
def tag(o, layer): LAYER[o.name] = layer; return o

# ------------------------------------------------------------------ the body
HEAD_Z = 1.0  # head centre above the neck pivot base
root = empty('root', (0, 0, 0))
hips = empty('hips', (0, 0, 0.44), root)
chest = empty('chest', (0, 0, 0.18), hips)
neck = empty('neck', (0, 0, 0.22), chest)          # world z ~0.84
headp = empty('head', (0, 0, 0.18), neck)          # head centre ~1.02
# torso
tag(mesh_obj('torso', sphere(0.2, (1.0, 0.74, 1.12)), hips, (0, 0, 0.19)), 'shirt')
tag(mesh_obj('collar', cone(0.11, 0.08, 0.05), chest, (0, 0, 0.17)), 'shirt')
tag(mesh_obj('neckskin', cone(0.065, 0.06, 0.12), chest, (0, 0, 0.15)), 'skin')
# head
tag(mesh_obj('headball', sphere(0.25, (1.0, 0.94, 0.95), 32, 20), headp), 'skin')
for sx in (-1, 1):
    tag(mesh_obj(f'ear{sx}', sphere(0.055, (0.5, 0.8, 1.0)), headp, (sx * 0.245, 0.02, -0.01)), 'skin')
    tag(mesh_obj(f'eye{sx}', sphere(0.05, (0.85, 0.5, 1.3), 14, 10), headp, (sx * 0.092, -0.214, -0.012), 'eye', True), 'fixed')
    tag(mesh_obj(f'glint{sx}', sphere(0.016, (1, 0.5, 1), 8, 6), headp, (sx * 0.092 + 0.014, -0.238, 0.012), 'white', True), 'fixed')
    o = mesh_obj(f'brow{sx}', capsule(0.014, 0.05), headp, (sx * 0.06, -0.222, 0.075)); o.rotation_euler = (0, math.radians(90 + sx * 12), 0); tag(o, 'hair')
    tag(mesh_obj(f'cheek{sx}', sphere(0.035, (1, 0.4, 0.7), 12, 8), headp, (sx * 0.14, -0.2, -0.075), 'mouth'), 'fixed')
tag(mesh_obj('nose', sphere(0.032, (1, 0.8, 0.8), 12, 8), headp, (0, -0.24, -0.04)), 'skin')
# hair: a cap over the top and back of the head; the long variant adds a low bun and side locks
hair_cut = lambda c: c.z > 0.13 or (c.y > 0.0 and c.z > -0.12) or c.y > 0.13
tag(mesh_obj('hair', sphere(0.268, (1.03, 1.0, 0.98), 32, 20, hair_cut), headp, (0, 0.012, 0.02)), 'hair')
tag(mesh_obj('fringe', sphere(0.11, (1.7, 0.5, 0.42)), headp, (0.0, -0.2, 0.17)), 'hair')
tag(mesh_obj('bun', sphere(0.11), headp, (0, 0.22, -0.06)), 'hairlong')
for sx in (-1, 1): tag(mesh_obj(f'lock{sx}', capsule(0.06, 0.14), headp, (sx * 0.22, 0.04, 0.02)), 'hairlong')
tag(mesh_obj('mouthline', sphere(0.034, (1.4, 0.3, 0.42), 12, 8, lambda c: c.z < 0.004), headp, (0, -0.232, -0.098), 'mouth'), 'fixed')
# arms
ARM = {}
for sx, side in ((1, 'L'), (-1, 'R')):
    sh = empty(f'shoulder.{side}', (sx * 0.215, 0, 0.12), chest)
    tag(mesh_obj(f'upper.{side}', capsule(0.062, 0.15), sh), 'shirt')
    el = empty(f'elbow.{side}', (0, 0, -0.17), sh)
    tag(mesh_obj(f'fore.{side}', capsule(0.055, 0.12), el), 'shirt')
    tag(mesh_obj(f'hand.{side}', sphere(0.062), el, (0, 0, -0.17)), 'skin')
    ARM[side] = (sh, el)
# legs (trousers) and shoes; the dress variant swaps the trousers for a skirt
LEG = {}
for sx, side in ((1, 'L'), (-1, 'R')):
    hp = empty(f'hip.{side}', (sx * 0.09, 0, 0.0), hips)
    tag(mesh_obj(f'thigh.{side}', capsule(0.078, 0.14), hp), 'legs')
    kn = empty(f'knee.{side}', (0, 0, -0.2), hp)
    tag(mesh_obj(f'shin.{side}', capsule(0.068, 0.13), kn), 'legs')
    tag(mesh_obj(f'shoe.{side}', sphere(0.075, (0.95, 1.45, 0.7)), kn, (0, -0.04, -0.2), 'shoe'), 'fixed')
    LEG[side] = (hp, kn)
tag(mesh_obj('skirt', cone(0.27, 0.16, 0.36, 28, -0.36), hips, (0, 0, 0.08)), 'skirt')

# ------------------------------------------------------------------ overlays (hats, beard, glasses)
def hatobj(name, bm, loc=(0, 0, 0), mat='grey'):
    return tag(mesh_obj(name, bm, headp, loc, mat), 'hat-' + name.split('_')[0])
# brimmed farm hat (straw/felt)
hatobj('brim_b', cone(0.31, 0.31, 0.025, 32), (0, 0, 0.15))
hatobj('brim_c', cone(0.2, 0.18, 0.16, 28), (0, 0, 0.16))
# fedora: narrower brim, pinched crown, band
hatobj('fedora_b', cone(0.33, 0.33, 0.022, 32), (0, 0, 0.13))
hatobj('fedora_c', sphere(0.2, (1.0, 1.05, 0.62), 28, 14, lambda c: c.z > -0.05), (0, 0, 0.17))
# cap (flat cap / ball cap): dome plus a visor toward the face
hatobj('cap_d', sphere(0.272, (1.0, 1.0, 0.82), 28, 16, lambda c: c.z > 0.02), (0, 0.0, 0.03))
hatobj('cap_v', sphere(0.16, (1.15, 0.85, 0.16), 20, 10, lambda c: c.y < 0.02), (0, -0.2, 0.06))
# helmet (race helmet): rounder, a ridge, a short brim
hatobj('helmet_d', sphere(0.29, (1.0, 1.06, 0.86), 28, 16, lambda c: c.z > -0.03), (0, 0.01, 0.02))
hatobj('helmet_r', sphere(0.05, (0.7, 4.6, 0.7), 12, 8), (0, 0.02, 0.27))
hatobj('helmet_v', sphere(0.14, (1.1, 0.6, 0.14), 16, 8, lambda c: c.y < 0.0), (0, -0.25, 0.08))
# bonnet: a deep shell around the back and top that frames the face, with a brim forward
hatobj('bonnet_s', sphere(0.3, (1.05, 1.0, 1.0), 28, 18, lambda c: c.y > -0.18 and c.z > -0.16), (0, 0.03, 0.03))
o = hatobj('bonnet_f', sphere(0.29, (1.08, 0.55, 1.05), 28, 16, lambda c: c.y < 0.02 and c.z > -0.05), (0, -0.12, 0.06)); o.rotation_euler = (math.radians(-18), 0, 0)
# headscarf: tight wrap with a knot at the back
hatobj('scarf_s', sphere(0.275, (1.02, 1.0, 1.0), 28, 18, lambda c: c.y > -0.12 and c.z > -0.12), (0, 0.01, 0.02))
hatobj('scarf_k', sphere(0.075, (1.0, 0.8, 0.8)), (0, 0.27, -0.06))
# toque (chef): a band and a tall puffed crown
hatobj('toque_b', cone(0.24, 0.24, 0.08, 28), (0, 0, 0.13))
hatobj('toque_c', sphere(0.25, (1.0, 1.0, 1.15), 28, 16), (0, 0, 0.42))
# fur cap with a tail at the back
hatobj('capfur_c', cone(0.26, 0.24, 0.17, 28), (0, 0, 0.1))
hatobj('capfur_t', capsule(0.055, 0.22), (0.05, 0.27, 0.22))
# beard and glasses
tag(mesh_obj('beard', sphere(0.215, (1.0, 0.8, 0.85), 24, 14, lambda c: c.z < -0.02 and c.y < 0.06), headp, (0, -0.06, -0.06)), 'beard')
for sx in (-1, 1):
    o = mesh_obj(f'lensring{sx}', torus(0.06, 0.012, 20, 6), headp, (sx * 0.09, -0.255, 0.0), 'lens'); o.rotation_euler = (math.pi / 2, 0, 0); tag(o, 'glasses')
tag(mesh_obj('bridge', capsule(0.01, 0.05), headp, (0.025, -0.258, 0.01), 'lens'), 'glasses').rotation_euler = (0, math.pi / 2, 0)

# ------------------------------------------------------------------ camera and light
EL = math.radians(50)
cam_d = bpy.data.cameras.new('Cam'); cam_d.type = 'ORTHO'; cam_d.ortho_scale = 1.3
cam = bpy.data.objects.new('Cam', cam_d); COLL.objects.link(cam); scene.camera = cam
# Put the ground point (0,0,0) at FEET_V of the frame: screen v of the origin = -zt*cos(EL).
zt = (FEET_V - 0.5) * cam_d.ortho_scale / math.cos(EL)
tgt = Vector((0, 0, zt))
cam.location = tgt + Vector((0, -math.cos(EL), math.sin(EL))) * 10
cam.rotation_euler = (math.pi / 2 - EL, 0, 0)
sun_d = bpy.data.lights.new('Sun', 'SUN'); sun_d.energy = 3.0; sun_d.angle = math.radians(8)
sun = bpy.data.objects.new('Sun', sun_d); COLL.objects.link(sun)
sun.rotation_euler = (math.radians(38), math.radians(-30), math.radians(-25))

# ------------------------------------------------------------------ poses
DIRS = {'down': 0.0, 'up': math.pi, 'left': -math.pi / 2}
def reset_pose():
    for o in bpy.data.objects:
        if o.type == 'EMPTY': o.rotation_euler = (0, 0, 0)
    hips.location.z = 0.44
    headp.rotation_euler.x = math.radians(-16)
def pose(direction, kind, k):
    reset_pose()
    root.rotation_euler.z = DIRS[direction]
    sL, eL = ARM['L']; sR, eR = ARM['R']; hL, kL = LEG['L']; hR, kR = LEG['R']
    # arms hang a little away from the body
    sL.rotation_euler.y = math.radians(-8); sR.rotation_euler.y = math.radians(8)
    eL.rotation_euler.x = eR.rotation_euler.x = math.radians(-12)
    if kind == 'walk':
        ph = k * math.pi / 2  # 0 pass, 90 left fwd, 180 pass, 270 right fwd
        sw = math.sin(ph)
        hL.rotation_euler.x = math.radians(-30) * sw; hR.rotation_euler.x = math.radians(30) * sw
        kL.rotation_euler.x = math.radians(38) * max(0, sw) + math.radians(10)
        kR.rotation_euler.x = math.radians(38) * max(0, -sw) + math.radians(10)
        if abs(sw) < 0.1:  # passing: one knee lifted
            (kL if k == 0 else kR).rotation_euler.x = math.radians(42)
            (hL if k == 0 else hR).rotation_euler.x = math.radians(-14)
        sL.rotation_euler.x = math.radians(28) * sw; sR.rotation_euler.x = math.radians(-28) * sw
        hips.location.z = 0.44 + (0.025 if abs(sw) < 0.1 else -0.005)
        chest.rotation_euler.z = math.radians(5) * sw
    elif kind == 'use':
        if k == 0:  # wind up: both arms raised overhead
            sL.rotation_euler.x = sR.rotation_euler.x = math.radians(-160)
            eL.rotation_euler.x = eR.rotation_euler.x = math.radians(-30)
            chest.rotation_euler.x = math.radians(8)
        else:       # strike: arms down and forward, body leaning in
            sL.rotation_euler.x = sR.rotation_euler.x = math.radians(-62)
            eL.rotation_euler.x = eR.rotation_euler.x = math.radians(-8)
            chest.rotation_euler.x = math.radians(-14)
            hips.location.z = 0.42
            hL.rotation_euler.x = math.radians(-14); kL.rotation_euler.x = math.radians(16)
    bpy.context.view_layer.update()

FRAMES = []
for d in ('down', 'up', 'left'):
    FRAMES += [(d, 'idle', 0)] + [(d, 'walk', k) for k in range(4)] + [(d, 'use', 0), (d, 'use', 1)]

# ------------------------------------------------------------------ layers and atlases
BASE = {'trousers': ['skin', 'hair', 'shirt', 'legs', 'fixed'], 'dress': ['skin', 'hair', 'shirt', 'legs', 'fixed']}
VARIANT_OBJS = {
    'trousers': lambda L: L in ('skin', 'hair', 'shirt', 'legs', 'fixed'),
    'dress': lambda L: L in ('skin', 'hair', 'hairlong', 'shirt', 'skirt', 'fixed'),
}
OVERLAYS = ['hat-brim', 'hat-fedora', 'hat-cap', 'hat-helmet', 'hat-bonnet', 'hat-scarf', 'hat-toque', 'hat-capfur', 'beard', 'glasses']
SKIP_IN_DRESS = {'thigh.L', 'thigh.R', 'shin.L', 'shin.R'}

def layer_of(o, variant):
    L = LAYER.get(o.name)
    if variant == 'dress':
        if L == 'hairlong': return 'hair'
        if L == 'skirt': return 'legs'
    return L

def render_cell(path):
    scene.render.filepath = path
    bpy.ops.render.render(write_still=True)

def set_vis(variant, want):
    """Show the variant's body; `want` is the layer to see, everything else in the body is a holdout."""
    for o in bpy.data.objects:
        if o.type != 'MESH': continue
        L = LAYER.get(o.name)
        in_body = VARIANT_OBJS[variant](L) and not (variant == 'dress' and o.name in SKIP_IN_DRESS)
        show = in_body or L == want
        o.hide_render = not show
        o.is_holdout = show and layer_of(o, variant) != want and L != want

def load_px(path):
    img = bpy.data.images.load(path)
    a = np.empty(CW * CH * 4, dtype=np.float32); img.pixels.foreach_get(a)
    bpy.data.images.remove(img)
    return a.reshape(CH, CW, 4)

def save_atlas(name, rows):
    H = CH * len(rows); Wd = CW * len(FRAMES)
    atlas = np.zeros((H, Wd, 4), dtype=np.float32)
    for r, cells in enumerate(rows):
        for c, px in enumerate(cells):
            # Blender pixel rows run bottom-up; atlas row r counts from the top.
            y0 = H - (r + 1) * CH
            atlas[y0:y0 + CH, c * CW:(c + 1) * CW] = px
    img = bpy.data.images.new(name, Wd, H, alpha=True)
    img.pixels.foreach_set(atlas.ravel())
    img.filepath_raw = os.path.join(OUT, name + '.png'); img.file_format = 'PNG'
    img.save()
    print('wrote', img.filepath_raw, Wd, H)

only = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
jobs = [('trousers', BASE['trousers']), ('dress', BASE['dress']), ('overlay', OVERLAYS)]
for variant, layers in jobs:
    if only and variant not in only: continue
    rows = [[] for _ in layers]
    for fi, (d, kind, k) in enumerate(FRAMES):
        pose(d, kind, k)
        for li, L in enumerate(layers):
            set_vis('trousers' if variant == 'overlay' else variant, L)
            p = os.path.join(TMP, f'{variant}-{L}-{fi:02d}.png')
            render_cell(p)
            rows[li].append(load_px(p))
    save_atlas('chars-' + variant, rows)

bpy.ops.wm.save_as_mainfile(filepath=os.path.join(HERE, 'characters.blend'))
print('FRAMES', len(FRAMES))
