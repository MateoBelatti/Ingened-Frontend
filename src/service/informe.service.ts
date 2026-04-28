const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
 
export interface InformeResult {
  link:         string;   // webViewLink — para abrir en Drive
  downloadLink: string;
  fileId:       string;
  fileName:     string;
}
 
export const generarInforme = async (
  formData: object,
  token: string,
): Promise<InformeResult> => {
  const res = await fetch(`${API_URL}/api/informe/generar`, {
    method:  'POST',
    headers: {
      'Content-Type':  'application/json',
      Authorization:   `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });
 
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Error desconocido' }));
    throw new Error(err.message ?? 'Error al generar el informe');
  }
 
  return res.json();
};