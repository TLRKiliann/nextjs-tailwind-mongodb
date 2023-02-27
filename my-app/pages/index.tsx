import { useState, useEffect } from 'react'
import { useTheme } from "next-themes"
import Layout from "../components/Layout"
import ProductItem from '@/components/ProductItem'
import data from "../utils/data"
import { BsMoon } from 'react-icons/bs'
import { BsSun } from 'react-icons/bs'

type DataProps = {
  data: {
    products: [
      name: string,
      slug: string,
      category: string,
      image: string,
      price: number,
      brand: string,
      rating: number,
      numReviews: number,
      countInStock: number,
      description: string
    ]
  }
}

export default function Home() {

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

        <h2 className="ml-4 text-3xl font-bold text-slate-500">Tailwind test</h2>

        {theme === "light" ? (
          <div>
            <h1 className="ml-4 font-logoText font-bold text-violet-800">
              Dark mode with Tailwind and Next-themes
            </h1>
            <button onClick={switchTheme} className="absolute p-2
              mt-4 mr-3 top-0 right-0 text-xs text-slate-50 bg-violet-800
              border-solid rounded-lg">
              <BsSun size={24} /></button>
          </div>
          
          ) : (

          <div>
            <h1 className="ml-4 font-logoText font-bold text-sky-400">
              Dark mode with Tailwind and Next-themes
            </h1>
            <button onClick={switchTheme} className="absolute p-2
              mt-4 mr-3 top-0 right-0 text-xs text-neutral-900 bg-sky-400
              border-solid rounded-lg">
              <BsMoon size={18} /></button>
          </div>
        )}

        <div className="mt-4 mr-4 ml-4 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {data.products.map((product: any) => (
            <ProductItem key={product.slug} product={product}/>
          ))}
        </div>

      </main>
    </Layout>
  )
}
