import React, { type ChangeEvent } from "react";
import { SCard, Lbl, Txt } from "../primitivos"; // ajustá el path
import { B, DARK } from "../constantes";

import type { ResultadoVisualDataDto } from "../../../types/informe.types";

interface ResultadoVisualProps {
  data: ResultadoVisualDataDto;
  setData: React.Dispatch<React.SetStateAction<ResultadoVisualDataDto>>;
}

// ─── COMPONENT ────────────────────────────────────────────────────
export const ResultadoVisual: React.FC<ResultadoVisualProps> = ({
  data,
  setData,
}) => {
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name as keyof ResultadoVisualDataDto]: value,
    }));
  };

  const opts: { val: string; label: string }[] = [
    { val: "aceptable", label: "Aceptable" },
    {
      val: "aceptableConIndicaciones",
      label: "Aceptable con indicaciones",
    },
    { val: "noAceptable", label: "No aceptable" },
  ];

  return (
    <SCard n={7} title="inspeccion visual" B={B} DARK={DARK}>
      <div className="d-flex flex-wrap gap-3 mb-3">
        {opts.map((o) => (
          <label
            key={o.val}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              cursor: "pointer",
              padding: "0.4rem 0.9rem",
              borderRadius: 6,
              border: `1.5px solid ${
                data.resultadoVisual === o.val ? B : "#dee2e6"
              }`,
              background:
                data.resultadoVisual === o.val ? "#fff8f3" : "#fff",
              transition: "all 0.15s",
            }}
          >
            <input
              type="radio"
              name="resultadoVisual"
              value={o.val}
              checked={data.resultadoVisual === o.val}
              onChange={handleChange}
              style={{
                accentColor: B,
                width: 16,
                height: 16,
                margin: 0,
              }}
            />

            <span
              style={{
                fontSize: "0.875rem",
                fontWeight:
                  data.resultadoVisual === o.val ? 700 : 400,
                color:
                  data.resultadoVisual === o.val ? B : "#333",
              }}
            >
              {o.label}
            </span>
          </label>
        ))}
      </div>

      <Lbl>Observaciones</Lbl>

      <Txt
        name="observaciones"
        value={data.observaciones}
        onChange={handleChange}
        rows={3}
        placeholder="Ingrese observaciones del ensayo..."
      />
    </SCard>
  );
};