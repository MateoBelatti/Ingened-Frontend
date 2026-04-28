import React, { useState, useEffect } from "react";
import '../styles/pages/informeLP.css';

// ─── SECCIONES ────────────────────────────────────────────────────
import { DatosArchivo, type DatosArchivoData } from "../components/InformeLP/secciones/seccion1";
import { DatosGenerales, type DatosGeneralesData } from "../components/InformeLP/secciones/seccion2";
import { ProcedimientoNormas, type ProcedimientoNormasData } from "../components/InformeLP/secciones/seccion3";
import { MaterialSuperficie, type MaterialSuperficieData } from "../components/InformeLP/secciones/seccion4";
import { ParametrosLP, type ParametrosLPData } from "../components/InformeLP/secciones/seccion5";
import { ElementosInspeccionados, type ElementosData } from "../components/InformeLP/secciones/seccion6";
import { ResultadoVisual, type ResultadoVisualData,  } from "../components/InformeLP/secciones/seccion7";
import { Responsables, type ResponsablesData } from "../components/InformeLP/secciones/seccion9";
import { Consumibles, type ConsumiblesData } from "../components/InformeLP/secciones/seccion10";
import { RegistroFotografico, type RegistroFotograficoData } from "../components/InformeLP/secciones/seccion11";
import { ResultadoGlobal, type ResultadoGlobalData } from "../components/InformeLP/secciones/seccion8";



import { useAuth } from '../context/auth.context';
import { generarInforme } from '../service/informe.service';

// ─── CONSTANTES ───────────────────────────────────────────────────
const B = "#E07B2A";
const DARK = "#1B2A3B";

const SECTION_NAMES = [
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

// ─── TIPOS ────────────────────────────────────────────────────────
type FormData =
  & DatosArchivoData
  & DatosGeneralesData
  & ProcedimientoNormasData
  & MaterialSuperficieData
  & ParametrosLPData
  & ElementosData
  & ResultadoVisualData
  & ResultadoGlobalData
  & ResponsablesData
  & ConsumiblesData
  & RegistroFotograficoData;

// ─── ESTADO INICIAL ───────────────────────────────────────────────
const INIT: FormData = {
  nrInf: "", cliente: "", oc: "", rev: "", fecha: "", codigo: "",
  proyecto: "", componente: "", subconjunto: "", obra: "", plano: "",
  posicion: "", lugar: "",
  procGeneral: "", procEspecifico: "", ensayoTipo: "", norma: "", codigoRef: "",
  material: "", formaMaterial: "", condSuperficiales: "",
  tipoPenetrante: "", tipoRevelador: "", tipoRemovedor: "",
  extensionEnsayo: "", limpiezaInicial: "", aplicacionPenetrante: "",
  tiempoPenetracion: "", remocionExceso: "", tiempoSecado: "",
  aplicacionRevelador: "", tiempoRevelado: "", limpiezaPostExamen: "",
  temperatura: "", iluminacion: "",
  elementos: [{ linea: "", isometrico: "", elemento: "", spool: "", cuno: "", espSch: "", diam: "", criterio: "", resultado: "Aprobado" }],
  resultadoVisual: "aceptable", observaciones: "",
  resultadoGlobal: "aceptable", observacionesGenerales: "",
  realizo: "", firmaRealizo: "", reviso: "", firmaReviso: "",
  consumibles: [{ producto: "", lote: "", marca: "", vencimiento: "" }],
  fotos: [],
};


// --- HOLMET ------------------------
function createSectionSetter<T>(
  setData: React.Dispatch<React.SetStateAction<FormData>>
): React.Dispatch<React.SetStateAction<T>> {
  return (value) => {
    setData((prev) => {
      const newValue =
        typeof value === "function"
          ? (value as (prev: T) => T)(prev as unknown as T)
          : value;

      return {
        ...prev,
        ...newValue,
      };
    });
  };
}

// ─── COMPONENT ────────────────────────────────────────────────────
const InformeLP: React.FC = () => {
  const [data, setData] = useState<FormData>(INIT);
  const [step, setStep] = useState<number>(0);
  const [mobile, setMobile] = useState<boolean>(window.innerWidth < 768);
  const { token } = useAuth();
  const [loading,   setLoading]   = useState(false);
  const [driveLink, setDriveLink] = useState<string | null>(null);
  const [error,     setError]     = useState<string | null>(null);

  // Resize listener
  useEffect(() => {
    const h = () => setMobile(window.innerWidth < 768);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);

  const props = { data, B, DARK };

  const sections = [
    <DatosArchivo 
      {...props}
      setData={createSectionSetter<DatosArchivoData>(setData)}  />,
    <DatosGenerales
      {...props}
        setData={createSectionSetter<DatosGeneralesData>(setData)}/>,
    <ProcedimientoNormas
      {...props}
      setData={createSectionSetter<ProcedimientoNormasData>(setData)}/>,
    <MaterialSuperficie
      {...props}
      setData={createSectionSetter<MaterialSuperficieData>(setData)}/>,
    <ParametrosLP 
      {...props}
      setData={createSectionSetter<ParametrosLPData>(setData)}/>,
    <ElementosInspeccionados
      {...props}
      setData={createSectionSetter<ElementosData>(setData)}/>,
      <ResultadoVisual 
      {...props}
      setData={createSectionSetter<ResultadoVisualData>(setData)}/>,
      <ResultadoGlobal 
      {...props}
      setData={createSectionSetter<ResultadoGlobalData>(setData)}/>,
    <Responsables 
      {...props}
      setData={createSectionSetter<ResponsablesData>(setData)}/>,
    <Consumibles 
      {...props}
      setData={createSectionSetter<ConsumiblesData>(setData)}/>,
    <RegistroFotografico
      {...props}
      setData={createSectionSetter<RegistroFotograficoData>(setData)}/>,
  ];

  const handleGenerate = async () => {
  if (!token) {
    setError('No hay sesión activa');
    return;
  }
  try {
    setLoading(true);
    setError(null);
    setDriveLink(null);
    const result = await generarInforme(data, token);
    setDriveLink(result.link);
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Error al generar el informe');
  } finally {
    setLoading(false);
  }
};

  // ── HEADER (compartido) ─────────────────────────────────────────
  const Header= () => (
    <header className="ilp-header">
      <div className="ilp-header__bar" />
      <div>
        <div className="ilp-header__title">Informe de Inspección</div>
        <div className="ilp-header__subtitle">Líquidos Penetrantes (LP)</div>
      </div>
    </header>
  );

  // ── VISTA MOBILE ────────────────────────────────────────────────
  if (mobile) {
    const isFirst = step === 0;
    const isLast = step === sections.length - 1;

    return (
      <div className="ilp-wrapper">
        <Header />

        <div className="ilp-mobile-step">
          <span className="ilp-mobile-step__label">{SECTION_NAMES[step]}</span>
          <span className="ilp-mobile-step__counter">{step + 1} / {sections.length}</span>
        </div>

      <div className="ilp-mobile-step__dots">
        {sections.map((s, i) => (
          <div key={i} id={`section-${i}`}>
            {React.cloneElement(s, { numero: i + 1 })}
          </div>
        ))}
        </div>

        <div className="ilp-mobile-content">
          {sections[step]}
        </div>

        <nav className="ilp-bottom-nav">
          <button
            className="ilp-btn-nav ilp-btn-nav--prev"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={isFirst}
            aria-label="Sección anterior"
          >
            ←
          </button>

          {!isLast ? (
            <button
              className="ilp-btn-nav ilp-btn-nav--next"
              onClick={() => setStep((s) => s + 1)}
            >
              Siguiente →
            </button>
          ) : (
            <button
              className="ilp-btn-nav ilp-btn-nav--finish"
              onClick={handleGenerate}
            >
              Generar informe
            </button>
          )}
        </nav>
      </div>
    );
  }

  // ── VISTA DESKTOP ───────────────────────────────────────────────
  return (
    <div className="ilp-wrapper">
      <Header />

      <div className="ilp-body">
        <nav className="ilp-progress" aria-label="Secciones del formulario">
          {SECTION_NAMES.map((name, i) => (
            <React.Fragment key={i}>
              <button
                className="ilp-progress__step"
                onClick={() => {
                  const el = document.getElementById(`section-${i}`);
                  el?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                style={{ background: "none", border: "none", padding: "2px 4px" }}
              >
                <span className="ilp-progress__dot">{i + 1}</span>
                {name}
              </button>
              {i < SECTION_NAMES.length - 1 && <div className="ilp-progress__sep" />}
            </React.Fragment>
          ))}
        </nav>

        {sections.map((s, i) => (
          <div key={i} id={`section-${i}`}>
            {s}
          </div>
        ))}

        <div className="ilp-generate">
          <button
            className="ilp-btn-generate"
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? 'Generando...' : 'Generar informe'}
          </button>

          {error && (
            <p style={{ color: '#c0392b', marginTop: 8, fontSize: 14 }}>{error}</p>
          )}

          {driveLink && (
            <p style={{ marginTop: 10, fontSize: 14 }}>
              ✅ Informe listo:{' '}
              <a href={driveLink} target="_blank" rel="noreferrer">
                Abrir en Google Drive
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default InformeLP;
