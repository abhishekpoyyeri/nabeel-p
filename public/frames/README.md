# Hero frame sequence

The hero currently runs a **procedural** sequence (a rotating particle form),
so no image files are required — the site works out of the box.

## To use your own Blender / After Effects render

1. Export a 90–120 frame image sequence (JPG ~82% quality, 1920×1080).
2. Name them sequentially: `frame_0001.jpg`, `frame_0002.jpg`, … `frame_0120.jpg`
3. Drop them in this folder (`public/frames/`).
4. In `src/lib/frameSequence.ts`:
   - set `USE_IMAGE_FRAMES = true`
   - set `FRAME_COUNT` to your actual frame count

The scroll engine (preload bar, RAF + ticking, DPR scaling, cover-fit) is
already wired for both modes — nothing else needs to change.
