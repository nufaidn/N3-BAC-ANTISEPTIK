import { Check } from "lucide-react";

const CHECKS = [
  "Efektif membunuh bakteri gram positif & negatif",
  "Tidak menyebabkan iritasi atau rasa perih",
  "Cocok untuk semua jenis luka: akut & kronis",
  "Stabil dan aman digunakan jangka panjang",
];

export default function Generation() {
  return (
    <section className="generation" id="generasi-baru">
      <div className="container">
        <div className="generation-inner">
          <div className="generation-text" data-aos="fade-right">
            <p className="section-tag">Solusi N3 BAC</p>
            <h2 className="section-title">
              Antiseptik<br />
              <span className="text-cyan">Generasi Baru</span>
            </h2>
            <p className="section-lead">
              Berbasis Polyhexanide (PHMB) 0,1% — antiseptik yang efektif,
              steril, dan nyaman untuk perawatan luka modern.
            </p>
            <ul className="check-list">
              {CHECKS.map((text) => (
                <li key={text}>
                  <span className="check">
                    <Check />
                  </span>{text}
                </li>
              ))}
            </ul>
          </div>
          <div className="generation-visual" data-aos="fade-left">
            <img src="/img/product1.png" alt="semua product" className="gen-product" />
          </div>
        </div>
      </div>
    </section>
  );
}