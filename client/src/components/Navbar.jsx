import { Moon, Sun, User2Icon, VideoIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { UseThemeStore } from "../store/UseThemeStore";
import Search from "./Search";

function Navbar() {
  const [theme, setTheme] = useState(false);
  const { changeTheme } = UseThemeStore();

  const toggleTheme = () =>{
    setTheme(!theme);
    changeTheme( theme ? 'dark' : 'light' )
  }

  return (
    <div className="sticky top-0 z-50 bg-accent-content " >
      <div className="flex gap-3 items-center h-fit px-6 py-4  " >
        <div className="flex flex-1/3" >
          <Link to='/' className="text-2xl font-sans " >VIDORA</Link>
        </div>
        <div>
          <Search/>
        </div>
        <div className="flex items-center " >
          <button onClick={toggleTheme} className="cursor-pointer " > { theme ? <Sun className="size-8 " /> : <Moon className="size-8" />  } </button>
        </div>
        <div className="flex gap-5" >
          <Link to='/post' className="flex gap-2 cursor-pointer " ><VideoIcon className="size-8" /></Link>
          <Link to="/profile"><User2Icon className="size-8" /></Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar