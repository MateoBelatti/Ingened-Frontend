import React, { type ChangeEvent } from "react";
import { SCard, Row, Col, Inp } from "../primitivos"; // ajustá el path
import { B, DARK } from "../constantes";

import type { ProcedimientoNormasDto } from "../../../types/informe.types";

interface ProcedimientoNormasProps {
  data: ProcedimientoNormasDto;
  setData: React.Dispatch<React.SetStateAction<ProcedimientoNormasDto>>;
}

// ─── COMPONENT ────────────────────────────────────────────────────
export const ProcedimientoNormas: React.FC<ProcedimientoNormasProps> = ({
  data,
  setData,
}) => {
  const handleChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name as keyof ProcedimientoNormasDto]: value,
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