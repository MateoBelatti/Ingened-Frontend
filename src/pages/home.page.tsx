import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth.context';
import { useInformes } from '../hooks/useInformes';
import { useUsers } from '../hooks/useUsers';
import '../styles/pages/homePage.css'; 
import { InformeCards } from '../components/common/InformeCards';

const HomePage: React.FC = () => {
    const nav = useNavigate();
    const auth = useAuth();
    const { informes, loading: informesLoading } = useInformes(true);
    const { users, getUserById } = useUsers();

    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    const [areFiltersOpen, setAreFiltersOpen] = useState<boolean>(false);
    const [filtroCreador, setFiltroCreador] = useState<string>('');
    const [filtroFecha, setFiltroFecha] = useState<string>('');
    const [filtroCliente, setFiltroCliente] = useState<string>('');

    useEffect(() => {
        if (!auth.isAuthenticated) {
            nav('/', { replace: true });
        }
    }, [auth.isAuthenticated, nav]);

    const filteredInformes = informes.filter((informe) => {
        if (filtroCreador && informe.userId?.toString() !== filtroCreador) return false;
        if (filtroFecha) {
            const informeDate = informe.fecha.split('T')[0];
            if (informeDate !== filtroFecha) return false;
        }
        if (filtroCliente && !informe.cliente?.toLowerCase().includes(filtroCliente.toLowerCase())) return false;
        return true;
    });

    return (
        <div className="home-layout">
            <header className="mobile-header">
                <button 
                    className="btn-toggle-sidebar" 
                    onClick={() => setIsSidebarOpen(true)}
                    aria-label="Abrir menú"
                >
                    ☰
                </button>
                <span className="mobile-header-title">Ingened</span>
                <div style={{ width: '24px' }}></div>
            </header>

            {isSidebarOpen && (
                <div 
                    className="sidebar-overlay" 
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <aside className={`home-sidebar ${isSidebarOpen ? 'is-open' : ''}`}>
                <button 
                    className="btn-close-sidebar" 
                    onClick={() => setIsSidebarOpen(false)}
                    aria-label="Cerrar menú"
                >
                    ✕
                </button>
                <h2>Generar Informe</h2>
                <div className="sidebar-buttons">
                    <button 
                        className="btn-sidebar"
                        onClick={() => {
                            setIsSidebarOpen(false);
                            nav('/liquidosPenetrantes');
                        }}
                    >
                        Líquidos Penetrantes
                    </button>
                    <button 
                        className="btn-sidebar"
                        onClick={() => setIsSidebarOpen(false)}
                    >
                        Próximo Ensayo
                    </button>
                </div>
                <button 
                    type="button" 
                    className="btn-logout" 
                    onClick={() => {
                        setIsSidebarOpen(false);
                        auth.logout();
                    }}
                >
                    Salir
                </button>
            </aside>

            <main className="home-main">
                <button 
                    className="btn-toggle-filters"
                    onClick={() => setAreFiltersOpen(!areFiltersOpen)}
                    aria-label="Toggle filtros"
                >
                    <span>🔍 Filtros</span>
                    <span className={`arrow ${areFiltersOpen ? 'open' : ''}`}>▼</span>
                </button>

                <div className={`home-filters ${areFiltersOpen ? 'is-open' : ''}`}>
                    <div className="filter-group">
                        <label>Filtrar por Creador</label>
                        <select 
                            value={filtroCreador} 
                            onChange={(e) => setFiltroCreador(e.target.value)}
                        >
                            <option value="">Todos los creadores</option>
                            {users.map(user => (
                                <option key={user.id} value={user.id.toString()}>
                                    {user.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="filter-group">
                        <label>Filtrar por Fecha</label>
                        <input 
                            type="date" 
                            value={filtroFecha} 
                            onChange={(e) => setFiltroFecha(e.target.value)}
                        />
                    </div>
                    <div className="filter-group">
                        <label>Filtrar por Cliente</label>
                        <input 
                            type="text" 
                            placeholder="Buscar cliente..." 
                            value={filtroCliente} 
                            onChange={(e) => setFiltroCliente(e.target.value)}
                        />
                    </div>
                </div>

                <InformeCards 
                    loading={informesLoading}
                    informes={filteredInformes}
                    getUserById={getUserById}
                />
            </main>
        </div>
    );
};

export default HomePage;