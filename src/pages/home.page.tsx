import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth.context';
import { useInformes } from '../hooks/useInformes';
import { useUsers } from '../hooks/useUsers';
import '../styles/pages/homePage.css'; 

const HomePage: React.FC = () => {
    const nav = useNavigate();
    const auth = useAuth();
    const { informes, loading: informesLoading } = useInformes(true);
    const { users, getUserById } = useUsers();

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
            <aside className="home-sidebar">
                <h2>Generar Informe</h2>
                <div className="sidebar-buttons">
                    <button 
                        className="btn-sidebar"
                        onClick={() => nav('/liquidosPenetrantes')}
                    >
                        Líquidos Penetrantes
                    </button>
                    <button className="btn-sidebar">
                        Próximo Ensayo
                    </button>
                </div>
                <button type="button" className="btn-logout" onClick={auth.logout}>
                    Salir
                </button>
            </aside>

            <main className="home-main">
                <div className="home-filters">
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

                {informesLoading ? (
                    <p style={{ color: 'var(--text-secondary)' }}>Cargando informes...</p>
                ) : (
                    <div className="home-cards">
                        {filteredInformes.map((informe) => {
                            const creator = informe.userId ? getUserById(informe.userId) : undefined;
                            const creatorName = creator ? creator.nombre : 'Usuario desconocido';
                            
                            return (
                                <div key={informe.id} className="informe-card">
                                    <div className="informe-card__title">
                                        Informe N° {informe.nrInf}
                                    </div>
                                    <div className="informe-card__details">
                                        <p><strong>Cliente:</strong> {informe.cliente}</p>
                                        <p><strong>Fecha:</strong> {new Date(informe.fecha).toLocaleDateString()}</p>
                                        <p><strong>Creado por:</strong> {creatorName}</p>
                                        <p><strong>ID Archivo:</strong> {informe.googleDriveFileId || 'N/A'}</p>
                                    </div>
                                    {informe.url && (
                                        <a href={informe.url} target="_blank" rel="noreferrer" className="informe-card__file">
                                            <span className="informe-card__file-icon">📄</span>
                                            Ver en Drive
                                        </a>
                                    )}
                                </div>
                            );
                        })}
                        {filteredInformes.length === 0 && (
                            <p style={{ color: 'var(--text-secondary)' }}>No se encontraron informes con los filtros seleccionados.</p>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};

export default HomePage;