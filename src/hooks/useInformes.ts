import { useState, useEffect, useCallback } from 'react';
import { getAllInformes, getInformeById, generarInforme } from '../service/informe.service';
import type { InformeBackendData, InformeResult } from '../service/informe.service';
import { useAuth } from '../context/auth.context';

export const useInformes = (autoFetch: boolean = true) => {
  const { token } = useAuth();
  const [informes, setInformes] = useState<InformeBackendData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInformes = useCallback(async () => {
    if (!token) return;

    try {
      setLoading(true);
      setError(null);
      const data = await getAllInformes(token);
      setInformes(data);
    } catch (err: any) {
      setError(err.message || 'Error desconocido al cargar informes');
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Cargar los informes al montar el hook (si autoFetch es true y hay token)
  useEffect(() => {
    if (autoFetch) {
      fetchInformes();
    }
  }, [fetchInformes, autoFetch]);

  const fetchInformeById = useCallback(async (id: number): Promise<InformeBackendData | null> => {
    if (!token) return null;
    
    try {
      setLoading(true);
      setError(null);
      const data = await getInformeById(id, token);
      return data;
    } catch (err: any) {
      setError(err.message || 'Error al obtener el informe');
      return null;
    } finally {
      setLoading(false);
    }
  }, [token]);

  const crearInforme = async (formData: any): Promise<InformeResult | null> => {
    if (!token) {
      setError('No hay sesión activa');
      return null;
    }
    
    try {
      setLoading(true);
      setError(null);
      const result = await generarInforme(formData, token);
      
      // Agregamos el informe generado a la lista local si existe
      if (result && result.informe) {
        setInformes(prev => [...prev, result.informe]);
      }
      
      return result;
    } catch (err: any) {
      setError(err.message || 'Error al generar el informe');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    informes,
    loading,
    error,
    setInformes,
    fetchInformes,
    fetchInformeById,
    crearInforme
  };
};
