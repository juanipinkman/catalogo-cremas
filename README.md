# Catálogo de cremas · Colección esencial

Sitio web de catálogo de productos de cuidado facial, conectado a Google Sheets como base de datos.

## Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Google Sheets** (como base de datos vía CSV público)
- **Vercel** (deploy gratuito)

---

## Estructura del proyecto

```
catalogo-cremas/
├── app/
│   ├── layout.tsx       ← root layout + fuentes
│   ├── page.tsx         ← catálogo público (página principal)
│   └── globals.css      ← estilos globales
├── components/
│   ├── ProductCard.tsx  ← tarjeta de producto
│   └── Filters.tsx      ← filtros por categoría / uso
├── lib/
│   └── sheets.ts        ← fetch de datos desde Google Sheets
└── .env.local           ← variables de entorno (crear desde .env.local.example)
```

---

## 1. Configurar Google Sheets

### Crear el Sheet

1. Crear un nuevo Google Sheet
2. Nombrar la primera hoja `productos`
3. Agregar estas columnas **exactamente en este orden** en la fila 1:

| id | nombre | descripcion | ingredientes | tipo_piel | uso | precio | ml_g | categoria | imagen_url | activo |
|---|---|---|---|---|---|---|---|---|---|---|

### Valores válidos

- `uso`: `dia`, `noche`, o `ambos`
- `categoria`: `limpieza`, `hidratante`, `serum`, `solar`
- `activo`: `TRUE` o `FALSE`
- `precio`: número sin puntos ni $  (ej: `32000`)
- `imagen_url`: URL pública de la foto, o dejar vacío para placeholder

### Publicar el Sheet como CSV

1. Archivo → Compartir → Publicar en la web
2. Seleccionar la hoja `productos`
3. Seleccionar formato **Valores separados por comas (.csv)**
4. Hacer clic en **Publicar**
5. Copiar la URL generada

### Configurar la variable de entorno

```bash
cp .env.local.example .env.local
```

Pegar la URL del Sheet en `.env.local`:

```
NEXT_PUBLIC_SHEET_CSV_URL=https://docs.google.com/spreadsheets/d/TU_ID/export?format=csv&gid=0
```

---

## 2. Correr localmente

```bash
npm install
npm run dev
```

Abrir http://localhost:3000

---

## 3. Deploy en Vercel

1. Subir el proyecto a GitHub
2. Ir a vercel.com → New Project → importar el repo
3. En "Environment Variables" agregar `NEXT_PUBLIC_SHEET_CSV_URL`
4. Deploy ✓

El sitio se actualiza automáticamente cada 60 segundos cuando se edita el Sheet.

---

## 4. Agregar fotos de productos

En el Sheet, columna `imagen_url`, pegar la URL pública de la foto.

Opciones recomendadas:
- **Google Drive**: subir foto → clic derecho → Obtener enlace → cambiar a "cualquier persona con el enlace puede ver" → usar URL directa
- **Cloudinary** (gratis): subir imágenes y usar la URL generada
- **WhatsApp**: no tiene URLs directas, usar otra opción

Tamaño recomendado: cuadrada, mínimo 600×600px.
