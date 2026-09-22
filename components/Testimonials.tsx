"use client";

import { useEffect, useRef } from "react";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    quote:
      'Luka pasca operasi caesar saya cepat sekali keringnya pakai N3 BAC ini. Paling suka karena sama sekali nggak perih pas disemprot.',
    name: "Siti Rahmawati",
    role: "Ibu Rumah Tangga, Bandung",
    avatar: "S",
    gradient: "linear-gradient(135deg,#0563C1,#00B4D8)",
  },
  {
    quote:
      'Pasien diabetes saya lukanya sulit sembuh sebelumnya. Semenjak perawatan lukanya pakai antiseptik ini, progresnya sangat luar biasa dan infeksi terkontrol baik.',
    name: "Budi Santoso",
    role: "Perawat Luka Homecare, Jakarta",
    avatar: "B",
    gradient: "linear-gradient(135deg,#034A94,#0563C1)",
  },
  {
    quote:
      'Keponakan saya kemarin jatuh dari sepeda lumayan parah. Semprot pakai ini malah anteng nggak nangis sama sekali. P3K wajib ada di rumah pokoknya!',
    name: "Agung Pratama",
    role: "Karyawan Swasta, Surabaya",
    avatar: "A",
    gradient: "linear-gradient(135deg,#F05A28,#FF7A45)",
  },
  {
    quote:
      'Suami saya punya luka dekubitus karena bed rest lama. N3 BAC ini benar-benar membantu menjaga kebersihan luka dan mencegah infeksi lebih parah. Dokternya pun merekomendasikan!',
    name: "Dewi Kusumawati",
    role: "Ibu Rumah Tangga, Yogyakarta",
    avatar: "D",
    gradient: "linear-gradient(135deg,#00B4D8,#48CAE4)",
  },
  {
    quote:
      'Sebagai tenaga medis, saya sangat terkesan dengan N3 BAC. Formula PHMB-nya aman bahkan untuk pasien dengan kulit sensitif. Tidak ada reaksi iritasi sama sekali dari seluruh pasien kami.',
    name: "dr. Rizal Fauzi",
    role: "Dokter Umum, Semarang",
    avatar: "R",
    gradient: "linear-gradient(135deg,#0563C1,#034A94)",
  },
  {
    quote:
      'Saya punya riwayat kulit sensitif, pakai antiseptik biasa langsung perih dan merah. Pakai N3 BAC ini beda banget, adem, nggak ada rasa terbakar. Akhirnya nemu yang pas!',
    name: "Nurul Hidayah",
    role: "Mahasiswi, Malang",
    avatar: "N",
    gradient: "linear-gradient(135deg,#FF7A45,#F05A28)",
  },
  {
    quote:
      'Usaha konveksi saya sering ada kejadian luka kecil-kecil akibat mesin jahit. Sekarang selalu sedia N3 BAC di kotak P3K. Luka cepat kering dan tidak pernah infeksi lagi.',
    name: "Hendra Wijaya",
    role: "Pengusaha Konveksi, Bandung",
    avatar: "H",
    gradient: "linear-gradient(135deg,#034A94,#00B4D8)",
  },
];

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const removeClones = () => {
      track.querySelectorAll('[aria-hidden="true"]').forEach((el) => el.remove());
    };

    const cloneCards = () => {
      removeClones();
      const originalCards = Array.from(track.children).filter(
        (el) => el.getAttribute("aria-hidden") !== "true"
      );
      originalCards.forEach((card) => {
        const cloned = card.cloneNode(true);
        if (cloned instanceof HTMLElement) {
          cloned.setAttribute("aria-hidden", "true");
        }
        track.appendChild(cloned);
      });
    };

    cloneCards();

    const pause = () => {
      track.style.animationPlayState = "paused";
    };
    const resume = () => {
      track.style.animationPlayState = "running";
    };

    const wrapper = document.getElementById("testiCarouselWrapper");
    if (wrapper) {
      wrapper.addEventListener("mouseenter", pause);
      wrapper.addEventListener("mouseleave", resume);
      wrapper.addEventListener("touchstart", pause, { passive: true });
      wrapper.addEventListener("touchend", resume, { passive: true });
      wrapper.addEventListener("touchcancel", resume, { passive: true });
    }

    return () => {
      removeClones();
      if (wrapper) {
        wrapper.removeEventListener("mouseenter", pause);
        wrapper.removeEventListener("mouseleave", resume);
        wrapper.removeEventListener("touchstart", pause);
        wrapper.removeEventListener("touchend", resume);
        wrapper.removeEventListener("touchcancel", resume);
      }
    };
  }, []);

  return (
    <section className="testimonials" id="testimoni">
      <div className="testi-section-header" data-aos="fade-up">
        <p className="section-tag">Testimoni</p>
        <h2 className="section-title">Apa Kata Konsumen Kami?</h2>
        <p className="section-sub">
          Kisah nyata dari keluarga, tenaga medis, dan homecare tentang
          pengalaman mereka menggunakan N3 BAC.
        </p>
      </div>
      <div className="testi-carousel-wrapper" id="testiCarouselWrapper">
        <div className="testi-track" id="testiTrack" ref={trackRef}>
          {TESTIMONIALS.map((t) => (
            <article className="testi-card" key={t.name}>
              <div className="testi-stars">
                <Star />
                <Star />
                <Star />
                <Star />
                <Star />
              </div>
              <p className="testi-quote">{t.quote}</p>
              <div className="testi-author">
                <div
                  className="testi-avatar"
                  style={{ background: t.gradient }}
                >
                  {t.avatar}
                </div>
                <div>
                  <h4>{t.name}</h4>
                  <span>{t.role}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}