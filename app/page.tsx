"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import Filters from "@/components/Filters";
import { fetchProducts, Product } from "@/lib/sheets";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("todos");

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
      setFiltered(data);
      setLoading(false);
    });
  }, []);

  const handleFilter = (filter: string) => {
    setActiveFilter(filter);
    if (filter === "todos") {
      setFiltered(products);
      return;
    }
    if (filter === "dia" || filter === "noche" || filter === "ambos") {
      setFiltered(
        products.filter((p) => p.uso === filter || p.uso === "ambos")
      );
      return;
    }
    setFiltered(products.filter((p) => p.categoria === filter));
  };

  return (
    <main className="main">
      <header className="hero">
        <div className="hero-inner">
          <p className="hero-eyebrow">Colección esencial · Abril 2026</p>
          <h1 className="hero-title">Cuidado facial</h1>
          <p className="hero-sub">
            Productos formulados para nutrir, proteger e iluminar tu piel
          </p>
        </div>
        <div className="hero-line" />
      </header>

      <Filters active={activeFilter} onChange={handleFilter} />

      <section className="grid-section">
        {loading ? (
          <div className="loading">
            <span className="dot" />
            <span className="dot" />
            <span className="dot" />
          </div>
        ) : filtered.length === 0 ? (
          <p className="empty">No hay productos en esta categoría.</p>
        ) : (
          <div className="grid">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>

      <footer className="footer">
        <p>© 2026 · Colección esencial</p>
        <p className="footer-contact">
          Consultá disponibilidad por WhatsApp
        </p>
      </footer>
    </main>
  );
}