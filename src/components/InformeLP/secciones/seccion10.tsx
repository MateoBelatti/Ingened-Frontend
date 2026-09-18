import React, { useState } from "react";
import { SCard, Inp } from "../primitivos";
import { B, DARK } from "../constantes";
import { ImageEditorModal } from "../../common/ImageEditorModal";
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
  const [editingTarget, setEditingTarget] = useState<{
    rowIdx: number;
    fileIdx: number;
    file: File;
  } | null>(null);

  const addRow = () => {
    const newRow: ConsumibleDto = {
      producto: "",
      lote: "",
      marca: "",
      vencimiento: "",
      imagenes: [],
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

  const handleAddFiles = (
    rowIdx: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newFiles = Array.from(e.target.files || []);
    if (newFiles.length === 0) return;

    setData((prev) => {
      const rows = [...prev.consumibles];
      const currentImgs = rows[rowIdx].imagenes || [];
      rows[rowIdx] = {
        ...rows[rowIdx],
        imagenes: [...currentImgs, ...newFiles],
      };
      return { ...prev, consumibles: rows };
    });

    e.target.value = "";
  };

  const removeImage = (rowIdx: number, fileIdx: number) => {
    setData((prev) => {
      const rows = [...prev.consumibles];
      const newImgs = (rows[rowIdx].imagenes || []).filter(
        (_, idx) => idx !== fileIdx
      );
      rows[rowIdx] = { ...rows[rowIdx], imagenes: newImgs };
      return { ...prev, consumibles: rows };
    });
  };

  const handleSaveEditedImage = (editedFile: File) => {
    if (!editingTarget) return;
    const { rowIdx, fileIdx } = editingTarget;

    setData((prev) => {
      const rows = [...prev.consumibles];
      const newImgs = [...(rows[rowIdx].imagenes || [])];
      newImgs[fileIdx] = editedFile;
      rows[rowIdx] = { ...rows[rowIdx], imagenes: newImgs };
      return { ...prev, consumibles: rows };
    });

    setEditingTarget(null);
  };

  return (
    <SCard n={10} title="Consumibles / Trazabilidad" B={B} DARK={DARK}>
      <div style={{ overflowX: "auto" }}>
        <table
          className="table table-bordered table-sm mb-2"
          style={{ fontSize: "0.85rem", minWidth: 550 }}
        >
          <thead>
            <tr style={{ background: "#f1f3f5" }}>
              {["Producto", "Lote", "Marca", "Venc.", "Fotos"].map((c) => (
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
              ))}
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
                    onChange={(e: { target: { value: string } }) =>
                      handleCellChange(i, "producto", e.target.value)
                    }
                  />
                </td>

                <td style={{ padding: "0.2rem 0.25rem" }}>
                  <Inp
                    name="lote"
                    value={row.lote}
                    onChange={(e: { target: { value: string } }) =>
                      handleCellChange(i, "lote", e.target.value)
                    }
                  />
                </td>

                <td style={{ padding: "0.2rem 0.25rem" }}>
                  <Inp
                    name="marca"
                    value={row.marca}
                    onChange={(e: { target: { value: string } }) =>
                      handleCellChange(i, "marca", e.target.value)
                    }
                  />
                </td>

                <td style={{ padding: "0.2rem 0.25rem" }}>
                  <Inp
                    name="vencimiento"
                    value={row.vencimiento}
                    onChange={(e: { target: { value: string } }) =>
                      handleCellChange(i, "vencimiento", e.target.value)
                    }
                  />
                </td>

                <td style={{ padding: "0.25rem", minWidth: 160 }}>
                  {/* Thumbnails grid */}
                  {row.imagenes && row.imagenes.length > 0 && (
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "6px",
                        marginBottom: "6px",
                      }}
                    >
                      {row.imagenes.map((imgFile, imgIdx) => {
                        const imgUrl = URL.createObjectURL(imgFile);
                        return (
                          <div
                            key={imgIdx}
                            style={{
                              position: "relative",
                              width: 48,
                              height: 48,
                              borderRadius: 4,
                              overflow: "hidden",
                              border: "1px solid #ced4da",
                              cursor: "pointer",
                              background: "#e9ecef",
                            }}
                            title="Haz clic para editar/ver foto"
                            onClick={() =>
                              setEditingTarget({
                                rowIdx: i,
                                fileIdx: imgIdx,
                                file: imgFile,
                              })
                            }
                          >
                            <img
                              src={imgUrl}
                              alt={imgFile.name}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                            {/* Overlay Edit Indicator */}
                            <div
                              style={{
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                right: 0,
                                background: "rgba(0,0,0,0.5)",
                                color: "#fff",
                                fontSize: "0.55rem",
                                textAlign: "center",
                                padding: "1px 0",
                              }}
                            >
                              ✏️ Edit
                            </div>
                            {/* Delete button */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeImage(i, imgIdx);
                              }}
                              style={{
                                position: "absolute",
                                top: 1,
                                right: 1,
                                background: "rgba(220,53,69,0.9)",
                                color: "#fff",
                                border: "none",
                                borderRadius: "50%",
                                width: 14,
                                height: 14,
                                fontSize: "0.55rem",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: 0,
                              }}
                              title="Eliminar foto"
                            >
                              ✕
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Add images button / input */}
                  <label
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      padding: "2px 8px",
                      background: "#f8f9fa",
                      border: "1px dashed #adb5bd",
                      borderRadius: 4,
                      fontSize: "0.72rem",
                      cursor: "pointer",
                      color: DARK,
                      fontWeight: 600,
                      margin: 0,
                    }}
                  >
                    <span>📷 + Fotos</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleAddFiles(i, e)}
                      style={{ display: "none" }}
                    />
                  </label>
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
                      title="Eliminar fila"
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

      {/* Image Editor Modal */}
      {editingTarget && (
        <ImageEditorModal
          file={editingTarget.file}
          isOpen={!!editingTarget}
          onClose={() => setEditingTarget(null)}
          onSave={handleSaveEditedImage}
        />
      )}
    </SCard>
  );
};