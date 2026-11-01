# Tier study: blind A/B brief

You are judging two candidate renderings of **Valley of Vapors**, a browser top-down farming sim being converted to a
classic 16-bit pixel-art look. The campaign's goal (from the user):
- a 2D pixel-art style inspired by classic 16-bit games;
- **maximize the use of available detail levels**;
- stay playable and readable on desktop and phone.

Each image in `games/farm-sim/screenshots/tier-study/` shows the same moment twice, side by side: **OPTION A** on
the left, **OPTION B** on the right. The two options differ only in pixel density (how many art pixels make up a
map tile). Which option is which can change from image to image. Judge each image on its own; do not assume
consistency across images.

Images:
- desktop (1280×800): R03 (farm field with crops), R04 (1886 town), R11 (dialogue with neighbours), R13 (farmyard),
  R15 (animal pen), R16 (1807 camp with neighbours);
- phone (390×844): R04, R11, R13.

For context, the pixel-art benchmarks are in `games/farm-sim/benchmarks/` (SNES-era `snes-*`, plus Stardew, Fields
of Mistria, Sun Haven, Sea of Stars, Chained Echoes and Eastward; ignore `coral-*`). The scoring rubric is in
`games/farm-sim/reviews/RUBRIC.md`.

For **each image**, give:
1. Which option better meets the goal overall (A or B), with one or two sentences of evidence.
2. Scores from 1 to 10 for both options on four of the rubric's categories:
   - `pixel` — craft, and whether it reads as 16-bit-style pixel art;
   - `characters` — readability of people and animals, detail;
   - `environment` — props, buildings, crops, terrain;
   - `readability` — what you can make out at the image's real viewing size, especially on the phone.

Then give an overall recommendation: which density should the game ship with, and what is the strongest risk of
that choice.

End with one fenced ```json block:

```
{"images": {"desktop-R03.png": {"prefer": "A", "A": {"pixel": 0, "characters": 0, "environment": 0, "readability": 0}, "B": {...}}, ...}, "recommend": "A-side density or B-side density described in words", "risk": "..."}
```

Do not edit any file.
