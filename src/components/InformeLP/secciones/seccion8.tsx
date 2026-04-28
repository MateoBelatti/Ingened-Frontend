import React, { type ChangeEvent } from "react";
import { SCard, Lbl, Txt } from "../primitivos"; // ajustá el path

// ─── TYPES ────────────────────────────────────────────────────────
export type ResultadoGlobalType =
  | "aceptable"
  | "aceptableConIndicaciones"
  | "noAceptable";

export interface ResultadoGlobalData {
  resultadoGlobal: ResultadoGlobalType;
  observacionesGenerales: string;
}

interface ResultadoGlobalProps {
  data: ResultadoGlobalData;
  setData: React.Dispatch<React.SetStateAction<ResultadoGlobalData>>;
  B: string;
  DARK: string;
}

// ─── COMPONENT ────────────────────────────────────────────────────
export const ResultadoGlobal: React.FC<ResultadoGlobalProps> = ({
  data,
  setData,
  B,
  DARK,
}) => {
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name as keyof ResultadoGlobalData]: value,
    }));
  };

  const opts: { val: ResultadoGlobalType; label: string }[] = [
    { val: "aceptable", label: "Aceptable" },
    {
      val: "aceptableConIndicaciones",
      label: "Aceptable con indicaciones",
    },
    { val: "noAceptable", label: "No aceptable" },
  ];

  return (
    <SCard n={8} title="Resultado Global" B={B} DARK={DARK}>
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
                data.resultadoGlobal === o.val ? B : "#dee2e6"
              }`,
              background:
                data.resultadoGlobal === o.val ? "#fff8f3" : "#fff",
              transition: "all 0.15s",
            }}
          >
            <input
              type="radio"
              name="resultadoGlobal"
              value={o.val}
              checked={data.resultadoGlobal === o.val}
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
                  data.resultadoGlobal === o.val ? 700 : 400,
                color:
                  data.resultadoGlobal === o.val ? B : "#333",
              }}
            >
              {o.label}
            </span>
          </label>
        ))}
      </div>

      <Lbl>Observaciones</Lbl>

      <Txt
        name="observacionesGenerales"
        value={data.observacionesGenerales}
        onChange={handleChange}
        rows={3}
        placeholder="Ingrese observaciones del ensayo..."
      />
    </SCard>
  );
};