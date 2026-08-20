# InnovChromatic Template Gallery

Private presentation app for walking clients through website directions before a build. Open the gallery, pick a category, and preview each template at desktop, tablet, and mobile widths.

## Run locally

```bash
npm install
npm run dev
```

Studio PIN defaults to `preview`. Change it in `.env`:

```
VITE_GALLERY_PIN=preview
```

Leave the value empty to skip the PIN screen.

## What’s inside

33 original homepage designs inspired by how serious brands structure their sites — not copies of any company:

- Real estate
- Gift shops
- Jewelry
- E-commerce
- Clothing stores
- Venture firms
- Cake shops
- Hospitality
- Food ordering

Each template is a full page you can scroll, with a talking-points panel for client conversations.

## Presenting to a client

1. Start the app and unlock the gallery.
2. Filter to their industry.
3. Open a preview and switch Desktop / Tablet / Mobile.
4. Click header nav, hero buttons, product cards, and footer links inside the frame — each first-level page is a real screen (shop, menu, listings, book, journal, locations, cart, and so on). Logo returns home. There is no checkout or login.
5. Use the sidebar page chips to jump without clicking the frame, or “Open full page” for a tab you can walk around.

Routes: `/preview/:id` and `/preview/:id/:page` for the studio frame; `/demo/:id`, `/demo/:id/:page`, and `/demo/:id/item/:itemSlug` for the live template.
