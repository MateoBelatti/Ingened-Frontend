import type React from "react";
import { LoginForm } from "../components/auth/loginForm";
import '../styles/pages/authPage.css';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "../components/auth/loaging";
import { useAuth } from "../context/auth.context";

export const AuthPage: React.FC = () => {
    const [loading, setIsLoading] = useState(true);
    const auth = useAuth();
    const nav = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timer); 
    }, []);
    useEffect(() => {
        // Si ya terminó de cargar los 2 segundos y el usuario está autenticado, lo mandamos al home
        if (!loading && auth.isAuthenticated) {
            nav("/home");
        }
    }, [loading, auth.isAuthenticated, nav]);

    return (
        <div className="auth-container">
            {loading ? (
                <LoadingButton />
            ) : (
                <div className="auth-card">
                    {/* Panel izquierdo – formulario */}
                    <div className="auth-form-panel">
                        <LoginForm />
                    </div>

                    {/* Panel derecho – imagen */}
                    <div className="auth-image-panel">
                        <div className="auth-image-tagline">
                            <span>Ingened</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
