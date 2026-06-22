export interface DatosArchivosDto {
  nrInf: string;
  cliente: string;
  oc: string;
  rev: string;
  fecha: string;
  codigo: string;
}

export interface DatosGeneralesDto {
  proyecto: string;
  componente: string;
  subconjunto: string;
  obra: string;
  plano: string;
  posicion: string;
  lugar: string;
}

export interface ProcedimientoNormasDto {
  procGeneral: string;
  procEspecifico: string;
  ensayoTipo: string;
  norma: string;
  codigoRef: string;
}

export interface MaterialSuperficialDto {
  material: string;
  formaMaterial: string;
  condSuperficiales: string;
}

export interface ParametrosLPDto {
  tipoPenetrante: string;
  tipoRevelador: string;
  tipoRemovedor: string;
  extensionEnsayo: string;
  limpiezaInicial: string;
  aplicacionPenetrante: string;
  tiempoPenetracion: string;
  remocionExceso: string;
  tiempoSecado: string;
  aplicacionRevelador: string;
  tiempoRevelado: string;
  limpiezaPostExamen: string;
  temperatura: string;
  iluminacion: string;
}

export interface ElementoInspeccionadoDto {
  linea: string;
  isometrico: string;
  elemento: string;
  spool: string;
  cuno: string;
  espSch: string;
  diam: string;
  criterio: string;
  resultado: string;
}

export interface ResultadoVisualDataDto {
  resultadoVisual: string;
  observaciones: string;
}

export interface ResultadoGlobalDataDto {
  resultadoGlobal: string;
  observacionesGenerales: string;
}

export interface ResponsablesDataDto {
  realizo: string;
  firmaRealizo: string;
  reviso: string;
  firmaReviso: string;
}

export interface ConsumibleDto {
  producto: string;
  marca: string;
  lote: string;
  vencimiento: string;
  imagenes?: File[];
}

export interface RegistroFotograficoDataDto {
  fotos: File[];
}

export interface InformeDTO {
  datosArchivos: DatosArchivosDto;
  datosGenerales: DatosGeneralesDto;
  procedimientoNormas: ProcedimientoNormasDto;
  materialSuperficial: MaterialSuperficialDto;
  parametrosLP: ParametrosLPDto;
  elementos: ElementoInspeccionadoDto[];
  resultadoVisual?: ResultadoVisualDataDto; // It was missing in the C# root DTO but just in case
  resultadoGlobal: ResultadoGlobalDataDto;
  responsables: ResponsablesDataDto;
  consumibles: ConsumibleDto[];
  registroFotografico?: RegistroFotograficoDataDto;
}
