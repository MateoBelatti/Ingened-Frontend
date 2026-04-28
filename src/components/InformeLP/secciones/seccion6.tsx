import React from "react";
import { SCard, Inp, Sel } from "../primitivos"; // ajustá el path

// ─── TYPES ────────────────────────────────────────────────────────
export type ResultadoType = "Aprobado" | "Rechazado" | "N/A";

export interface ElementoInspeccionado {
  linea: string;
  isometrico: string;
  elemento: string;
  spool: string;
  cuno: string;
  espSch: string;
  diam: string;
  criterio: string;
  resultado: ResultadoType;
}

export interface ElementosData {
  elementos: ElementoInspeccionado[];
}

interface ElementosInspeccionadosProps {
  data: ElementosData;
  setData: React.Dispatch<React.SetStateAction<ElementosData>>;
  B: string;
  DARK: string;
}

// Columnas tipadas
type ColKey = keyof ElementoInspeccionado;

interface Column {
  key: ColKey;
  label: string;
  w: number;
}

// ─── COMPONENT ────────────────────────────────────────────────────
export const ElementosInspeccionados: React.FC<ElementosInspeccionadosProps> = ({
  data,
  setData,
  B,
  DARK,
}) => {
  const COLS: Column[] = [
    { key: "linea", label: "Línea", w: 60 },
    { key: "isometrico", label: "Isométrico", w: 90 },
    { key: "elemento", label: "Elemento", w: 80 },
    { key: "spool", label: "Spool", w: 70 },
    { key: "cuno", label: "Cuño", w: 60 },
    { key: "espSch", label: "Esp/Sch", w: 70 },
    { key: "diam", label: "Diám (in)", w: 80 },
    { key: "criterio", label: "Criterio", w: 80 },
    { key: "resultado", label: "Resultado", w: 110 },
  ];

  const addRow = () => {
    const newRow: ElementoInspeccionado = {
      linea: "",
      isometrico: "",
      elemento: "",
      spool: "",
      cuno: "",
      espSch: "",
      diam: "",
      criterio: "",
      resultado: "Aprobado",
    };

    setData((prev) => ({
      ...prev,
      elementos: [...prev.elementos, newRow],
    }));
  };

  const removeRow = (i: number) => {
    setData((prev) => ({
      ...prev,
      elementos: prev.elementos.filter((_, idx) => idx !== i),
    }));
  };

  const handleCellChange = (
    i: number,
    key: ColKey,
    value: string
  ) => {
    setData((prev) => {
      const rows = [...prev.elementos];
      rows[i] = { ...rows[i], [key]: value };
      return { ...prev, elementos: rows };
    });
  };

  return (
    <SCard n={6} title="Elementos Inspeccionados / Resultados" B={B} DARK={DARK}>
      <div style={{ overflowX: "auto" }}>
        <table
          className="table table-bordered table-sm mb-2"
          style={{ fontSize: "0.8rem", minWidth: 700 }}
        >
          <thead>
            <tr style={{ background: "#f1f3f5" }}>
              {COLS.map((c) => (
                <th
                  key={c.key}
                  style={{
                    fontWeight: 700,
                    fontSize: "0.68rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    padding: "0.45rem 0.5rem",
                    whiteSpace: "nowrap",
                    minWidth: c.w,
                  }}
                >
                  {c.label}
                </th>
              ))}
              <th style={{ width: 36 }} />
            </tr>
          </thead>

          <tbody>
            {data.elementos.map((row, i) => (
              <tr key={i}>
                {COLS.map((c) => (
                  <td
                    key={c.key}
                    style={{ padding: "0.2rem 0.25rem" }}
                  >
                    {c.key === "resultado" ? (
                      <Sel
                        name={c.key}
                        value={row[c.key]}
                        onChange={(e) =>
                          handleCellChange(i, c.key, e.target.value)
                        }
                        opts={["Aprobado", "Rechazado", "N/A"]}
                      />
                    ) : (
                      <Inp
                        name={c.key}
                        value={row[c.key]}
                        onChange={(e) =>
                          handleCellChange(i, c.key, e.target.value)
                        }
                      />
                    )}
                  </td>
                ))}

                <td
                  style={{
                    padding: "0.2rem",
                    textAlign: "center",
                    verticalAlign: "middle",
                  }}
                >
                  {data.elementos.length > 1 && (
                    <button
                      onClick={() => removeRow(i)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#dc3545",
                        cursor: "pointer",
                        fontSize: "1rem",
                        lineHeight: 1,
                      }}
                    >
                      ✕
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={addRow}
        style={{
          background: B,
          color: "#fff",
          border: "none",
          borderRadius: 6,
          padding: "0.35rem 0.9rem",
          fontSize: "0.8rem",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        + Agregar fila
      </button>
    </SCard>
  );
};