import { useState, useEffect } from 'react'
import { useTheme } from "next-themes"
import { BsMoon } from 'react-icons/bs'
import { BsSun } from 'react-icons/bs'

export default function ThemeColor() {

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
    <div>
      {theme === "light" && isMounted === true ? (
        <div>
          <button onClick={switchTheme} 
            className="absolute z-1 transition duration-300 ease-out p-3 
            top-4 mr-3 right-0 text-slate-300 bg-slate-50/50
            rounded-full shadow shadow-md
            hover:hover:ease-in hover:text-slate-400 hover:bg-slate-100">
            <BsMoon size={18} />
          </button>
        </div>
        
        ) : (

        <div>
          <button onClick={switchTheme} 
            className="absolute z-1 transition duration-300 ease-out p-3
            top-4 mr-3 right-0 text-slate-400/60 bg-slate-800/50
            rounded-full shadow-inner shadow-slate-50/40 
            hover:ease-in hover:text-slate-400/80 hover:bg-slate-800 hover:shadow-none">
            <BsSun size={22} />
          </button>
        </div>
      )}
    </div>
  )
}