import { Product } from "@/lib/sheets";

const USO_LABELS: Record<string, { label: string; className: string }> = {
  dia: { label: "Día", className: "badge-dia" },
  noche: { label: "Noche", className: "badge-noche" },
  ambos: { label: "Día y noche", className: "badge-ambos" },
};

const CAT_LABELS: Record<string, string> = {
  limpieza: "Limpieza",
  hidratante: "Hidratante",
  serum: "Sérum",
  solar: "Solar",
};

const PLACEHOLDER_SVG = (
  <svg
    className="card-img-placeholder"
    width="64"
    height="64"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="24" y="10" width="16" height="42" rx="6" fill="#8c7b6b" />
    <rect x="26" y="4" width="12" height="8" rx="3" fill="#8c7b6b" />
    <rect x="27" y="28" width="10" height="1.5" rx="1" fill="#fdfcfa" />
    <rect x="27" y="32" width="7" height="1.5" rx="1" fill="#fdfcfa" />
  </svg>
);

export default function ProductCard({ product }: { product: Product }) {
  const uso = USO_LABELS[product.uso] || USO_LABELS.ambos;

  return (
    <div className="card">
      <div className="card-img">
        {product.imagen_url ? (
          <img src={product.imagen_url} alt={product.nombre} />
        ) : (
          PLACEHOLDER_SVG
        )}
      </div>

      <div className="card-body">
        <div className="badge-row">
          <span className={`badge ${uso.className}`}>{uso.label}</span>
          <span className="badge badge-cat">{CAT_LABELS[product.categoria]}</span>
        </div>

        <div>
          <p className="card-name">{product.nombre}</p>
          <p className="card-size">{product.ml_g}</p>
        </div>

        <p className="card-desc">{product.descripcion}</p>

        <div className="card-footer">
          <span className="price">
            ${product.precio.toLocaleString("es-AR")}
          </span>
          <a
            href={`https://wa.me/?text=Hola! Me interesa el producto: ${encodeURIComponent(product.nombre)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="consult-btn"
          >
            Consultar
          </a>
        </div>
      </div>
    </div>
  );
}
