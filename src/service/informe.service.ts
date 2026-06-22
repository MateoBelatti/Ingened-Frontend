import { httpClient } from './http.client';
import { serialize } from 'object-to-formdata';
 
export interface InformeResult {
  link:         string;   // webViewLink — para abrir en Drive
  downloadLink: string;
  fileId:       string;
  fileName:     string;
}
 
function toPascalCaseKeys(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(v => toPascalCaseKeys(v));
  } else if (obj !== null && typeof obj === 'object' && !(obj instanceof File)) {
    return Object.keys(obj).reduce((result, key) => {
      const pascalKey = key.charAt(0).toUpperCase() + key.slice(1);
      result[pascalKey] = toPascalCaseKeys(obj[key]);
      return result;
    }, {} as any);
  }
  return obj;
}

export const generarInforme = async (
  formData: object,
  token: string,
): Promise<InformeResult> => {
  try {
    // 1. Convertir todas las claves a PascalCase (DatosArchivos.NrInf en vez de datosArchivos.nrInf)
    const pascalFormData = toPascalCaseKeys(formData);

    // 2. Transformar el objeto JSON a FormData nativo
    const payload = serialize(pascalFormData, { 
      indices: true,               
      dotsForObjectNotation: true, 
      noFilesWithArrayNotation: true, 
      booleansAsIntegers: false, 
      nullsAsUndefineds: true 
    });


    const res = await httpClient.post('/api/Informe/generarInforme', payload, {
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': undefined
      }
    });
    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error al generar el informe');
  }
};
