import { indonesiaOnlineTerms, indonesiaOfflineTerms } from "@/lib/data/terms";
import { useState, useEffect } from "react";


function HomeIndo() {
  const [showModal, setShowModal] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [redirectLink, setRedirectLink] = useState("");
  const [termsContent, setTermsContent] = useState("");

  const handleOpenModal = (link, terms) => {
    setRedirectLink(link); // Set link tujuan redirect
    setTermsContent(terms); // Set isi terms sesuai pilihan
    setShowModal(true); // Tampilkan modal
  };

  const handleAccept = () => {
    if (termsAccepted) {
      sessionStorage.setItem("termsAccepted", "true"); // Menyimpan status setuju di sessionStorage
      setShowModal(false);
      window.location.href = redirectLink;
    } else {
      alert("Harap setujui Syarat & Ketentuan untuk melanjutkan.");
    }
  };
  
  useEffect(() => {
    const hasAcceptedTerms = sessionStorage.getItem("termsAccepted");
    if (hasAcceptedTerms === "true") {
      setTermsAccepted(true); // Set status sudah diterima
    }
  }, []);

  return (
    <>
      <section className="homeregist-section">
        <div>
          <div className="wrapper">
            <div className="text-center">
              <h1 className="mx-auto text-sm md:text-lg lg:text-5xl">
                FORMULIR REGISTRASI UNTUK PESERTA INDONESIA
              </h1>
              {/* <h3 className="mx-auto mt-5 mb-2 text-sm md:text-lg lg:text-2xl">
                Pilih Kategori Kompetisi untuk Registrasi GLOCOLIS 2025
              </h3> */}
            </div>
          </div>
          <div className="link-web mx-auto text-center">
            <a
              className="btn btn-regist text-center me-lg-5 "
              onClick={() => handleOpenModal("/registration/indo-online", indonesiaOnlineTerms)}
            >
              Kompetisi Online{" "}<i className="fa-solid fa-earth-americas"></i>
            </a>
            {/* <a
              className="btn btn-regist text-center me-lg-5 "
              onClick={() => handleOpenModal("/registration/indo-offline", indonesiaOfflineTerms)}
            >
              Kompetisi Offline{" "}<i className="fa-solid fa-earth-americas"></i>
            </a> */}
          </div>
        </div>
      </section>
      {/* Modal untuk Terms & Conditions */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="text-4xl">Syarat & Ketentuan</h2>
            <div>{termsContent}</div> {/* Isi dinamis */}
            <div className="checkbox mt-2">
              <input
                type="checkbox"
                id="terms"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
              />
              <label htmlFor="terms"> Saya menyetujui Syarat & Ketentuan di atas</label>
            </div>
            <div className="modal-actions">
              <button
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Kembali
              </button>
              <button className="btn btn-primary" onClick={handleAccept}>
                Terima & Proses
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default HomeIndo;
