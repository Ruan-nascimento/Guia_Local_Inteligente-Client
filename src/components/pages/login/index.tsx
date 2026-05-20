import { authClient } from "@/lib/auth-client";

export function LoginPage() {
    async function handleLoginWithGoogle() {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: import.meta.env.URL,
        });
    }

    return (
        <main className="min-h-screen flex items-center justify-center">
            <button
                onClick={handleLoginWithGoogle}
                className="rounded-xl border px-4 py-2 duration-200 hover:bg-gray-100 active:bg-gray-200/10 cursor-pointer"
            >
                Entrar com Google
            </button>
        </main>
    );
}