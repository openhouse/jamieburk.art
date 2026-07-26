# Photo knowledge QA

These production-mode screenshots bind the East River occurrence to the frozen
historical Layout C commit plus one corrected-credit patch:

`fea303e54c6b5fae36caee872a2a7450501f9e11`

Patch: `layout-c-credit-correction.patch`

Patch SHA-256:
`e2746073bf4dc7b3648b19c4e1eff8fbd4bdf8d5c196de2cc5a0f19d22aebd89`

Resulting Git tree: `3059ab6209621cfbca60d352dd83cc596675600a`
Rendering receipt: `layout-c-render-receipt.json`

| Evidence | CSS viewport | SHA-256 |
|---|---:|---|
| `layout-c-home-360x800.png` | 360 x 800 | `2765480352a9b561abfbf05630984b1bc1d6ed745d7ce70f5b59e9f41bb6362f` |
| `layout-c-home-1280x900.png` | 1280 x 900 | `89ad3b6a6dc190e78e34b8ed682410aa827504bd22ab5557b5934f7d8e8ee6ae` |

## Reproduce

1. Create a detached worktree at the commit above.
2. Apply `layout-c-credit-correction.patch` and verify the resulting tree.
3. Install the locked dependencies with Node 26.
4. Run a production build and start it on a local port.
5. Open `/` in headless Chromium at each declared viewport.
6. Wait for network idle, verify one loaded image, the corrected credit, and no horizontal overflow,
   then capture the viewport without full-page scrolling.
7. Compare the image digests with the table.

The screenshots and receipt are documentary evidence for a corrected
historical candidate on hold. They do not approve the exact occurrence,
dignity, creator crop, production, indexing, a future crop, or a future
edition.
