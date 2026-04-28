import React, { type ChangeEvent } from "react";
import { SCard, Row, Col, Inp } from "../primitivos"; // ajustá el path

// ─── TYPES ────────────────────────────────────────────────────────
export interface ProcedimientoNormasData {
  procGeneral: string;
  procEspecifico: string;
  ensayoTipo: string;
  norma: string;
  codigoRef: string;
}

interface ProcedimientoNormasProps {
  data: ProcedimientoNormasData;
  setData: React.Dispatch<React.SetStateAction<ProcedimientoNormasData>>;
  B: string;
  DARK: string;
}

// ─── COMPONENT ────────────────────────────────────────────────────
export const ProcedimientoNormas: React.FC<ProcedimientoNormasProps> = ({
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
      [name as keyof ProcedimientoNormasData]: value,
    }));
  };

  return (
    <SCard n={3} title="Procedimiento / Normas" B={B} DARK={DARK}>
      <Row>
        <Col col="col-12 col-md-6" label="Procedimiento General">
          <Inp
            name="procGeneral"
            value={data.procGeneral}
            onChange={handleChange}
          />
        </Col>

        <Col col="col-12 col-md-6" label="Procedimiento Específico">
          <Inp
            name="procEspecifico"
            value={data.procEspecifico}
            onChange={handleChange}
          />
        </Col>

        <Col col="col-12 col-md-4" label="Ensayo N° / Tipo">
          <Inp
            name="ensayoTipo"
            value={data.ensayoTipo}
            onChange={handleChange}
          />
        </Col>

        <Col col="col-12 col-md-4" label="Norma (Método)">
          <Inp
            name="norma"
            value={data.norma}
            onChange={handleChange}
          />
        </Col>

        <Col col="col-12 col-md-4" label="Código de Referencia">
          <Inp
            name="codigoRef"
            value={data.codigoRef}
            onChange={handleChange}
          />
        </Col>
      </Row>
    </SCard>
  );
};