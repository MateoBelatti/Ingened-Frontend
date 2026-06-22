import React, { type ChangeEvent } from "react";
import { SCard, Row, Col, Inp } from "../primitivos"; // ajustá el path
import { B, DARK } from "../constantes";

import type { ResponsablesDataDto } from "../../../types/informe.types";

interface ResponsablesProps {
  data: ResponsablesDataDto;
  setData: React.Dispatch<React.SetStateAction<ResponsablesDataDto>>;
}

// ─── COMPONENT ────────────────────────────────────────────────────
export const Responsables: React.FC<ResponsablesProps> = ({
  data,
  setData,
}) => {
  const handleChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name as keyof ResponsablesDataDto]: value,
    }));
  };

  return (
    <SCard n={9} title="Responsables" B={B} DARK={DARK}>
      <Row>
        <Col col="col-12 col-md-6" label="Realizó">
          <Inp
            name="realizo"
            value={data.realizo}
            onChange={handleChange}
          />
        </Col>

        <Col col="col-12 col-md-6" label="Firma (Realizó)">
          <Inp
            name="firmaRealizo"
            value={data.firmaRealizo}
            onChange={handleChange}
          />
        </Col>

        <Col col="col-12 col-md-6" label="Revisó">
          <Inp
            name="reviso"
            value={data.reviso}
            onChange={handleChange}
          />
        </Col>

        <Col col="col-12 col-md-6" label="Firma (Revisó)">
          <Inp
            name="firmaReviso"
            value={data.firmaReviso}
            onChange={handleChange}
          />
        </Col>
      </Row>
    </SCard>
  );
};