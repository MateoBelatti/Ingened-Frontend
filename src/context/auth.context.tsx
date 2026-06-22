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
        return JSON.parse(decoded);
    } catch (error) {
        console.error("Error al decodificar JWT:", error);
        return null;
    }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<JwtPayload | null>(() => {
        const storedToken = localStorage.getItem("token");
        return storedToken ? decodeJwt(storedToken) : null;
    });
    
    const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
    
    // Ahora validamos la sesión verificando que exista el email
    const isAuthenticated = !!user?.email;

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (!storedToken) return;

        setToken(storedToken);
        const decoded = decodeJwt(storedToken);
        if (decoded) {
            setUser(decoded);
        }
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
    };

    return (
        <AuthContext.Provider value={{ user, token, isAuthenticated, login, logout, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};