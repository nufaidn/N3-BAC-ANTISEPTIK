const WHATSAPP_MESSAGE = encodeURIComponent(
  "Halo! Saya ingin memesan N3 BAC Antiseptik 100 ml. Boleh dibantu info harga dan ketersediaan stoknya? Terima kasih."
);
const WHATSAPP_URL = `https://wa.me/6282324764733?text=${WHATSAPP_MESSAGE}`;
const SHOPEE_URL =
  "https://shopee.co.id/Pembersih-Luka-Antiseptik-N3-BAC-ENTRI-i.25320656.51059982902";
const TOKOPEDIA_URL = "https://vt.tokopedia.com/t/ZS96tu4dADshb-PYTwJ/";

const MARKETPLACES = [
  {
    href: SHOPEE_URL,
    label: "Shopee",
    icon: (
      <img src="https://cdn.simpleicons.org/shopee/white" alt="Shopee" width="18" height="18" />
    ),
  },
  {
    href: TOKOPEDIA_URL,
    label: "Tokopedia",
    icon: <img src="/img/logo-tokopedia.png" alt="Tokopedia" className="mkt-img-tokopedia" />,
  },
  {
    href: TOKOPEDIA_URL,
    label: "TikTok",
    icon: <img src="https://cdn.simpleicons.org/tiktok/white" alt="TikTok" width="18" height="18" />,
  },
];

export default function Contact() {
  return (
    <section className="contact" id="kontak">
      <div className="container">
        <div className="contact-inner" data-aos="fade-up">
          <div className="contact-info">
            <p className="section-tag light">Order Sekarang</p>
            <h2>
              Siap Luka Sembuh<br />Lebih Cepat?
            </h2>
            <p className="contact-lead">
              Pesan N3 BAC sekarang dan lindungi keluarga Anda dari infeksi.
              Konsultasi instan dengan tim kami.
            </p>
            <div className="cta-buttons">
              <a
                href={WHATSAPP_URL}
                className="btn-primary btn-large"
                target="_blank"
                rel="noopener"
              >
                <img
                  src="https://cdn.simpleicons.org/whatsapp/white"
                  alt="WA"
                  height="20"
                  style={{ verticalAlign: "middle", marginRight: 8 }}
                />
                Pesan via WhatsApp
              </a>
              <div className="marketplace-row">
                <span>Atau belanja di</span>
                <div className="marketplace-links">
                  {MARKETPLACES.map((m) => (
                    <a
                      href={m.href}
                      className="marketplace-link"
                      target="_blank"
                      rel="noopener"
                      aria-label={m.label}
                      key={m.label}
                    >
                      <span className="mkt-icon">{m.icon}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="contact-cta">
            <img src="/img/product-100ml.png" alt="N3 BAC 100ml" className="contact-product" />
            <p className="contact-note">Varian 100 ml</p>
          </div>
        </div>
      </div>
    </section>
  );
}