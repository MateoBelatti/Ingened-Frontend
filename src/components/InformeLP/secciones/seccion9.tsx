import React, { type ChangeEvent } from "react";
import { SCard, Row, Col, Inp } from "../primitivos"; // ajustá el path

// ─── TYPES ────────────────────────────────────────────────────────
export interface ResponsablesData {
  realizo: string;
  firmaRealizo: string;
  reviso: string;
  firmaReviso: string;
}

interface ResponsablesProps {
  data: ResponsablesData;
  setData: React.Dispatch<React.SetStateAction<ResponsablesData>>;
  B: string;
  DARK: string;
}

// ─── COMPONENT ────────────────────────────────────────────────────
export const Responsables: React.FC<ResponsablesProps> = ({
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
      [name as keyof ResponsablesData]: value,
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