# Nextjs TypeScript Tailwind Darkmode (like Amazon)

## On The Road Again (OTRA)

1. Installation

Official Documentation + module pnpm

└─ $ ▶ pnpm create next-app --typescript

└─ $ ▶ pnpm install -D tailwindcss postcss autoprefixer

└─ $ ▶ npx tailwindcss init -p

└─ $ ▶ pnpm install next-themes

└─ $ ▶ pnpm install react-icons --save

---

2. Configuration

Look at :

`pages/_app.tsx`

`pages/index.tsx`

`styles/globals.css`

---

3. Layout

components/Layout.tsx

Head set for all pages

header (with navbar)

main

footer

---

4. Product

components/ProductItem.tsx

Interact with db in utils/data.ts and called by index.tsx

---

5. pages/product/[slug].tsx

To display product by name & access to it by a new route.

---

6. Handle add to Cart

- define react context
- define cart item state
- create add to cart action
- add reducer
- create store provider
- handle add to cart button

utils/Store

pages/product/[slug].tsx

components/Layout.tsx

---