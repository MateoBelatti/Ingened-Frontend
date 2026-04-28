export const SECTION_NAMES = [
  "Datos de Archivo", "Datos Generales", "Procedimiento / Normas",
  "Material / Superficie", "Parámetros LP", "Elementos Inspeccionados",
  "Resultado Global", "Responsables", "Consumibles", "Registro Fotográfico",
];

 export const INIT  = {
  // Datos de archivo
  nrInf: "", cliente: "", oc: "", rev: "01", fecha: "", codigo: "",
  // Datos generales
  proyecto: "", componente: "", subconjunto: "", obra: "", plano: "", posicion: "", lugar: "",
  // Procedimiento / normas
  procGeneral: "", procEspecifico: "",
  ensayoTipo: "Tintas penetrantes", norma: "ASTM E-165", codigoRef: "ASME Sección VIII",
  // Material / superficie
  material: "", formaMaterial: "", condSuperficiales: "",
  // Parámetros LP
  tipoPenetrante: "", tipoRevelador: "", tipoRemovedor: "", extensionEnsayo: "",
  limpiezaInicial: "", aplicacionPenetrante: "", tiempoPenetracion: "", remocionExceso: "",
  tiempoSecado: "", aplicacionRevelador: "", tiempoRevelado: "", limpiezaPostExamen: "",
  temperatura: "", iluminacion: "",
  // Elementos inspeccionados
  elementos: [{ linea: "", isometrico: "", elemento: "", spool: "", cuno: "", espSch: "", diam: "", criterio: "", resultado: "Aprobado" }],
  // Resultado global
  resultadoGlobal: "aceptable", observaciones: "",
  // Responsables
  realizo: "", firmaRealizo: "", reviso: "", firmaReviso: "",
  // Consumibles
  consumibles: [{ producto: "Penetrante", lote: "", marca: "", vencimiento: "" }],
  // Fotos
  fotos: [],
};


// ─── Paleta ───────────────────────────────────────────────────────
export const B = "#E07B2A";     // naranja Ingened
export const DARK = "#1B2A3B";  // azul oscuro
export const BG = "#F3F5F8";

