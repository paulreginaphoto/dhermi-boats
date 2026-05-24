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

## Email From The Static Site

GitHub Pages cannot execute backend code, so it cannot send booking emails by itself.

The site uses a static-compatible backup email path: the one-minute booking form generates a `mailto:` link with the same booking message used for WhatsApp. This keeps WhatsApp as the main conversion flow and avoids depending on a third-party form endpoint from GitHub Pages.

If the owner later wants direct form delivery, use Cloudflare Workers, Google Apps Script or another free serverless endpoint, then wire the form to that endpoint.

## Current GitHub Pages URL

- Repository settings > Pages > Source: `GitHub Actions`.
- Custom domain: `dhermi.boats`.
- Current live URL after DNS propagation: `https://dhermi.boats/`.
- The workflow builds with `NEXT_PUBLIC_BASE_PATH=` and `NEXT_PUBLIC_SITE_ORIGIN=https://dhermi.boats`.

## Custom Domain

The repository includes `public/CNAME` with:

```txt
dhermi.boats
```

The GitHub Pages custom domain is also configured in repository settings. The workflow must keep these values:

```txt
NEXT_PUBLIC_BASE_PATH=
NEXT_PUBLIC_SITE_ORIGIN=https://dhermi.boats
```

## DNS Records For `dhermi.boats`

At the moment of migration, `dhermi.boats` still resolved to WordPress.com IPs (`192.0.78.153` and `192.0.78.206`). To make the new GitHub Pages site live on the custom domain, update DNS at WordPress.com:

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

After DNS propagates, return to GitHub Pages settings and enable HTTPS enforcement if GitHub has not enabled it automatically. DNS changes can take up to 24 hours to propagate.

## Base Path

For `https://dhermi.boats/`, use:

```txt
NEXT_PUBLIC_BASE_PATH=
NEXT_PUBLIC_SITE_ORIGIN=https://dhermi.boats
```

For the old GitHub Pages project URL fallback, use:

```txt
NEXT_PUBLIC_BASE_PATH=/dhermi-boats
NEXT_PUBLIC_SITE_ORIGIN=https://regina.photo
```

With the production configuration, canonical, hreflang, sitemap and `llms.txt` URLs are expected to use `https://dhermi.boats`. The QA script checks this after the static export is built.

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
When testing the old GitHub Pages subpath locally, use a static server that maps `/dhermi-boats/` to the `out/` directory.
