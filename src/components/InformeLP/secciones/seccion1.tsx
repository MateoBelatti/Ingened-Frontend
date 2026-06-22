import React, { type ChangeEvent } from "react";
import { SCard, Row, Col, Inp } from "../primitivos"; // ajustá el path
import { B, DARK } from "../constantes";

import type { DatosArchivosDto } from "../../../types/informe.types";

interface DatosArchivoProps {
  data: DatosArchivosDto;
  setData: React.Dispatch<React.SetStateAction<DatosArchivosDto>>;
}

// ─── COMPONENT ────────────────────────────────────────────────────
export const DatosArchivo: React.FC<DatosArchivoProps> = ({
  data,
  setData,
}) => {
  const handleChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <SCard n={1} title="Datos de Archivo" B={B} DARK={DARK}>
      <Row>
        <Col col="col-6 col-md-2" label="Nr. Informe" required>
          <Inp
            name="nrInf"
            value={data.nrInf}
            onChange={handleChange}
            placeholder="ING-XXX"
          />
        </Col>

        <Col col="col-6 col-md-3" label="Cliente">
          <Inp
            name="cliente"
            value={data.cliente}
            onChange={handleChange}
          />
        </Col>

        <Col col="col-6 col-md-2" label="OC">
          <Inp
            name="oc"
            value={data.oc}
            onChange={handleChange}
          />
        </Col>

        <Col col="col-6 col-md-2" label="Revisión">
          <Inp
            name="rev"
            value={data.rev}
            onChange={handleChange}
            placeholder="01"
          />
        </Col>

        <Col col="col-6 col-md-3" label="Fecha" required>
          <Inp
            name="fecha"
            value={data.fecha}
            onChange={handleChange}
            type="date"
          />
        </Col>

        <Col col="col-12 col-md-4" label="Código">
          <Inp
            name="codigo"
            value={data.codigo}
            onChange={handleChange}
            placeholder="01 • 01 • a"
          />
        </Col>
      </Row>
    </SCard>
  );
};