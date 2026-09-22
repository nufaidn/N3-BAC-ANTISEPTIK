import { Package, ShieldCheck } from "lucide-react";

const SPECS = [
  {
    number: "0,1%",
    icon: null,
    title: "Kandungan PHMB",
    desc: "Aman untuk luka terbuka. Steril & non-pirogenik.",
  },
  {
    icon: Package,
    title: "Stabilitas Produk",
    desc: "Tahan 2 tahun dalam suhu ruang.",
  },
  {
    icon: ShieldCheck,
    title: "Bebas Perih",
    desc: "Aplikasi nyaman digunakan segala usia tanpa iritasi.",
  },
];

export default function Advantages() {
  return (
    <section className="advantages" id="keunggulan">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <p className="section-tag">Keunggulan Produk</p>
          <h2 className="section-title">N3 BAC — Spesifikasi & Manfaat</h2>
          <p className="section-sub">
            Dirancang untuk perawatan luka yang lebih aman, steril, dan nyaman
            di setiap pemakaian.
          </p>
        </div>
        <div className="advantages-grid" style={{ display: "block" }}>
          <div
            className="spec-cards"
            data-aos="fade-up"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 32,
              width: "100%",
            }}
          >
            {SPECS.map((spec, i) => {
              const highlighted = spec.number != null;
              return (
                <div
                  className={highlighted ? "spec-card spec-card--highlight" : "spec-card"}
                  key={spec.title}
                  data-aos="fade-up"
                  data-delay={String(i * 100)}
                >
                  {highlighted ? (
                    <span className="spec-number">{spec.number}</span>
                  ) : (
                    <span className="spec-icon">
                      <spec.icon />
                    </span>
                  )}
                  <h3>{spec.title}</h3>
                  <p>{spec.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}