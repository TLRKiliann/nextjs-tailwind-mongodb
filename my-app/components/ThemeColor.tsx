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
            top-4 mr-3 top-0 right-0 text-slate-600 bg-slate-100
            rounded-full drop-shadow-md">
            <BsMoon size={18} />
          </button>
        </div>
        
        ) : (

        <div>
          <button onClick={switchTheme} className="absolute p-3
            top-4 mr-3 top-0 right-0 text-yellow-500 bg-slate-700
            brightness-95 rounded-full drop-shadow-md">
            <BsSun size={24} />
          </button>
        </div>
      )}
    </div>
  )
}