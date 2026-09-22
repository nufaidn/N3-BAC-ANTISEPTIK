import { AlertTriangle, Clock, Pill, Skull } from "lucide-react";

const CHALLENGES = [
  {
    icon: Skull,
    title: "Risiko Infeksi Luka Kronis Tinggi",
    desc: "Luka yang tidak sembuh dalam waktu lama lebih mudah terinfeksi karena terbuka dan terpapar bakteri secara terus-menerus.",
  },
  {
    icon: AlertTriangle,
    title: "Banyak Antiseptik Bersifat Irritatif",
    desc: "Beberapa antiseptik dapat menyebabkan iritasi pada jaringan sehat, memperlambat penyembuhan dan menimbulkan rasa tidak nyaman.",
  },
  {
    icon: Clock,
    title: "Proses Penyembuhan Lambat",
    desc: "Faktor seperti sirkulasi darah yang buruk, infeksi, atau penyakit penyerta (misalnya diabetes) bisa membuat luka sulit sembuh.",
  },
  {
    icon: Pill,
    title: "Resistensi Mikroba",
    desc: "Penggunaan antibiotik atau antiseptik yang tidak tepat dapat menyebabkan mikroba menjadi kebal, sehingga pengobatan menjadi kurang efektif.",
  },
];

export default function Challenges() {
  return (
    <section className="challenges" id="tantangan">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <p className="section-tag">Masalah Umum</p>
          <h2 className="section-title">
            Tantangan Dalam<br />Perawatan Luka
          </h2>
          <p className="section-sub">
            Banyak antiseptik konvensional gagal menjaga kebersihan luka secara
            optimal — berikut masalah yang paling sering dihadapi saat perawatan.
          </p>
        </div>
        <div className="challenges-grid">
          {CHALLENGES.map((item, i) => (
            <article className="challenge-card" data-aos="fade-up" data-delay={String(i * 100)} key={item.title}>
              <div className="challenge-icon">
                <item.icon />
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}