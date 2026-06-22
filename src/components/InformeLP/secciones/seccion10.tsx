import React from "react";
import { SCard, Inp } from "../primitivos"; // ajustá el path
import { B, DARK } from "../constantes";

import type { ConsumibleDto } from "../../../types/informe.types";

export interface ConsumiblesData {
  consumibles: ConsumibleDto[];
}

interface ConsumiblesProps {
  data: ConsumiblesData;
  setData: React.Dispatch<React.SetStateAction<ConsumiblesData>>;
}

type ConsumibleKey = keyof ConsumibleDto;

// ─── COMPONENT ────────────────────────────────────────────────────
export const Consumibles: React.FC<ConsumiblesProps> = ({
  data,
  setData,
}) => {
  const addRow = () => {
    const newRow: ConsumibleDto = {
      producto: "",
      lote: "",
      marca: "",
      vencimiento: "",
      imagenes: []
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
      (rows[i] as any)[key] = value;
      return { ...prev, consumibles: rows };
    });
  };

  const handleFileChange = (i: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setData((prev) => {
      const rows = [...prev.consumibles];
      rows[i] = { ...rows[i], imagenes: files };
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
              {["Producto", "Lote", "Marca", "Venc.", "Fotos"].map(
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
                    onChange={(e: { target: { value: string; }; }) =>
                      handleCellChange(i, "vencimiento", e.target.value)
                    }
                  />
                </td>

                <td style={{ padding: "0.2rem 0.25rem" }}>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleFileChange(i, e)}
                    style={{ fontSize: "0.75rem", width: "100%", padding: "0.15rem" }}
                  />
                  {row.imagenes && row.imagenes.length > 0 && (
                    <div style={{ fontSize: "0.65rem", color: DARK }}>
                      {row.imagenes.length} archivo(s)
                    </div>
                  )}
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