import type { InformeDTO } from "../../types/informe.types";

export const SECTION_NAMES = [
  "Datos de Archivo",
  "Datos Generales",
  "Procedimiento / Normas",
  "Material / Superficie",
  "Parámetros LP",
  "Elementos",
  "Resultado Visual",
  "Resultado Global",
  "Responsables",
  "Consumibles",
  "Registro Fotográfico",
];

export const INIT: InformeDTO = {
  datosArchivos: { nrInf: "", cliente: "", oc: "", rev: "", fecha: "", codigo: "" },
  datosGenerales: { proyecto: "", componente: "", subconjunto: "", obra: "", plano: "", posicion: "", lugar: "" },
  procedimientoNormas: { procGeneral: "", procEspecifico: "", ensayoTipo: "", norma: "", codigoRef: "" },
  materialSuperficial: { material: "", formaMaterial: "", condSuperficiales: "" },
  parametrosLP: { tipoPenetrante: "", tipoRevelador: "", tipoRemovedor: "", extensionEnsayo: "", limpiezaInicial: "", aplicacionPenetrante: "", tiempoPenetracion: "", remocionExceso: "", tiempoSecado: "", aplicacionRevelador: "", tiempoRevelado: "", limpiezaPostExamen: "", temperatura: "", iluminacion: "" },
  elementos: [{ linea: "", isometrico: "", elemento: "", spool: "", cuno: "", espSch: "", diam: "", criterio: "", resultado: "Aprobado" }],
  resultadoVisual: { resultadoVisual: "aceptable", observaciones: "" },
  resultadoGlobal: { resultadoGlobal: "aceptable", observacionesGenerales: "" },
  responsables: { realizo: "", firmaRealizo: "", reviso: "", firmaReviso: "" },
  consumibles: [{ producto: "", lote: "", marca: "", vencimiento: "", imagenes: [] }],
  registroFotografico: { fotos: [] },
};

// ─── Paleta ───────────────────────────────────────────────────────
export const B = "#E07B2A";     // naranja Ingened
export const DARK = "#1B2A3B";  // azul oscuro
export const BG = "#F3F5F8";

