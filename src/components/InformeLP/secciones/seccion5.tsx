import React, { type ChangeEvent } from "react";
import { SCard, Row, Col, Inp } from "../primitivos"; // ajustá el path

// ─── TYPES ────────────────────────────────────────────────────────
export interface ParametrosLPData {
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

interface ParametrosLPProps {
  data: ParametrosLPData;
  setData: React.Dispatch<React.SetStateAction<ParametrosLPData>>;
  B: string;
  DARK: string;
}

// Tipado de los fields
type Field = {
  name: keyof ParametrosLPData;
  label: string;
  type?: string;
};

// ─── COMPONENT ────────────────────────────────────────────────────
export const ParametrosLP: React.FC<ParametrosLPProps> = ({
  data,
  setData,
  B,
  DARK,
}) => {
  const handleChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name as keyof ParametrosLPData]: value,
    }));
  };

  const fields: Field[] = [
    { name: "tipoPenetrante", label: "Tipo de penetrante" },
    { name: "tipoRevelador", label: "Tipo de revelador" },
    { name: "tipoRemovedor", label: "Tipo de removedor" },
    { name: "extensionEnsayo", label: "Extensión del ensayo (min)", type: "number" },
    { name: "limpiezaInicial", label: "Limpieza inicial" },
    { name: "aplicacionPenetrante", label: "Aplicación del penetrante" },
    { name: "tiempoPenetracion", label: "Tiempo de penetración (min)", type: "number" },
    { name: "remocionExceso", label: "Remoción del exceso" },
    { name: "tiempoSecado", label: "Tiempo de secado (min)", type: "number" },
    { name: "aplicacionRevelador", label: "Aplicación del revelador" },
    { name: "tiempoRevelado", label: "Tiempo de revelado (min)", type: "number" },
    { name: "limpiezaPostExamen", label: "Limpieza post examen" },
    { name: "temperatura", label: "Temperatura (°C)", type: "number" },
    { name: "iluminacion", label: "Iluminación (Lux)", type: "number" },
  ];

  return (
    <SCard n={5} title="Parámetros LP" B={B} DARK={DARK}>
      <Row>
        {fields.map((f) => (
          <Col key={f.name} col="col-6 col-md-4" label={f.label}>
            <Inp
              name={f.name}
              value={data[f.name]}
              onChange={handleChange}
              type={f.type || "text"}
            />
          </Col>
        ))}
      </Row>
    </SCard>
  );
};