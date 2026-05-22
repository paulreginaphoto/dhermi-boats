# Deployment

## GitHub Pages

The repository includes `.github/workflows/deploy.yml`.

On every push to `main`, GitHub Actions:

1. Checks out the repository.
2. Installs Node 26.
3. Runs `npm ci`.
4. Runs `npm run build`.
5. Uploads the static `out/` directory.
6. Deploys it to GitHub Pages.

## Required GitHub Settings

- Repository settings > Pages > Source: `GitHub Actions`.
- Custom domain: `dhermi.boats`.
- DNS should point to GitHub Pages according to GitHub's domain instructions.

## Base Path

For `https://dhermi.boats/`, leave `NEXT_PUBLIC_BASE_PATH` blank.

For a repository subpath such as `https://owner.github.io/repo/`, add a repository variable:

```txt
NEXT_PUBLIC_BASE_PATH=/repo
```

Then rebuild through the workflow.

## Local Static Export Test

```bash
npm run build
python -m http.server 4302 -d out
```

Then open `http://127.0.0.1:4302/`.

