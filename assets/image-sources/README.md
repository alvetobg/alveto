# Image source archive

This directory contains the original, full-resolution production image files
that were retired from the public web path during the performance pass.

- Files under `public/` mirror their former public paths.
- Production components reference resized WebP derivatives in the real
  `public/` directory.
- `public/images/hero.jpg` remains in place because it is already compact and
  is also used by Open Graph and structured data.
- Do not reference files from this archive at runtime.

Web derivatives were encoded with Sharp at conservative quality settings:

- menu product images: maximum 2000 px width, WebP quality 86
- signature images: maximum 2200 px width, WebP quality 88
- category and experience images: maximum 2400 px width, WebP quality 88
- interior images: maximum 1600 px width, WebP quality 88

The production logo was trimmed to its transparent content bounds and resized
to 1024 px width. The original square-canvas logo is preserved here.
