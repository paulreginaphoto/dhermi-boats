# Manual DNS records for dhermi.boats

If the DNS import still refuses the BIND file, create these records manually.

Delete old WordPress.com `A` records first, especially:

```txt
192.0.78.153
192.0.78.206
```

Then add:

| Type | Name / Host | Value / Target | TTL |
| --- | --- | --- | --- |
| A | @ | 185.199.108.153 | 3600 |
| A | @ | 185.199.109.153 | 3600 |
| A | @ | 185.199.110.153 | 3600 |
| A | @ | 185.199.111.153 | 3600 |
| AAAA | @ | 2606:50c0:8000::153 | 3600 |
| AAAA | @ | 2606:50c0:8001::153 | 3600 |
| AAAA | @ | 2606:50c0:8002::153 | 3600 |
| AAAA | @ | 2606:50c0:8003::153 | 3600 |
| CNAME | www | paulreginaphoto.github.io | 3600 |

Do not add `/dhermi-boats` in DNS. DNS points only to GitHub Pages; the deployed site now lives at the root of `https://dhermi.boats/`.
