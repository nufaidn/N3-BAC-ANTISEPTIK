type Cell = { text: string; kind: "yes" | "no" | "mid" };

const ROWS: { param: string; cells: [Cell, Cell, Cell] }[] = [
  {
    param: "Efektifitas",
    cells: [
      { text: "✓ Tinggi", kind: "yes" },
      { text: "✓ Sedang", kind: "mid" },
      { text: "✓ Sedang", kind: "mid" },
    ],
  },
  {
    param: "Rasa Perih",
    cells: [
      { text: "✗ Tidak", kind: "yes" },
      { text: "✓ Ya", kind: "no" },
      { text: "✓ Ya", kind: "no" },
    ],
  },
  {
    param: "Iritasi Kulit",
    cells: [
      { text: "✗ Rendah", kind: "yes" },
      { text: "✓ Tinggi", kind: "no" },
      { text: "✓ Tinggi", kind: "no" },
    ],
  },
  {
    param: "Stabilitas",
    cells: [
      { text: "✓ Tinggi", kind: "yes" },
      { text: "✗ Kurang", kind: "no" },
      { text: "✗ Mudah menguap", kind: "no" },
    ],
  },
  {
    param: "Penggunaan Jangka Panjang",
    cells: [
      { text: "✓ Ya", kind: "yes" },
      { text: "✗ Tidak", kind: "no" },
      { text: "✗ Tidak", kind: "no" },
    ],
  },
];

const HEADERS = ["Parameter", "N3 BAC", "Povidon Iodin", "Alkohol 70%"];

function Cell({ cell }: { cell: Cell }) {
  return <span className={cell.kind}>{cell.text}</span>;
}

export default function Comparison() {
  return (
    <section className="comparison" id="perbandingan">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <p className="section-tag">Analisis Produk</p>
          <h2 className="section-title">
            Lebih Unggul Dibanding<br />Produk Konvensional
          </h2>
          <p className="section-sub">
            Perbandingan langsung antara N3 BAC dengan antiseptik yang umum
            digunakan di pasaran.
          </p>
        </div>
        <div className="table-wrap" data-aos="fade-up">
          <table className="compare-table">
            <thead>
              <tr>
                {HEADERS.map((h, i) => (
                  <th className={i === 1 ? "col-highlight" : undefined} key={h}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.param}>
                  <td>{row.param}</td>
                  <td className="col-highlight">
                    <Cell cell={row.cells[0]} />
                  </td>
                  <td>
                    <Cell cell={row.cells[1]} />
                  </td>
                  <td>
                    <Cell cell={row.cells[2]} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}