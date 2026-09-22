export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-bg">
        <img
          src="https://res.cloudinary.com/yy5fen2q/image/upload/v1790046926/BG-AntiSeptic_dwd1sn.png"
          alt=""
          className="hero-bg-img"
          aria-hidden="true"
        />
      </div>
      <div className="hero-inner">
        <div className="hero-text" data-aos="fade-right">
          <p className="hero-eyebrow">Solusi Modern</p>
          <h1 className="hero-title">
            <span className="title-line">Perawatan <span className="title-accent">Luka</span></span>
          </h1>
          <div className="hero-brand">
            <span className="brand-name">
              N3 BAC
              <span className="brand-sub">Antiseptik</span>
            </span>
          </div>
          <p className="hero-lead">
            Semprot antiseptik berbasis <strong>PHMB 0,1%</strong> yang efektif membunuh
            bakteri tanpa rasa perih — aman untuk semua jenis luka akut &amp; kronis,
            dewasa maupun anak.
          </p>
          <div className="hero-actions">
            <a href="#kontak" className="btn-primary">
              Dapatkan Sekarang
            </a>
            <a href="#keunggulan" className="btn-ghost">
              Pelajari Lebih →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}