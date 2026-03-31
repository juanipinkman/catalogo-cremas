export type Product = {
  id: string;
  nombre: string;
  descripcion: string;
  ingredientes: string;
  tipo_piel: string;
  uso: "dia" | "noche" | "ambos";
  precio: number;
  ml_g: string;
  categoria: "limpieza" | "hidratante" | "serum" | "solar";
  imagen_url: string;
  activo: boolean;
};

export async function fetchProducts(): Promise<Product[]> {
  const url = process.env.NEXT_PUBLIC_SHEET_CSV_URL;

  if (!url) {
    console.warn("NEXT_PUBLIC_SHEET_CSV_URL no está definida.");
    return [];
  }

  try {
    const res = await fetch(url, { next: { revalidate: 60 } });
    const text = await res.text();
    return parseCSV(text);
  } catch (e) {
    console.error("Error al cargar productos:", e);
    return [];
  }
}

function parseCSV(csv: string): Product[] {
  const lines = csv.trim().split("\n");

  return lines
    .slice(1)
    .map((line) => {
      const cols = parseCSVLine(line);
      const [
        id, nombre, descripcion, ingredientes, tipo_piel,
        uso, precio, ml_g, categoria, imagen_url, activo,
      ] = cols;

      return {
        id,
        nombre,
        descripcion,
        ingredientes,
        tipo_piel,
        uso: uso as Product["uso"],
        precio: Number(precio),
        ml_g,
        categoria: categoria as Product["categoria"],
        imagen_url,
        activo: activo?.trim().toUpperCase() === "TRUE",
      };
    })
    .filter((p) => p.activo && p.nombre);
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}