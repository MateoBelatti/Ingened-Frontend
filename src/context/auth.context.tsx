import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { AuthContextType, JwtPayload } from "./authContextType"; 

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("Error con AuthContext"); 
    }
    return context;
};

const decodeJwt = (token: string, checkExpiration: boolean = false): JwtPayload | null => {
    try {
        if (!token) return null;
        const parts = token.split('.');
        if (parts.length !== 3) return null;
        const payload = parts[1];
        const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
        const parsed = JSON.parse(decoded) as JwtPayload;

        if (checkExpiration && parsed.exp && parsed.exp * 1000 < Date.now()) {
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
        const storedToken = localStorage.getItem("accessToken") || localStorage.getItem("token");
        const storedRefreshToken = localStorage.getItem("refreshToken");
        if (!storedToken) return null;
        
        // Si hay refreshToken, permitimos decodificar aunque exp de accessToken haya vencido (interceptor lo renovará)
        const decoded = decodeJwt(storedToken, !storedRefreshToken);
        if (!decoded) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            return null;
        }
        return decoded;
    });
    
    const [token, setToken] = useState<string | null>(() => {
        const storedToken = localStorage.getItem("accessToken") || localStorage.getItem("token");
        if (!storedToken) return null;
        return storedToken;
    });

    const [refreshToken, setRefreshToken] = useState<string | null>(() => {
        return localStorage.getItem("refreshToken");
    });

    const login = (newAccessToken: string, newRefreshToken: string) => {
        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("token", newAccessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        setToken(newAccessToken);
        setRefreshToken(newRefreshToken);

        const decoded = decodeJwt(newAccessToken);
        if (decoded) {
            setUser(decoded);
        }
    };

    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        setUser(null);
        setToken(null);
        setRefreshToken(null);
        window.location.href = "/";
    };

    const isAuthenticated = !!user?.email;

    useEffect(() => {
        const storedToken = localStorage.getItem("accessToken") || localStorage.getItem("token");
        const storedRefreshToken = localStorage.getItem("refreshToken");

        if (storedToken) {
            const decoded = decodeJwt(storedToken, !storedRefreshToken);
            if (decoded) {
                setToken(storedToken);
                setUser(decoded);
                setRefreshToken(storedRefreshToken);
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

    return (
        <AuthContext.Provider value={{ user, token, refreshToken, isAuthenticated, login, logout, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};