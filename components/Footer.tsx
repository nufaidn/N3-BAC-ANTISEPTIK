import { ChevronRight, Globe, Heart, Mail, Package, Phone, ShieldCheck, Sparkles } from "lucide-react";

const WHATSAPP_MESSAGE = encodeURIComponent(
  "Halo! Saya ingin memesan N3 BAC Antiseptik 100 ml. Boleh dibantu info harga dan ketersediaan stoknya? Terima kasih."
);
const WHATSAPP_URL = `https://wa.me/6282324764733?text=${WHATSAPP_MESSAGE}`;

const FOOTER_NAV = [
  { href: "#tantangan", label: "Tantangan" },
  { href: "#keunggulan", label: "Keunggulan" },
  { href: "#jenis-luka", label: "Jenis Luka" },
  { href: "#perbandingan", label: "Perbandingan" },
  { href: "#kontak", label: "Kontak" },
];

const FOOTER_CONTACT = [
  {
    href: WHATSAPP_URL,
    label: "+62 823-2476-4733",
    external: true,
    icon: <Phone />,
  },
  {
    href: "mailto:marketing@entrijayamakmur.com",
    label: "marketing@entrijayamakmur.com",
    icon: <Mail />,
  },
  {
    href: "https://entrijayamakmur.co.id",
    label: "entrijayamakmur.co.id",
    external: true,
    icon: <Globe />,
  },
  {
    href: "https://instagram.com/pt.entrijayamakmur",
    label: "@pt.entrijayamakmur",
    external: true,
    icon: (
      <img
        src="https://cdn.simpleicons.org/instagram/00B4D8"
        alt="Instagram"
        width="18"
        height="18"
        style={{ display: "block" }}
      />
    ),
  },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <img src="/img/logo.png" alt="N3 ENTRI" className="footer-logo-img" />
            <p className="footer-desc">
              N3 BAC — Antiseptik Pembersih Luka<br />Solusi Modern untuk Perawatan Luka
            </p>
            <div className="footer-badges">
              <span className="footer-badge">
                <ShieldCheck /> Steril &amp; Aman
              </span>
              <span className="footer-badge">
                <Sparkles /> PHMB 0,1%
              </span>
            </div>
          </div>

          <div className="footer-nav">
            <h4>Navigasi</h4>
            <div className="footer-links">
              {FOOTER_NAV.map((item) => (
                <a href={item.href} key={item.label}>
                  <ChevronRight /> {item.label}
                </a>
              ))}
            </div>
          </div>

          <div className="footer-contact">
            <h4>Hubungi Kami</h4>
            <div className="footer-contact-list">
              {FOOTER_CONTACT.map((item) => (
                <a
                  href={item.href}
                  key={item.label}
                  {...(item.external ? { target: "_blank", rel: "noopener" } : {})}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="footer-products">
            <h4>Varian Produk</h4>
            <div className="footer-product-list">
              <div className="footer-product-item">
                <Package />
                <div>
                  <strong>N3 BAC 100 ML</strong>
                  <span>Keluarga Praktis</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">&copy; 2026 PT Entri Jaya Makmur. All rights reserved.</p>
          <p className="footer-tagline">
            <Heart /> Produk berkualitas, keluarga terlindungi.
          </p>
        </div>
      </div>
    </footer>
  );
}