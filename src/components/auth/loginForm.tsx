import type React from "react";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import { loginSchema } from "../../utils/login.validate";
import { loginService } from "../../service/auth.service";
import { googleLoginService } from "../../service/googleAuth.service";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import "../../styles/components/login.css";

export const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorData, setErrorData] = useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string>();
  const [loginSuccess, setLoginSuccess] = useState(false);

  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  // ───── INPUT CHANGE ─────
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorData({});
    setServerError(undefined);
  };

  // ───── LOGIN TRADICIONAL ─────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = loginSchema.safeParse(formData);
    if (!result.success) {
      const rawErrors = result.error.flatten().fieldErrors;
      setErrorData({
        email: rawErrors.email?.[0],
        password: rawErrors.password?.[0],
      });
      return;
    }

    try {
      setIsLoading(true);
      const response = await loginService(formData);
      auth?.login(response.token);

      setLoginSuccess(true);
      setTimeout(() => navigate("/home"), 1200);
    } catch {
      setServerError("Credenciales incorrectas.");
    } finally {
      setIsLoading(false);
    }
  };

  // ───── LOGIN GOOGLE ─────
  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    const credential = credentialResponse.credential;
    if (!credential) {
      setServerError("Google no devolvió credenciales.");
      return;
    }

    try {
      setIsLoading(true);
      const result = await googleLoginService(credential);
      auth?.login(result.token);

      setLoginSuccess(true);
      setTimeout(() => navigate("/home"), 1200);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error con Google";
      setServerError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleError = () => {
    setServerError("Falló el login con Google.");
  };

  // ───── UI ─────
  return (
    <div className="auth-form-container">
      <div className="auth-tabs">
        <button className="auth-tab active" type="button">Entrar</button>
      </div>

      {/* ───── LOGIN EMAIL ───── */}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label auth-label">Correo Electrónico</label>
          <input
            type="email"
            name="email"
            className={`form-control ${errorData.email ? "is-invalid" : ""}`}
            value={formData.email}
            onChange={handleChange}
          />
          {errorData.email && <div className="invalid-feedback">{errorData.email}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label auth-label">Contraseña</label>
          <input
            type="password"
            name="password"
            className={`form-control ${errorData.password ? "is-invalid" : ""}`}
            value={formData.password}
            onChange={handleChange}
          />
          {errorData.password && <div className="invalid-feedback">{errorData.password}</div>}
        </div>

        <button
          type="submit"
          className="btn btn-dark w-100"
          disabled={isLoading}
        >
          {isLoading ? "Ingresando..." : "Ingresar"}
        </button>
      </form>

      {/* ───── DIVIDER ───── */}
      <div style={{ textAlign: "center", margin: "20px 0", color: "#999" }}>
        ───── o continuar con ─────
      </div>

      {/* ───── GOOGLE LOGIN ───── */}
      {!loginSuccess && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
          />
        </div>
      )}

      {/* ───── MENSAJES ───── */}
      {loginSuccess && (
        <div className="alert alert-success mt-3 text-center">
          ¡Login exitoso!
        </div>
      )}

      {serverError && (
        <div className="alert alert-danger mt-3 text-center">
          {serverError}
        </div>
      )}
    </div>
  );
};