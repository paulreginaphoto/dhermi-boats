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

## Current GitHub Pages URL

- Repository settings > Pages > Source: `GitHub Actions`.
- No custom domain is active yet.
- Current live URL: `https://regina.photo/dhermi-boats/`.
- The workflow currently builds with `NEXT_PUBLIC_BASE_PATH=/dhermi-boats`.

## Custom Domain Later

When the domain is recovered, add `public/CNAME` with:

```txt
dhermi.boats
```

Then update `.github/workflows/deploy.yml`:

```txt
NEXT_PUBLIC_BASE_PATH=
NEXT_PUBLIC_SITE_ORIGIN=https://dhermi.boats
```

## DNS Records For `dhermi.boats`

At the moment of setup, `dhermi.boats` still resolved to WordPress.com IPs (`192.0.78.153` and `192.0.78.206`). To make the new GitHub Pages site live on the custom domain, update DNS at the domain provider:

A ready-to-share import file is available in `DNS_DHERMI_BOATS_BIND.zone`. It intentionally contains only simple DNS records because some DNS panels reject full BIND zone files with `SOA`, `NS`, `$ORIGIN` or comments.

If import still fails, use `DNS_DHERMI_BOATS_MANUAL_RECORDS.md` and add the records manually.

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

For the current GitHub Pages project URL, use:

```txt
NEXT_PUBLIC_BASE_PATH=/dhermi-boats
NEXT_PUBLIC_SITE_ORIGIN=https://regina.photo
```

For `https://dhermi.boats/`, use:

```txt
NEXT_PUBLIC_BASE_PATH=
NEXT_PUBLIC_SITE_ORIGIN=https://dhermi.boats
```

Then rebuild through the workflow.

## Local Static Export Test

```bash
npm run build
python -m http.server 4302 -d out
```

Then open `http://127.0.0.1:4302/`.

Useful static files to spot-check after a build:

- `http://127.0.0.1:4302/robots.txt`
- `http://127.0.0.1:4302/llms.txt`
- `http://127.0.0.1:4302/sitemap.xml`
When testing the GitHub Pages subpath locally, use a static server that maps `/dhermi-boats/` to the `out/` directory.
