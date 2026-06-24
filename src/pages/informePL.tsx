import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/pages/informeLP.css';

// ─── SECCIONES ────────────────────────────────────────────────────
import { DatosArchivo } from "../components/InformeLP/secciones/seccion1";
import { DatosGenerales } from "../components/InformeLP/secciones/seccion2";
import { ProcedimientoNormas } from "../components/InformeLP/secciones/seccion3";
import { MaterialSuperficie } from "../components/InformeLP/secciones/seccion4";
import { ParametrosLP } from "../components/InformeLP/secciones/seccion5";
import { ElementosInspeccionados } from "../components/InformeLP/secciones/seccion6";
import { ResultadoVisual } from "../components/InformeLP/secciones/seccion7";
import { Responsables } from "../components/InformeLP/secciones/seccion9";
import { Consumibles } from "../components/InformeLP/secciones/seccion10";
import { RegistroFotografico } from "../components/InformeLP/secciones/seccion11";
import { ResultadoGlobal } from "../components/InformeLP/secciones/seccion8";
import type { InformeDTO } from "../types/informe.types";
import { INIT, SECTION_NAMES } from "../components/InformeLP/constantes";
import { SuccessModal } from "../components/common/SuccessModal";

import type { InformeResult } from '../service/informe.service';
import { useInformes } from '../hooks/useInformes';

function createSectionSetter<K extends keyof InformeDTO>(
  setData: React.Dispatch<React.SetStateAction<InformeDTO>>,
  sectionKey: K
) {
  return (value: any) => {
    setData((prev) => {
      const sectionValue = prev[sectionKey];
      const newValue =
        typeof value === "function"
          ? value(sectionValue)
          : value;

      return {
        ...prev,
        [sectionKey]: newValue,
      };
    });
  };
}

// ─── COMPONENT ────────────────────────────────────────────────────
const InformeLP: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<InformeDTO>(INIT);
  const { crearInforme, loading, error } = useInformes(false);
  const [resultData, setResultData] = useState<InformeResult | null>(null);

  const sections = [
    <DatosArchivo 
      data={data.datosArchivos}
      setData={createSectionSetter(setData, 'datosArchivos')}  />,
    <DatosGenerales
      data={data.datosGenerales}
      setData={createSectionSetter(setData, 'datosGenerales')}/>,
    <ProcedimientoNormas
      data={data.procedimientoNormas}
      setData={createSectionSetter(setData, 'procedimientoNormas')}/>,
    <MaterialSuperficie
      data={data.materialSuperficial}
      setData={createSectionSetter(setData, 'materialSuperficial')}/>,
    <ParametrosLP 
      data={data.parametrosLP}
      setData={createSectionSetter(setData, 'parametrosLP')}/>,
    <ElementosInspeccionados
      data={{ elementos: data.elementos }}
      setData={(val: any) => {
        const newVal = typeof val === "function" ? val({ elementos: data.elementos }) : val;
        setData(prev => ({ ...prev, elementos: newVal.elementos }));
      }}/>,
    <ResultadoVisual 
      data={data.resultadoVisual!}
      setData={createSectionSetter(setData, 'resultadoVisual')}/>,
    <ResultadoGlobal 
      data={data.resultadoGlobal}
      setData={createSectionSetter(setData, 'resultadoGlobal')}/>,
    <Responsables 
      data={data.responsables}
      setData={createSectionSetter(setData, 'responsables')}/>,
    <Consumibles 
      data={{ consumibles: data.consumibles }}
      setData={(val: any) => {
        const newVal = typeof val === "function" ? val({ consumibles: data.consumibles }) : val;
        setData(prev => ({ ...prev, consumibles: newVal.consumibles }));
      }}/>,
    <RegistroFotografico
      data={data.registroFotografico!}
      setData={createSectionSetter(setData, 'registroFotografico')}/>,
  ];

  const handleGenerate = async () => {
    try {
      setResultData(null);
      const result = await crearInforme(data);
      if (result) {
        setResultData(result);
      }
    } catch (err) {
      console.error('Error al generar el informe', err);
    }
  };

  const handleCloseModal = () => {
    setResultData(null);
    navigate('/home');
  };

  // ── HEADER ──────────────────────────────────────────────────────
  const Header = () => (
    <header className="ilp-header">
      <div className="ilp-header__bar" />
      <div>
        <div className="ilp-header__title">Informe de Inspección</div>
        <div className="ilp-header__subtitle">Líquidos Penetrantes (LP)</div>
      </div>
    </header>
  );

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
        </div>
      </div>
      <SuccessModal resultData={resultData} onClose={handleCloseModal} />
    </div>
  );
};

export default InformeLP;
