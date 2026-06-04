import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAuth } from "@/providers/AuthProvider";

interface HeaderProps {
    setScreenState?: (s: any) => void;
}

export const Header = ({ setScreenState }: HeaderProps) => {

    const { user, isLoading, signOut } = useAuth();

    const nameInitials =
        user?.name
            ?.split(" ")
            .map((word) => word[0])
            .join("")
            .slice(0, 2)
            .toUpperCase() || "US";

    const imgUrl = user?.image || undefined;

    function handleLogoClick() {
        if (setScreenState) {
            setScreenState("idle");
        }
    }

    return (
        <header className="flex justify-between items-center bg-gray-950 p-3 px-6 border-b border-emerald-500/40">
            <div className="flex gap-4 items-center">
                <Link
                    onClick={handleLogoClick}
                    to="/"
                >
                    <img src="/logo.png" alt="logo gli" className="size-10" />
                </Link>

                <h2 className="text-sm font-medium text-white/70">
                    Guia Local Inteligente
                </h2>
            </div>

            {/* Navegação Desktop */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                <Link
                    to="/"
                    className="text-slate-300 hover:text-emerald-400 transition duration-200"
                >
                    Início
                </Link>
                <Link
                    to="/favoritos"
                    className="text-slate-300 hover:text-emerald-400 transition duration-200"
                >
                    Favoritos
                </Link>
                <Link
                    to="/sobre"
                    className="text-slate-300 hover:text-emerald-400 transition duration-200"
                >
                    Sobre
                </Link>
            </nav>

            {
                user ? (
                    <Avatar
                    onClick={signOut}
                    className="size-10 cursor-pointer duration-200 border border-transparent ease-in-out hover:border-emerald-500 hover:rotate-8"
                    >
                        <AvatarImage
                            src={imgUrl}
                            alt={user?.name || "Avatar do usuário"}
                            referrerPolicy="no-referrer"
                            className="object-cover"
                        />

                        <AvatarFallback className="bg-emerald-500 text-white font-medium">
                            {isLoading ? "..." : nameInitials}
                        </AvatarFallback>
                    </Avatar>
                ) :
                (
                    <Link to="/login" className="bg-emerald-600 p-2 px-3 rounded-lg cursor-pointer text-xs duration-200 hover:bg-emerald-500 active:bg-emerald-700">
                        Entrar
                    </Link>
                )
            }
        </header>
    );
};