import {
  createContext,
  useContext,
  type ReactNode,
} from "react";
import { authClient } from "@/lib/auth-client";
import { useNavigate } from "react-router-dom";

interface AuthUser {
  id: string;
  name: string;
  email: string;
  image: string | null;
}

interface AuthContextData {
  user: AuthUser | null;
  isLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data, isPending } = authClient.useSession();
  const navigate = useNavigate();

  const user = data?.user
    ? {
        id: data.user.id,
        name: data.user.name ?? "",
        email: data.user.email ?? "",
        image: data.user.image ?? null,
      }
    : null;

  async function signInWithGoogle() {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: `${import.meta.env.VITE_FRONTEND_URL}/`,
    });
  }

  async function signOut() {
    await authClient.signOut();
    navigate("/login", { replace: true });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading: isPending,
        signInWithGoogle,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser usado dentro de <AuthProvider>");
  }

  return context;
}
