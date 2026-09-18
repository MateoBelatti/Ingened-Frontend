import React, { useState, useEffect, useCallback } from "react";
import Cropper, { type Area } from "react-easy-crop";
import { getCroppedImg } from "../../utils/imageUtils";
import "../../styles/components/imageEditorModal.css";

interface ImageEditorModalProps {
  file: File | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (editedFile: File) => void;
}

export const ImageEditorModal: React.FC<ImageEditorModalProps> = ({
  file,
  isOpen,
  onClose,
  onSave,
}) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [aspect, setAspect] = useState<number | undefined>(undefined);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  useEffect(() => {
    if (file && isOpen) {
      const url = URL.createObjectURL(file);
      setImageSrc(url);
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setRotation(0);
      setAspect(undefined);
      setCroppedAreaPixels(null);

      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setImageSrc(null);
    }
  }, [file, isOpen]);

  const onCropComplete = useCallback(
    (_croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const handleRotateLeft = () => {
    setRotation((prev) => (prev - 90 + 360) % 360);
  };

  const handleRotateRight = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const handleReset = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
    setAspect(undefined);
  };

  const handleSave = async () => {
    if (!file || !imageSrc || !croppedAreaPixels) return;

    try {
      setIsSaving(true);
      const editedFile = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation,
        file.name,
        file.type
      );
      onSave(editedFile);
      onClose();
    } catch (err) {
      console.error("Error al recortar la imagen:", err);
      alert("No se pudo procesar la imagen. Intentá nuevamente.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen || !file || !imageSrc) return null;

  return (
    <div className="iem-overlay" onClick={onClose}>
      <div className="iem-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="iem-header">
          <h3 className="iem-title">
            <span>📷</span> Editar Imagen - {file.name}
          </h3>
          <button className="iem-close-btn" onClick={onClose} title="Cerrar">
            ✕
          </button>
        </div>

        {/* Body / Cropper Area */}
        <div className="iem-body">
          <div className="iem-cropper-container">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              aspect={aspect}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              onRotationChange={setRotation}
            />
          </div>
        </div>

        {/* Toolbar Controls */}
        <div className="iem-toolbar">
          {/* Rotación */}
          <div className="iem-controls-group">
            <button
              type="button"
              className="iem-control-btn"
              onClick={handleRotateLeft}
              title="Girar 90° a la izquierda"
            >
              ↺ Girar Izq
            </button>
            <button
              type="button"
              className="iem-control-btn"
              onClick={handleRotateRight}
              title="Girar 90° a la derecha"
            >
              ↻ Girar Der
            </button>
          </div>

          {/* Proporción / Aspect Ratio */}
          <div className="iem-controls-group">
            <button
              type="button"
              className={`iem-control-btn ${aspect === undefined ? "active" : ""}`}
              onClick={() => setAspect(undefined)}
            >
              Libre
            </button>
            <button
              type="button"
              className={`iem-control-btn ${aspect === 1 ? "active" : ""}`}
              onClick={() => setAspect(1)}
            >
              1:1
            </button>
            <button
              type="button"
              className={`iem-control-btn ${aspect === 4 / 3 ? "active" : ""}`}
              onClick={() => setAspect(4 / 3)}
            >
              4:3
            </button>
            <button
              type="button"
              className={`iem-control-btn ${aspect === 16 / 9 ? "active" : ""}`}
              onClick={() => setAspect(16 / 9)}
            >
              16:9
            </button>
          </div>

          {/* Zoom Slider */}
          <div className="iem-zoom-slider">
            <span>Zoom:</span>
            <input
              type="range"
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-label="Zoom"
              onChange={(e) => setZoom(Number(e.target.value))}
            />
          </div>

          {/* Reset */}
          <div className="iem-controls-group">
            <button
              type="button"
              className="iem-control-btn"
              onClick={handleReset}
              title="Restablecer ajustes"
            >
              ↩ Reset
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="iem-footer">
          <button
            type="button"
            className="iem-btn-cancel"
            onClick={onClose}
            disabled={isSaving}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="iem-btn-save"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? "Guardando..." : "Guardar Cambios"}
          </button>
        </div>
      </div>
    </div>
  );
};
