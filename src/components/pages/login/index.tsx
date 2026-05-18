import { authClient } from "@/lib/auth-client";

export const LoginPage = () => {

    async function handleLogin() {
        await authClient.signIn.social({
            provider: "google",
        });
    }

    return (
        <button
            className="p-2 rounded bg-amber-400 hover:bg-amber-400/80 active:bg-amber-400/60"
            onClick={handleLogin}>
            Entrar com Google
        </button>
    );
}