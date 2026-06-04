import { GoogleIcon } from "@/components/googleIcon";
import { useAuth } from "@/providers/AuthProvider";
import { Navigate } from "react-router-dom";

export function LoginPage() {
    const { user, isLoading, signInWithGoogle } = useAuth();

    if (user) {
        return <Navigate to="/" replace />;
    }

    return (
        <main className="min-h-screen bg-gray-900 px-6 py-8 text-white flex items-center justify-center">
            <section className="w-full max-w-md">
                <div className="mb-8 flex items-center justify-center gap-3">
                    <img
                        src="/logo.png"
                        alt="Logo GLI"
                        className="size-12"
                    />

                    <div>
                        <h1 className="text-lg font-bold leading-none">
                            Guia Local Inteligente
                        </h1>
                        <p className="mt-1 text-sm text-slate-400">
                            Acesse sua conta
                        </p>
                    </div>
                </div>

                <div className="rounded-3xl border border-emerald-500/30 bg-slate-900 p-6 shadow-xl shadow-black/20 sm:p-8">
                    <div className="mb-8 text-center">
                        <h2 className="text-3xl font-bold leading-tight">
                            Entre para encontrar{" "}
                            <span className="text-emerald-400">
                                regiões
                            </span>
                        </h2>

                        <p className="mt-3 text-sm leading-6 text-slate-400">
                            Use sua conta Google para acessar o app e continuar
                            explorando informações úteis da sua região.
                        </p>
                    </div>

                    <button
                        onClick={signInWithGoogle}
                        disabled={isLoading}
                        className="flex cursor-pointer w-full items-center justify-center gap-3 rounded-2xl bg-white px-4 py-4 font-bold text-gray-900 duration-200 ease-in-out hover:bg-slate-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {isLoading ? (
                            "Carregando..."
                        ) : (
                            <>
                                <GoogleIcon />
                                Entrar com Google
                            </>
                        )}
                    </button>

                </div>
            </section>
        </main>
    );
}
