# Nextjs TypeScript Tailwind Darkmode Mongoose

1. Installation

Official Documentation + module pnpm

└─ $ ▶ pnpm create next-app --typescript

└─ $ ▶ pnpm install -D tailwindcss postcss autoprefixer

└─ $ ▶ npx tailwindcss init -p

└─ $ ▶ pnpm install next-themes

└─ $ ▶ pnpm install react-icons --save

└─ $ ▶ pnpm install @headlessui/react

└─ $ ▶ pnpm install axios

---

2. To use it

└─ $ ▶ git clone ...

└─ $ ▶ cd next-tailwind-mongodb/my-app

└─ $ ▶ pnpm install

add file .env & fill it with :

```
MONGODB_URI=...
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=...
```

`MONGODB_URI` is the URI of your database.

mongodb+srv://username:XXXXXXXXXXX@cluster0.XXXXXX.mongodb.net/projectname?retryWrites=true&w=majority

Replace username and projectname by yours from MongoDB.

---

3. Style Configuration

Look at :

`pages/_app.tsx`

`pages/index.tsx`

`styles/globals.css`

`tailwind.config.js`

`ThemeColor.tsx`

& icons with react-icons

---

4. Layout

`components/Layout.tsx`

children & title are managed by this component for all pages.

cartItemsCount managed by useState to reset or not cart, 

useContext() call cart from `utils/Store.tsx`

cart.cartItems are managed with useEffect() by using reduce() & setCartItemsCount.

```
cartItems: {
  countInStock: number;
  quantity: number;
  name: string;
  slug: string;
  image: string;
  price: number;
}
```

(You can find all items in `type/StoreType.ts`)

useSession() manage user connection with `auth` in `_app.tsx`

SuperHeader.tsx => adapt title for all pages

ToastContainer (when user add a product in cart, a msg appear)

DropdownLink when user (`session.user.name`) is connected
(profile, list of products, logout)

---

5. Index.tsx

Display all product with `components/ProductItem`

useContext() to manage cart, `cartItems.quantity` (state) from `utils/Store.tsx`

call API to call product by `_id`. The underscore id is an id managed with database (make a difference with id of the app).

---

6. ProductItem.tsx & product

components/ProductItem.tsx

Interact with db managed by `index.tsx` with `utils/Store.tsx`.

This component allow you to click img to go to `pages/product/[slug].tsx` or to add product in your cart.

---

---

8. Handle add to Cart

- define react context
- define cart item state
- create add to cart action
- add reducer
- create store provider
- handle add to cart button

utils/Store

`components/ProductItem.tsx (from pages/index.tsx)`

`pages/product/[slug].tsx`

`components/Layout.tsx`

---

9. Authentication

.env

data.ts

