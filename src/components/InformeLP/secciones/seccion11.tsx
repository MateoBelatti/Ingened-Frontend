import React, { useState, type ChangeEvent } from "react";
import { SCard } from "../primitivos";
import { B, DARK } from "../constantes";
import { ImageEditorModal } from "../../common/ImageEditorModal";
import type { RegistroFotograficoDataDto } from "../../../types/informe.types";

interface RegistroFotograficoProps {
  data: RegistroFotograficoDataDto;
  setData: React.Dispatch<React.SetStateAction<RegistroFotograficoDataDto>>;
}

// ─── COMPONENT ────────────────────────────────────────────────────
export const RegistroFotografico: React.FC<RegistroFotograficoProps> = ({
  data,
  setData,
}) => {
  const [editingTarget, setEditingTarget] = useState<{
    index: number;
    file: File;
  } | null>(null);

  const handleFiles = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setData((prev) => ({
      ...prev,
      fotos: [...prev.fotos, ...files],
    }));
    e.target.value = "";
  };

  const remove = (i: number) => {
    setData((prev) => ({
      ...prev,
      fotos: prev.fotos.filter((_, idx) => idx !== i),
    }));
  };

  const handleSaveEditedImage = (editedFile: File) => {
    if (!editingTarget) return;
    const { index } = editingTarget;

    setData((prev) => {
      const newFotos = [...prev.fotos];
      newFotos[index] = editedFile;
      return { ...prev, fotos: newFotos };
    });

    setEditingTarget(null);
  };

  return (
    <SCard n={11} title="Registro Fotográfico" B={B} DARK={DARK}>
      <label
        style={{
          display: "block",
          border: `2px dashed ${B}`,
          borderRadius: 8,
          padding: "1.5rem",
          textAlign: "center",
          cursor: "pointer",
          background: "#fff8f3",
          marginBottom: "1rem",
        }}
      >
        <div style={{ fontSize: "2rem", marginBottom: 6 }}>📷</div>

        <p
          style={{
            color: "#6c757d",
            fontSize: "0.85rem",
            margin: "0 0 0.75rem",
          }}
        >
          Tocá para seleccionar o sacar fotos
        </p>

        <span
          style={{
            background: B,
            color: "#fff",
            borderRadius: 6,
            padding: "0.35rem 1rem",
            fontSize: "0.82rem",
            fontWeight: 600,
          }}
        >
          Seleccionar imágenes
        </span>

        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFiles}
          style={{ display: "none" }}
        />
      </label>

      {data.fotos.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(130px, 1fr))",
            gap: "0.75rem",
          }}
        >
          {data.fotos.map((f, i) => {
            const imgUrl = URL.createObjectURL(f);
            return (
              <div
                key={i}
                style={{
                  borderRadius: 8,
                  overflow: "hidden",
                  border: "1px solid #dee2e6",
                  position: "relative",
                  background: "#fff",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Image Container with click to edit */}
                <div
                  style={{
                    position: "relative",
                    height: 100,
                    cursor: "pointer",
                    overflow: "hidden",
                    background: "#000",
                  }}
                  title="Haz clic para editar la foto"
                  onClick={() => setEditingTarget({ index: i, file: f })}
                >
                  <img
                    src={imgUrl}
                    alt={f.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      transition: "transform 0.2s",
                    }}
                  />

                  {/* Edit badge overlay */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: "rgba(0, 0, 0, 0.6)",
                      color: "#fff",
                      fontSize: "0.65rem",
                      fontWeight: 600,
                      textAlign: "center",
                      padding: "3px 0",
                      backdropFilter: "blur(2px)",
                    }}
                  >
                    ✏️ Recortar / Girar
                  </div>

                  {/* Remove button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      remove(i);
                    }}
                    style={{
                      position: "absolute",
                      top: 4,
                      right: 4,
                      background: "rgba(220,53,69,0.9)",
                      border: "none",
                      borderRadius: "50%",
                      width: 22,
                      height: 22,
                      color: "#fff",
                      fontSize: "0.7rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
                    }}
                    title="Eliminar foto"
                  >
                    ✕
                  </button>
                </div>

                {/* Caption */}
                <div
                  style={{
                    padding: "4px 6px",
                    fontSize: "0.65rem",
                    color: "#495057",
                    background: "#f8f9fa",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    borderTop: "1px solid #f1f3f5",
                    textAlign: "center",
                  }}
                  title={f.name}
                >
                  {f.name}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal editor */}
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