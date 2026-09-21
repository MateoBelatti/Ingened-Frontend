export type JwtPayload = {
    email: string;
    exp?: number;
};

export type AuthContextType = {
    user: JwtPayload | null;
    token: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    login: (accessToken: string, refreshToken: string) => void;
    logout: () => void;
    setUser: (user: JwtPayload | null) => void; 
};
