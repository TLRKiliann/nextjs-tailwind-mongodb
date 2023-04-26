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
          <button onClick={switchTheme} className="absolute p-3
            top-5 mr-3 right-0 text-slate-600 bg-slate-50
            rounded-full drop-shadow-md">
            <BsMoon size={18} />
          </button>
        </div>
        
        ) : (

        <div>
          <button onClick={switchTheme} className="absolute p-3
            top-5 mr-3 right-0 text-orange-300 bg-slate-800
            rounded-full drop-shadow-md">
            <BsSun size={22} />
          </button>
        </div>
      )}
    </div>
  )
}