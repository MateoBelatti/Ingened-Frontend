import React from 'react';
import type { InformeResult } from '../../service/informe.service';
import { useUsers } from '../../hooks/useUsers';

interface SuccessModalProps {
  resultData: InformeResult | null;
  onClose: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({ resultData, onClose }) => {
  const { getUserById, loading } = useUsers();

  if (!resultData) return null;

  const creatorId = resultData.informe.userId;
  const creator = creatorId ? getUserById(creatorId) : undefined;
  const creatorName = loading ? 'Cargando...' : (creator ? creator.nombre : 'Usuario desconocido');

  return (
    <div className="ilp-modal-overlay" onClick={onClose}>
      <div className="ilp-modal" onClick={e => e.stopPropagation()}>
        <h3 className="ilp-modal__title">¡Informe Generado!</h3>
        <p className="ilp-modal__desc">
          {resultData.message || 'El documento ha sido creado exitosamente.'}
        </p>

        <div style={{ textAlign: 'left', marginBottom: '1.5rem', background: '#f8f9fa', padding: '1rem', borderRadius: '8px', fontSize: '0.85rem', color: '#495057' }}>
          <p style={{ margin: '0 0 5px 0' }}><strong>Nº Informe:</strong> {resultData.informe.nrInf}</p>
          <p style={{ margin: '0 0 5px 0' }}><strong>Cliente:</strong> {resultData.informe.cliente}</p>
          <p style={{ margin: '0 0 5px 0' }}><strong>ID Archivo:</strong> {resultData.informe.googleDriveFileId}</p>
          <p style={{ margin: '0' }}><strong>Creado por:</strong> {creatorName}</p>
        </div>

        <a href={resultData.informe.url} target="_blank" rel="noreferrer" className="ilp-modal__file">
          <span className="ilp-modal__icon">📄</span>
          <span className="ilp-modal__filename">Ver en Drive</span>
        </a>

        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '15px', justifyContent: 'center', alignItems: 'center' }}>
          <a href={`https://drive.google.com/uc?export=download&id=${resultData.informe.googleDriveFileId}`} target="_blank" rel="noreferrer" className="ilp-modal__close" style={{ textDecoration: 'none', margin: 0 }}>
            Descargar PDF
          </a>
          <button className="ilp-modal__close" style={{ margin: 0 }} onClick={onClose}>
            Volver
          </button>
        </div>
      </div>
    </div>
  );
};
