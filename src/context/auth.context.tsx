import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { AuthContextType, JwtPayload } from "./authContextType"; 

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("Error con AuthContext"); 
    }
    return context;
}

const decodeJwt = (token: string): JwtPayload | null => {
    try {
        if (!token) return null;
        const parts = token.split('.');
        if (parts.length !== 3) return null;
        const payload = parts[1];
        const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
        const parsed = JSON.parse(decoded) as JwtPayload;

        // Si el token tiene una fecha de expiración, validamos que no haya vencido
        if (parsed.exp && parsed.exp * 1000 < Date.now()) {
            console.warn("El token JWT ha expirado.");
            return null;
        }

        return parsed;
    } catch (error) {
        console.error("Error al decodificar JWT:", error);
        return null;
    }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<JwtPayload | null>(() => {
        const storedToken = localStorage.getItem("token");
        if (!storedToken) return null;
        const decoded = decodeJwt(storedToken);
        if (!decoded) {
            localStorage.removeItem("token");
            return null;
        }
        return decoded;
    });
    
    const [token, setToken] = useState<string | null>(() => {
        const storedToken = localStorage.getItem("token");
        if (!storedToken) return null;
        const decoded = decodeJwt(storedToken);
        if (!decoded) {
            return null;
        }
        return storedToken;
    });
    
    // Ahora validamos la sesión verificando que exista el email
    const isAuthenticated = !!user?.email;

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            const decoded = decodeJwt(storedToken);
            if (decoded) {
                setToken(storedToken);
                setUser(decoded);
            } else {
                logout();
            }
        }

        const handleAuthLogout = () => {
            logout();
        };

        window.addEventListener("auth-logout", handleAuthLogout);
        return () => {
            window.removeEventListener("auth-logout", handleAuthLogout);
        };
    }, []);

    const login = (newToken: string) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);

        const decoded = decodeJwt(newToken);
        if (decoded) {
            setUser(decoded);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);
        window.location.href = "/";
    };


    return (
        <AuthContext.Provider value={{ user, token, isAuthenticated, login, logout, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};