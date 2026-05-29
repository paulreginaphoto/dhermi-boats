# Guide propriétaire Dhermi Boats

Ce guide sert à modifier le site sans chercher dans tout le code.

## Modifier les offres

- Prix, durées, capacités, descriptions, photos de carte et liens des tours : `data/content.ts`.
- Ordre des tours sur l'accueil et dans les comparatifs : `tourDisplayOrder` dans `data/content.ts`.
- Messages WhatsApp prêts à envoyer : `lib/whatsappMessages.ts`.
- Textes du formulaire complet de réservation : `components/OneMinuteBooking.tsx`.

## Modifier les contacts

- Téléphone, WhatsApp, email, Google Maps, Instagram, TikTok et GetYourGuide : `lib/site.ts`.
- Boutons WhatsApp dans le header, le footer, les pages et la barre mobile utilisent ces valeurs automatiquement.
- Après un changement de téléphone ou WhatsApp, lancer `npm run build` puis `npm run qa:usability`.

## Modifier les textes FR / EN / AL

- Toutes les traductions visibles sont dans `lib/i18n.ts`.
- Les clés sont groupées par langue : `en`, `fr`, `sq`.
- Garder les mêmes clés dans les 3 langues. Si une clé manque, `npm run qa:i18n-links` doit échouer.

## Modifier les photos

- Images publiques : `public/images/`.
- Galerie et images de destinations/tours : `data/content.ts`.
- Garder des images légères en `.webp` ou `.avif`.
- Toujours renseigner un `imageAlt` utile pour les images importantes.

## SEO et anciennes URLs

- Pages principales : `app/*/page.tsx`.
- Canonicals et domaine public : `lib/site.ts`.
- Sitemap : `app/sitemap.ts`.
- Anciennes URLs WordPress/WooCommerce : garder les pages `LegacyRedirectPage` avec canonique + meta-refresh, sans `noindex`, et les règles dans `public/_redirects`.

## Checklist avant publication

1. Lancer `npm run build`.
2. Lancer `npm run lint`.
3. Lancer `npx tsc --noEmit --incremental false`.
4. Lancer `npm run qa:conversion-ux`.
5. Lancer `npm run qa:i18n-links`.
6. Lancer `npm run qa:url-canonicals`.
7. Lancer `npm run qa:final-release`.
8. Lancer `npm run qa:minimal-homepage`.
9. Lancer `npm run qa:five-tour-rail`.
10. Lancer `npm run qa:usability`.

Si tout passe, le site est prêt à publier.
