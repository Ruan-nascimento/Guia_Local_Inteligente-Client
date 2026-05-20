import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import type { ScreenState } from "@/interfaces/screenState.interface";
import { authClient } from "@/lib/auth-client";

export const Header = ({setScreenState}: {setScreenState: (s: ScreenState) => void}) => {

    const navigate = useNavigate();

    const { data, isPending } = authClient.useSession();

    const user = data?.user;

    const nameInitials =
        user?.name
            ?.split(" ")
            .map((word) => word[0])
            .join("")
            .slice(0, 2)
            .toUpperCase() || "US";

    const imgUrl = user?.image || undefined;

    async function handleSignOut() {
        await authClient.signOut();
        navigate("/login", { replace: true });
    }

    return (
        <header className="flex justify-between items-center bg-gray-950 p-3 px-6 border-b border-emerald-500/40">
            <div className="flex gap-4 items-center">
                <Link
                    onClick={() => {
                        setScreenState("idle");
                    }}
                    to="/"
                >
                    <img src="/logo.png" alt="logo gli" className="size-10" />
                </Link>

                <h2 className="text-sm font-medium text-white/70">
                    Guia Local Inteligente
                </h2>
            </div>

            {
                user ? (
                    <Avatar
                    onClick={handleSignOut}
                    className="size-10 cursor-pointer duration-200 border border-transparent ease-in-out hover:border-emerald-500 hover:rotate-8"
                    >
                        <AvatarImage
                            src={imgUrl}
                            alt={user?.name || "Avatar do usuário"}
                            referrerPolicy="no-referrer"
                            className="object-cover"
                        />

                        <AvatarFallback className="bg-emerald-500 text-white font-medium">
                            {isPending ? "..." : nameInitials}
                        </AvatarFallback>
                    </Avatar>
                ) :
                (
                    <button className="bg-emerald-600 p-2 px-3 rounded-lg cursor-pointer text-xs duration-200 hover:bg-emerald-500 active:bg-emerald-700" onClick={() => navigate("/login")}>
                        Entrar
                    </button>
                )
            }
        </header>
    );
};