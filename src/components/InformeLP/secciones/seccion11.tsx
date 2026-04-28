import React, { type ChangeEvent } from "react";
import { SCard } from "../primitivos"; // ajustá el path

// ─── TYPES ────────────────────────────────────────────────────────
export interface Foto {
  name: string;
  url: string; // base64
}

export interface RegistroFotograficoData {
  fotos: Foto[];
}

interface RegistroFotograficoProps {
  data: RegistroFotograficoData;
  setData: React.Dispatch<React.SetStateAction<RegistroFotograficoData>>;
  B: string;
  DARK: string;
}

// ─── COMPONENT ────────────────────────────────────────────────────
export const RegistroFotografico: React.FC<RegistroFotograficoProps> = ({
  data,
  setData,
  B,
  DARK,
}) => {
  const handleFiles = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    Promise.all(
      files.map(
        (f) =>
          new Promise<Foto>((resolve) => {
            const reader = new FileReader();

            reader.onload = (ev) => {
              resolve({
                name: f.name,
                url: ev.target?.result as string,
              });
            };

            reader.readAsDataURL(f);
          })
      )
    ).then((imgs) => {
      setData((prev) => ({
        ...prev,
        fotos: [...prev.fotos, ...imgs],
      }));
    });

    // reset input
    e.target.value = "";
  };

  const remove = (i: number) => {
    setData((prev) => ({
      ...prev,
      fotos: prev.fotos.filter((_, idx) => idx !== i),
    }));
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
              "repeat(auto-fill, minmax(110px, 1fr))",
            gap: "0.6rem",
          }}
        >
          {data.fotos.map((f, i) => (
            <div
              key={i}
              style={{
                borderRadius: 7,
                overflow: "hidden",
                border: "1px solid #dee2e6",
                position: "relative",
              }}
            >
              <img
                src={f.url}
                alt={f.name}
                style={{
                  width: "100%",
                  height: 90,
                  objectFit: "cover",
                  display: "block",
                }}
              />

              <button
                onClick={() => remove(i)}
                style={{
                  position: "absolute",
                  top: 4,
                  right: 4,
                  background: "rgba(220,53,69,0.88)",
                  border: "none",
                  borderRadius: "50%",
                  width: 20,
                  height: 20,
                  color: "#fff",
                  fontSize: "0.65rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                }}
              >
                ✕
              </button>

              <div
                style={{
                  padding: "3px 6px",
                  fontSize: "0.62rem",
                  color: "#6c757d",
                  background: "#f8f9fa",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {f.name}
              </div>
            </div>
          ))}
        </div>
      )}
    </SCard>
  );
};