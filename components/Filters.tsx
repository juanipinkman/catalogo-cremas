const FILTERS = [
  { key: "todos", label: "Todos" },
  { key: "dia", label: "Día" },
  { key: "noche", label: "Noche" },
  { key: "ambos", label: "Día y noche" },
  { key: "limpieza", label: "Limpieza" },
  { key: "hidratante", label: "Hidratantes" },
  { key: "serum", label: "Sérums" },
  { key: "solar", label: "Protector solar" },
];

export default function Filters({
  active,
  onChange,
}: {
  active: string;
  onChange: (f: string) => void;
}) {
  return (
    <nav className="filters">
      {FILTERS.map((f) => (
        <button
          key={f.key}
          className={`filter-btn ${active === f.key ? "active" : ""}`}
          onClick={() => onChange(f.key)}
        >
          {f.label}
        </button>
      ))}
    </nav>
  );
}
