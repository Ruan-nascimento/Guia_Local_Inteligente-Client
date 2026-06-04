import { House, Info, Heart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const NavigationMobile = () => {

    const location = useLocation();
    const path = location.pathname;

    return (
        <nav className="md:hidden flex w-full items-center justify-evenly fixed bottom-0 pb-3 bg-gray-950">
            <Link to="/" className={`flex flex-col border-t-3 p-2 items-center text-sm ${path === "/" ? "text-emerald-500 border-emerald-500" : "text-gray-400 border-transparent"} duration-200 ease-in-out hover:text-emerald-500 hover:border-emerald-500 cursor-pointer`}>
                <House />
                Início
            </Link>
            <Link to="/favoritos" className={`flex flex-col border-t-3 p-2 items-center text-sm ${path === "/favoritos" ? "text-emerald-500 border-emerald-500" : "text-gray-400 border-transparent"} duration-200 ease-in-out hover:text-emerald-500 hover:border-emerald-500 cursor-pointer`}>
                <Heart />
                Favoritos
            </Link>
            <Link to="/sobre" className={`flex flex-col border-t-3 p-2 items-center text-sm ${path === "/sobre" ? "text-emerald-500 border-emerald-500" : "text-gray-400 border-transparent"} duration-200 ease-in-out hover:text-emerald-500 hover:border-emerald-500 cursor-pointer`}>
                <Info />
                Sobre
            </Link>
        </nav>
    )
}