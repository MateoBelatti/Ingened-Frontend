import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth.context';
import '../styles/pages/homePage.css'; // Asegúrate de que la ruta coincida con tu estructura

const HomePage: React.FC = () => {
  // Estado para alternar entre el botón inicial y las opciones
    const [showOptions, setShowOptions] = useState<boolean>(false);
    const nav = useNavigate();
    const auth = useAuth();

    useEffect(() => {
        if (!auth.isAuthenticated) {
        nav('/', { replace: true }); // Reemplaza '/' por la ruta de tu login si es diferente
        }
    }, [auth.isAuthenticated, nav]);


    
    return (
    <div className="home-wrapper container-fluid">
        <div className="home-card">
            {/* Encabezado con la línea naranja debajo, imitando el "ENTRAR" */}
            <div className="text-start">
            <span className="home-header">INICIO</span>
            </div>

            {/* Renderizado condicional basado en el estado */}
            {!showOptions ? (
            <div className="mt-4 fade-in">
                <button 
                className="btn btn-orange-custom w-100"
                onClick={() => setShowOptions(true)}
                >
                Generar Informe
                </button>
                {/* ELIMINAR ESTE BOTON ES SOLO PRUEBA */}
                <button type="button" className="btn btn-orange-custom w-100" onClick={auth.logout}>Salir</button>
        </div>
        ) : (
            <div className="mt-4 fade-in">
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                    Seleccione el tipo de ensayo:
                </p>
            
                <div className="row g-3">
                    <div className="col-12 col-sm-6">
                        <button 
                            className="btn-option-card w-100"
                            onClick={() => nav('/liquidosPenetrantes')}>
                            Líquidos Penetrantes
                        </button>
                    </div>
                    <div className="col-12 col-sm-6">
                        <button className="btn-option-card w-100">
                            Proximo Ensayo
                        </button>
                </div>
                </div>

            {/* Botón para volver atrás y resetear el estado */}
            <button 
                className="btn-back"
                onClick={() => setShowOptions(false)}
                >
                &larr; Volver
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;