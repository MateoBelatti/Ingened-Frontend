import React, { type ChangeEvent } from "react";
import { SCard, Row, Col, Inp } from "../primitivos"; // ajustá el path
import { B, DARK } from "../constantes";

import type { DatosGeneralesDto } from "../../../types/informe.types";

interface DatosGeneralesProps {
  data: DatosGeneralesDto;
  setData: React.Dispatch<React.SetStateAction<DatosGeneralesDto>>;
}

// ─── COMPONENT ────────────────────────────────────────────────────
export const DatosGenerales: React.FC<DatosGeneralesProps> = ({
  data,
  setData,
}) => {
  const handleChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name as keyof DatosGeneralesDto]: value,
    }));
  };

  return (
    <SCard n={2} title="Datos Generales" B={B} DARK={DARK}>
      <Row>
        <Col col="col-12 col-md-6" label="Proyecto">
          <Inp
            name="proyecto"
            value={data.proyecto}
            onChange={handleChange}
          />
        </Col>

        <Col col="col-12 col-md-6" label="Componente">
          <Inp
            name="componente"
            value={data.componente}
            onChange={handleChange}
          />
        </Col>

        <Col col="col-12 col-md-6" label="Subconjunto">
          <Inp
            name="subconjunto"
            value={data.subconjunto}
            onChange={handleChange}
          />
        </Col>

        <Col col="col-12 col-md-6" label="Obra">
          <Inp
            name="obra"
            value={data.obra}
            onChange={handleChange}
          />
        </Col>

        <Col col="col-6 col-md-4" label="Plano">
          <Inp
            name="plano"
            value={data.plano}
            onChange={handleChange}
          />
        </Col>

        <Col col="col-6 col-md-4" label="Posición N°">
          <Inp
            name="posicion"
            value={data.posicion}
            onChange={handleChange}
          />
        </Col>

        <Col col="col-12 col-md-4" label="Lugar">
          <Inp
            name="lugar"
            value={data.lugar}
            onChange={handleChange}
          />
        </Col>
      </Row>
    </SCard>
  );
};