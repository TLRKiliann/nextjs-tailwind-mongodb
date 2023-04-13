import { useState, useEffect } from 'react'
import { useTheme } from "next-themes"
import Layout from "../components/Layout"
import ProductItem from '@/components/ProductItem'
import { data } from "../utils/data"
import { Data } from "../type/StoreType"
import { BsMoon } from 'react-icons/bs'
import { BsSun } from 'react-icons/bs'

type Product = {
  name: string;
  slug: string;
  category: string;
  image: string;
  price: number;
  brand: string;
  rating: number;
  numReviews: number;
  countInStock: number;
  description: string;
};

export default function Home({ data }: Data) {

  const [isMounted, setIsMounted] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const switchTheme = () => {
    if (isMounted) {
      setTheme(theme === "light" ? "dark" : "light");
    }
  };

  return (
    <Layout title="Home page ">
      <main>

        <h2 className="mt-4 ml-4 text-3xl font-bold text-slate-500">E-commerce Next.js</h2>

        {theme === "light" ? (
          <div>
            <h1 className="ml-4 font-logoText font-bold text-slate-700">
              Dark mode with Tailwind and Next-themes
            </h1>
            <button onClick={switchTheme} className="absolute p-2
              mt-4 mr-3 top-0 right-0 text-xs text-black bg-slate-50
              border-solid rounded-lg">
              <BsMoon size={18} />
            </button>
          </div>
          
          ) : (

          <div>
            <h1 className="ml-4 font-logoText font-bold text-slate-400">
              Dark mode with Tailwind and Next-themes
            </h1>
            <button onClick={switchTheme} className="absolute p-2
              mt-4 mr-3 top-0 right-0 text-xs text-slate-50 bg-black
              border-solid rounded-lg">
              <BsSun size={24} />
            </button>
          </div>
        )}

        <div className="mt-14 mr-14 ml-14 grid grid-cols-1 gap-14 md:grid-cols-3 lg:grid-cols-3">
          {data.products.map((product: Product) => (
            <ProductItem key={product.slug} product={product}/>
          ))}
        </div>

      </main>
    </Layout>
  )
}
