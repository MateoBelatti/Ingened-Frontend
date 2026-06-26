export type JwtPayload = {
    email: string;
    exp?: number;
};

export type AuthContextType = {
    user: JwtPayload | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
    setUser: (user: JwtPayload | null) => void; 
};
