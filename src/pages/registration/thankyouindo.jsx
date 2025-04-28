"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function ThankYouIndo() {
  const searchParams = useSearchParams();

  const namaLengkap = searchParams.get("namaLengkap") || "Tidak ada data";
  const projectTitle = searchParams.get("projectTitle") || "Tidak ada data";
  const category = searchParams.get("category") || "Tidak ada data";
  const namasekolah = searchParams.get("namasekolah") || "Tidak ada data";

  return (
    <section className="thankyou">
      <div>
        <h1>Terima Kasih telah mendaftar!</h1>
        <p>Kami menghargai partisipasi Anda dan menantikan keterlibatan Anda.</p>

        <table className="thankyou-table">
          <tbody>
            <tr>
              <td><strong>Anggota Tim</strong></td>
              <td>{namaLengkap}</td>
            </tr>
            <tr>
              <td><strong>Nama Sekolah</strong></td>
              <td>{namasekolah}</td>
            </tr>
            <tr>
              <td><strong>Judul Proyek</strong></td>
              <td>{projectTitle}</td>
            </tr>
            <tr>
              <td><strong>Kategori Kompetisi</strong></td>
              <td>{category}</td>
            </tr>
          </tbody>
        </table>

        <p>
          <strong>*Jika data muncul, tangkap layar halaman ini sebagai bukti pendaftaran berhasil</strong>
        </p>
        <Link href="/" legacyBehavior>
        <a className="btn btn-action">
          Kembali ke menu pendaftaran
        </a>
        </Link>
      </div>
    </section>
  );
}

export default ThankYouIndo;