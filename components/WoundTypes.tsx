const WOUND_TYPES = [
  { img: "/img/jenisluka/image9.jpeg", alt: "Perawatan luka", title: "Luka Diabetes" },
  { img: "/img/jenisluka/image10.png", alt: "Luka Dekubitus", title: "Luka Dekubitus" },
  { img: "/img/jenisluka/image11.jpeg", alt: "Pasca Operasi", title: "Pasca Operasi" },
  { img: "/img/jenisluka/image12.png", alt: "Luka bakar", title: "Luka Bakar" },
  { img: "/img/jenisluka/image13.jpeg", alt: "Infeksi Ringan", title: "Infeksi Ringan" },
];

export default function WoundTypes() {
  return (
    <section className="wound-types" id="jenis-luka">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <p className="section-tag light">Indikasi</p>
          <h2 className="section-title light">
            Cocok Untuk Segala<br />Jenis Luka
          </h2>
          <p className="section-sub light">
            PHMB 0,1% aman digunakan pada luka akut maupun kronis — dari goresan
            kecil hingga luka pasca operasi.
          </p>
        </div>
        <div className="wound-grid">
          {WOUND_TYPES.map((item, i) => (
            <div className="wound-card" data-aos="fade-up" data-delay={String(i * 80)} key={item.title}>
              <img src={item.img} alt={item.alt} />
              <div className="wound-card-body">
                <h3>{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}