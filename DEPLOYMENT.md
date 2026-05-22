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

## DNS Records For `dhermi.boats`

At the moment of setup, `dhermi.boats` still resolved to WordPress.com IPs (`192.0.78.153` and `192.0.78.206`). To make the new GitHub Pages site live on the custom domain, update DNS at the domain provider:

```txt
A     @     185.199.108.153
A     @     185.199.109.153
A     @     185.199.110.153
A     @     185.199.111.153
AAAA  @     2606:50c0:8000::153
AAAA  @     2606:50c0:8001::153
AAAA  @     2606:50c0:8002::153
AAAA  @     2606:50c0:8003::153
CNAME www   paulreginaphoto.github.io
```

After DNS propagates, return to GitHub Pages settings and enable HTTPS enforcement if GitHub has not enabled it automatically.

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
