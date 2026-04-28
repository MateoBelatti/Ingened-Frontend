import React from "react";
import { SCard, Inp } from "../primitivos"; // ajustá el path

// ─── TYPES ────────────────────────────────────────────────────────
export interface Consumible {
  producto: string;
  lote: string;
  marca: string;
  vencimiento: string;
}

export interface ConsumiblesData {
  consumibles: Consumible[];
}

interface ConsumiblesProps {
  data: ConsumiblesData;
  setData: React.Dispatch<React.SetStateAction<ConsumiblesData>>;
  B: string;
  DARK: string;
}

type ConsumibleKey = keyof Consumible;

// ─── COMPONENT ────────────────────────────────────────────────────
export const Consumibles: React.FC<ConsumiblesProps> = ({
  data,
  setData,
  B,
  DARK,
}) => {
  const addRow = () => {
    const newRow: Consumible = {
      producto: "",
      lote: "",
      marca: "",
      vencimiento: "",
    };

    setData((prev) => ({
      ...prev,
      consumibles: [...prev.consumibles, newRow],
    }));
  };

  const removeRow = (i: number) => {
    setData((prev) => ({
      ...prev,
      consumibles: prev.consumibles.filter((_, idx) => idx !== i),
    }));
  };

  const handleCellChange = (
    i: number,
    key: ConsumibleKey,
    value: string
  ) => {
    setData((prev) => {
      const rows = [...prev.consumibles];
      rows[i] = { ...rows[i], [key]: value };
      return { ...prev, consumibles: rows };
    });
  };

  return (
    <SCard n={10} title="Consumibles / Trazabilidad" B={B} DARK={DARK}>
      <div style={{ overflowX: "auto" }}>
        <table
          className="table table-bordered table-sm mb-2"
          style={{ fontSize: "0.85rem", minWidth: 480 }}
        >
          <thead>
            <tr style={{ background: "#f1f3f5" }}>
              {["Producto", "Lote", "Marca", "Vencimiento"].map(
                (c) => (
                  <th
                    key={c}
                    style={{
                      fontWeight: 700,
                      fontSize: "0.68rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      padding: "0.45rem 0.5rem",
                    }}
                  >
                    {c}
                  </th>
                )
              )}
              <th style={{ width: 36 }} />
            </tr>
          </thead>

          <tbody>
            {data.consumibles.map((row, i) => (
              <tr key={i}>
                <td style={{ padding: "0.2rem 0.25rem" }}>
                  <Inp
                    name="producto"
                    value={row.producto}
                    onChange={(e: { target: { value: string; }; }) =>
                      handleCellChange(i, "producto", e.target.value)
                    }
                  />
                </td>

                <td style={{ padding: "0.2rem 0.25rem" }}>
                  <Inp
                    name="lote"
                    value={row.lote}
                    onChange={(e: { target: { value: string; }; }) =>
                      handleCellChange(i, "lote", e.target.value)
                    }
                  />
                </td>

                <td style={{ padding: "0.2rem 0.25rem" }}>
                  <Inp
                    name="marca"
                    value={row.marca}
                    onChange={(e: { target: { value: string; }; }) =>
                      handleCellChange(i, "marca", e.target.value)
                    }
                  />
                </td>

                <td style={{ padding: "0.2rem 0.25rem" }}>
                  <Inp
                    name="vencimiento"
                    value={row.vencimiento}
                    type="date"
                    onChange={(e: { target: { value: string; }; }) =>
                      handleCellChange(
                        i,
                        "vencimiento",
                        e.target.value
                      )
                    }
                  />
                </td>

                <td
                  style={{
                    padding: "0.2rem",
                    textAlign: "center",
                    verticalAlign: "middle",
                  }}
                >
                  {data.consumibles.length > 1 && (
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