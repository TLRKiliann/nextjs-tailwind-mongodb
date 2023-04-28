# Nextjs TypeScript Tailwind Darkmode Mongoose

Next.js version 13.2

1. Installation

└─ $ ▶ pnpm create next-app --typescript

└─ $ ▶ pnpm install -D tailwindcss postcss autoprefixer

└─ $ ▶ npx tailwindcss init -p

└─ $ ▶ pnpm install next-themes

└─ $ ▶ pnpm install react-icons --save

└─ $ ▶ pnpm install @headlessui/react

└─ $ ▶ pnpm install react-toastify

└─ $ ▶ pnpm install @fontsource/acme

└─ $ ▶ pnpm install axios

└─ $ ▶ pnpm install mongoose

└─ $ ▶ npm install next-auth

└─ $ ▶ pnpm install @types/bcryptjs

└─ $ ▶pnpm install @types/js-cookie

└─ $ ▶ pnpm install react-hook-form

---

2. To use it

└─ $ ▶ git clone [key_link]

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

7. Store.tsx (utils/Store.tsx)

- define react context
- define cart item state
- create add to cart action
- add reducer
- create store provider
- handle add to cart button

utils/Store

`pages/index.tsx`

`components/ProductItem.tsx (from pages/index.tsx)`

`pages/product/[slug].tsx`

`components/Layout.tsx`

---

8. Authentication

Auth from `_app.tsx` is the provider which interact with the API `pages/auth/[...nextauth].ts`, db `utils/db.ts` & useSession()
login.tsx).  

data.ts

.env => MONGODB_URI

- useSession:

`pages/order/[id].tsx` (useSession)

`components/Layout.tsx` (useSession to manage session.user.name with status)

`pages/login.tsx` (useSession) email, password of user to work with signin from next/auth.

`pages/register.tsx` (useSession)

`pages/api/auth/signup.ts` (useSession)

- getToken:

`pages/api/auth/[...nextauth].ts` (getToken)

`pages/api/orders` => all files use getToken (getSession into the past)

---

9. Regitrer

login.tsx, the "check out" btn (cart.tsx (if user not logged in)) send you to register.tsx. 

logout redirect user to main page '/'.

---

10. CheckoutWizard.tsx

- pages/shipping.tsx
- pages/payment.tsx
- pages/pllaceorder.tsx

---

11. Security

Cookie:

- utils/Store.tsx
- pages/shipping.tsx
- pages/payment.tsx
- pages/placeorder.tsx

---

JWT (Json Web Token) getToken from next-auth/jwt:

- pages/api/[...nextauth].ts (use JWT strategy)
- pages/api/orders/index.ts 
- pages/api/orders/[id].ts

---

bcryptjs:

- pages/api/auth/[...nextauth].ts => bcryptjs.compareSync(credentials.password, user.password)
- pages/api/signup.ts => bcryptjs.hashSync(password)
- data.ts => bcrypt.hashSync('XXXXXXXXX') for password

---

TypeScript:

- TS is installed with present app.
- type/StoreType.ts

---

getError():

- utils/error.ts
- pages/placeorder.tsx
- pages/order/[id].tsx
- pages/login.tsx
- pages/register.tsx

---

If status === false (useSession) in `pages/_app.tsx`

`pages/unauthorized.tsx`