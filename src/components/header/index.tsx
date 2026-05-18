import { Link } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import type { ScreenState } from "@/interfaces/screenState.interface";

export const Header = ({ setScreenState }: { setScreenState: (s: ScreenState) => void }) => {

    return (
        <header className="flex justify-between items-center bg-gray-950 p-3 px-6 border-b border-emerald-500/40">
            <div className="flex gap-4 items-center">
                <Link onClick={() => {
                    setScreenState("idle");
                }} to="/">
                    <img src="./logo.png" alt="logo gli" className="size-10" />
                </Link>
                <h2 className="text-sm font-medium text-white/70">Guia Local Inteligente</h2>
            </div>
            <Avatar className="size-10 cursor-pointer duration-200 border border-transparent ease-in-out hover:border-emerald-500 hover:rotate-8">
                <AvatarImage
                    src="https://github.com/Ruan-nascimento.png"
                    alt="Avatar do usuário"
                />
                <AvatarFallback className="bg-emerald-500 text-white font">US</AvatarFallback>

            </Avatar>
        </header>
    )
}