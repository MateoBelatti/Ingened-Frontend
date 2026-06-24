import React from 'react';
import type { InformeBackendData } from '../../service/informe.service';
import type { User } from '../../types/user.types';

interface InformeCardsProps {
    loading: boolean;
    informes: InformeBackendData[];
    getUserById: (id: number) => User | undefined;
}

export const InformeCards: React.FC<InformeCardsProps> = ({
    loading,
    informes,
    getUserById
}) => {
    if (loading) {
        return <p style={{ color: 'var(--text-secondary)' }}>Cargando informes...</p>;
    }

    return (
        <div className="home-cards">
            {informes.map((informe) => {
                const creator = informe.userId ? getUserById(informe.userId) : undefined;
                const creatorName = creator
                    ? `${creator.nombre} ${((creator as any).apellido || '')}`.trim()
                    : 'Usuario desconocido';

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
            {informes.length === 0 && (
                <p style={{ color: 'var(--text-secondary)' }}>No se encontraron informes con los filtros seleccionados.</p>
            )}
        </div>
    );
};
