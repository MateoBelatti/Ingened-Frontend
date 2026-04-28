import React, { type  ChangeEvent, type CSSProperties } from "react";

// ─── LBL ──────────────────────────────────────────────────────────
interface LblProps {
  children: React.ReactNode;
  required?: boolean;
}

export const Lbl: React.FC<LblProps> = ({ children, required = false }) => {
  return (
    <label
      style={{
        display: "block",
        fontSize: "0.72rem",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.6px",
        color: "#7a8694",
        marginBottom: 4,
      }}
    >
      {children}
      {required && (
        <span style={{ color: "#dc3545", marginLeft: 3 }}>*</span>
      )}
    </label>
  );
};

// ─── INPUT ────────────────────────────────────────────────────────
interface InpProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  style?: CSSProperties;
}

export const Inp: React.FC<InpProps> = ({
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
  style = {},
  ...rest
}) => {
  return (
    <input
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      className="form-control form-control-sm"
      style={{
        fontSize: "0.875rem",
        borderColor: "#ced4da",
        ...style,
      }}
      {...rest}
    />
  );
};

// ─── TEXTAREA ─────────────────────────────────────────────────────
interface TxtProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export const Txt: React.FC<TxtProps> = ({
  name,
  value,
  onChange,
  rows = 3,
  placeholder = "",
  ...rest
}) => {
  return (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows={rows}
      placeholder={placeholder}
      className="form-control form-control-sm"
      style={{ fontSize: "0.875rem", borderColor: "#ced4da" }}
      {...rest}
    />
  );
};

// ─── SELECT ───────────────────────────────────────────────────────
interface SelProps {
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  opts: string[];
}

export const Sel: React.FC<SelProps> = ({
  name,
  value,
  onChange,
  opts,
}) => {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="form-select form-select-sm"
      style={{ fontSize: "0.875rem", borderColor: "#ced4da" }}
    >
      {opts.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
};

// ─── SECTION CARD ─────────────────────────────────────────────────
interface SCardProps {
  n: number | string;
  title: string;
  children: React.ReactNode;
  DARK: string;
  B: string;
}

export const SCard: React.FC<SCardProps> = ({
  n,
  title,
  children,
  DARK,
  B,
}) => {
  return (
    <div
      style={{
        borderRadius: 10,
        overflow: "hidden",
        border: "1px solid #dee2e6",
        marginBottom: "1.25rem",
        boxShadow: "0 1px 5px rgba(0,0,0,0.05)",
      }}
    >
      <div
        style={{
          background: DARK,
          borderBottom: `3px solid ${B}`,
          padding: "0.65rem 1.25rem",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            width: 22,
            height: 22,
            borderRadius: "50%",
            background: B,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.68rem",
            fontWeight: 800,
            color: "#fff",
            flexShrink: 0,
          }}
        >
          {n}
        </div>
        <span
          style={{
            color: "#fff",
            fontWeight: 700,
            fontSize: "0.78rem",
            letterSpacing: "1.2px",
            textTransform: "uppercase",
          }}
        >
          {title}
        </span>
      </div>

      <div style={{ background: "#fff", padding: "1.25rem 1.5rem" }}>
        {children}
      </div>
    </div>
  );
};

// ─── GRID HELPERS ─────────────────────────────────────────────────
interface RowProps {
  children: React.ReactNode;
}

export const Row: React.FC<RowProps> = ({ children }) => (
  <div className="row g-3">{children}</div>
);

interface ColProps {
  col?: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
}

export const Col: React.FC<ColProps> = ({
  col = "col-md-4",
  label,
  required = false,
  children,
}) => {
  return (
    <div className={col}>
      <Lbl required={required}>{label}</Lbl>
      {children}
    </div>
  );
};