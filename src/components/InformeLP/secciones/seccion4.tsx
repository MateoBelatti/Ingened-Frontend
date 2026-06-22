import React, { type ChangeEvent } from "react";
import { SCard, Row, Col, Inp } from "../primitivos"; // ajustá el path
import { B, DARK } from "../constantes";

import type { MaterialSuperficialDto } from "../../../types/informe.types";

interface MaterialSuperficieProps {
  data: MaterialSuperficialDto;
  setData: React.Dispatch<React.SetStateAction<MaterialSuperficialDto>>;
}

// ─── COMPONENT ────────────────────────────────────────────────────
export const MaterialSuperficie: React.FC<MaterialSuperficieProps> = ({
  data,
  setData,
}) => {
  const handleChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name as keyof MaterialSuperficialDto]: value,
    }));
  };

  return (
    <SCard n={4} title="Material / Superficie" B={B} DARK={DARK}>
      <Row>
        <Col col="col-12 col-md-4" label="Material">
          <Inp
            name="material"
            value={data.material}
            onChange={handleChange}
          />
        </Col>

        <Col col="col-12 col-md-4" label="Forma del Material">
          <Inp
            name="formaMaterial"
            value={data.formaMaterial}
            onChange={handleChange}
          />
        </Col>

        <Col col="col-12 col-md-4" label="Condiciones Superficiales">
          <Inp
            name="condSuperficiales"
            value={data.condSuperficiales}
            onChange={handleChange}
          />
        </Col>
      </Row>
    </SCard>
  );
};