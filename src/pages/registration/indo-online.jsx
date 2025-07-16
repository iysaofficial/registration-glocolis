"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function IndonesiaOnline() {
  const [selectedMaxNamaLengkap, setselectedMaxNamaLengkap] = useState("");
  const maxNameChars = 180; // batasan maksimal karakter
  const [selectedMaxProject, setselectedMaxProject] = useState("");
  const [selectedNamaSekolah, setselectedNamaSekolah] = useState("");
  const maxSchoolChars = 500; // batasan maksimal karakter
  const maxProjectChars = 160; // batasan maksimal karakter
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryPrice, setCategoryPrice] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [canClick, setCanClick] = useState(false);
  const navigate = useRouter();

  const handleInputNameChange = (e) => {
    const { value } = e.target;
    if (value.length <= maxNameChars) {
      setselectedMaxNamaLengkap(value);
    }
  };

  const handleInputNameSchoolChange = (e) => {
    const { value } = e.target;
    if (value.length <= maxSchoolChars) {
      setselectedNamaSekolah(value);
    }
  };

  const handleInputProjectChange = (e) => {
    const { value } = e.target;
    if (value.length <= maxProjectChars) {
      setselectedMaxProject(value);
    }
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategory(value);

    // Logika untuk menentukan harga berdasarkan kategori yang dipilih
    switch (value) {
      case "Global Competition for Life Sciences - Online Competition":
        setCategoryPrice("RP 950.000");
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const termsAccepted = sessionStorage.getItem("termsAccepted");
    if (!termsAccepted) {
      alert("You must agree to the Terms & Conditions first.");
      navigate("/registration/homeindo"); // Navigasi ke halaman HomeIndo
    }
  }, [navigate]);

  const scriptURL =
    "https://script.google.com/macros/s/AKfycbzV9JUE9ei98ywR-5J9_oEWr8ech_V4nAXr6Akzn4Z9YzKU76SvHIJ7a5iRQa3csoy0UQ/exec";

  useEffect(() => {
    const form = document.forms["regist-form"];

    if (form) {
      const handleSubmit = async (e) => {
        e.preventDefault();
        setShowModal(true);
        setCanClick(false);
        setCountdown(5); // Set ulang countdown saat modal muncul

        let count = 5;
        const interval = setInterval(() => {
          count -= 1;
          setCountdown(count);

          if (count <= 1) {
            clearInterval(interval); // Hentikan countdown di angka 1
            setCanClick(true);
          }
        }, 1000);
      };

      form.addEventListener("submit", handleSubmit);
      return () => {
        form.removeEventListener("submit", handleSubmit);
      };
    }
  }, []);

  const handleConfirmSubmit = async () => {
    setShowModal(false); // Tutup modal
    const form = document.forms["regist-form"];

    if (!form) return;

    setIsLoading(true);
    try {
      const response = await fetch(scriptURL, {
        method: "POST",
        body: new FormData(form),
      });

      if (response.ok) {
        setStatusMessage("Data berhasil dikirim!");

        // Ambil data sebelum reset
        const formData = {
          namaLengkap: selectedMaxNamaLengkap,
          projectTitle: selectedMaxProject,
          category: selectedCategory,
          namasekolah: selectedNamaSekolah,
        };

        form.reset();
        setTimeout(() => {
          navigate.push(
            `/registration/thankyouinter?namaLengkap=${encodeURIComponent(
              selectedMaxNamaLengkap
            )}
              &projectTitle=${encodeURIComponent(selectedMaxProject)}
              &category=${encodeURIComponent(selectedCategory)}
              &namasekolah=${encodeURIComponent(selectedNamaSekolah)}`
          );
        }, 1000);
      } else {
        setStatusMessage("An error occurred while sending data.");
      }
    } catch (error) {
      setStatusMessage("An error occurred while sending data.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="registration-section">
        <div className="container">
          <div className="content">
            <div className="sub">REGISTRATION FORM</div>
            <h1 className="garis-bawah"></h1>
            <br />
            <br />
            <h4>
              HELLO GLOCOLIS 2025 PARTICIPANTS, Please consider the following
              information before filling out the registration form :
            </h4>
            <br />
            <p>
              1.&nbsp; &nbsp; Please fill in the required data correctly and
              ensure there are no writing errors. Also make sure that the data
              submitted is final and has not changed.
            </p>
            <p>
              2.&nbsp; &nbsp;After making sure the data is correct, you can
              click <span className="fw-bold">&quot;SUBMIT FORM&quot;</span>{" "}
              button once. If the data has been successfully submitted, you will
              be moved to another page.
            </p>
            <p>
              3.&nbsp; &nbsp;There will be an information email that the
              registration has been received sent to the team leader&apos;s
              email address, and the file will be validated by our team. Please
              be patient and wait for a maximum of 3 days after the registration
              time, the Letter of Acceptance (LOA) will be sent to the team
              leader&apos;s email address.
            </p>
            <br />
            <br />

            {showModal && (
              <div className="modal-overlay-submit">
                <div className="modal-submit text-lg-center text-md-center">
                  <h2 className="text-center">⚠️WARNING!</h2>
                  <p>
                    Submitted data cannot be changed. The committee will use the
                    latest submitted data for certificate printing.
                    <br />
                    <b>MAKE SURE ALL DATA IS CORRECT!</b>
                    <br />
                    <b>DO NOT RE-REGISTER WITH THE SAME DATA MULTIPLE TIMES!</b>
                  </p>
                  <div className="modal-buttons-submit">
                    <button onClick={() => setShowModal(false)}>Back</button>
                    <button
                      onClick={handleConfirmSubmit}
                      disabled={!canClick || isLoading}
                    >
                      {isLoading
                        ? "Submitting..."
                        : canClick
                        ? "Continue"
                        : `Please wait... ${countdown}`}
                    </button>
                  </div>
                </div>
              </div>
            )}

            <form name="regist-form">
              <h1 className="text-sm md:text-lg lg:text-5xl">BIODATA</h1>
              <h1 className="garis-bawah"></h1>
              <div className="user-details">
                <div className="input-box">
                  <label className="form-label" value="Peserta Indonesia">
                    Categories Participants
                  </label>
                  <input
                    type="text"
                    id="CATEGORY_PARTICIPANT"
                    name="CATEGORY_PARTICIPANT"
                    className="form-control"
                    placeholder="Choose Categories Participant"
                    value="INDONESIA PARTICIPANTS"
                    readOnly
                  />
                </div>
                <div className="input-box">
                  <label for="CATEGORY_COMPETITION" className="form-label">
                    Caetegories Competition
                  </label>
                  <select
                    type="text"
                    id="CATEGORY_COMPETITION"
                    name="CATEGORY_COMPETITION"
                    className="form-control"
                    placeholder="Choose Category Competition "
                    onChange={handleCategoryChange}
                    required
                  >
                    <option value="">--Choose Category Competition--</option>
                    <option value="Global Competition for Life Sciences - Online Competition">
                      Online Competition
                    </option>
                  </select>
                </div>
              </div>

              <div className="user-details">
                <div className="input-box">
                  <label htmlFor="NAMA_LENGKAP" className="form-label">
                    Name of Leader & Member Team
                  </label>
                  <label>
                    <p>
                      Noted: Input the name of the team leader and team members
                      with the team leader&apos;s name at the beginning, with
                      the following format:
                    </p>
                    <p>Note: maximum 5 members + 1 team leader</p>
                    <h6>Kamal Putra</h6>
                    <h6>Ranu Ramadhan</h6>
                    <h6>Irsyad Zaidan</h6>
                  </label>
                  <textarea
                    type="text"
                    id="NAMA_LENGKAP"
                    name="NAMA_LENGKAP"
                    className="form-control"
                    placeholder="Input Name of Leader & Member team"
                    required
                    value={selectedMaxNamaLengkap}
                    onChange={handleInputNameChange}
                  ></textarea>
                  <p>
                    {selectedMaxNamaLengkap.length} / {maxNameChars} character
                  </p>
                </div>
                <div className="input-box">
                  <label for="LEADER_WHATSAPP" className="form-label">
                    Leader WhatsApp Number
                    <p>
                      Please write with phone code, example : (phone code) (your
                      number) +62 8177091xxxx
                    </p>
                    <p>
                      Notes: Please fill in the team leader number correctly, to
                      be included in the group.
                    </p>
                  </label>
                  <input
                    type="number"
                    id="LEADER_WHATSAPP"
                    name="LEADER_WHATSAPP"
                    className="form-control"
                    placeholder="Input Leader WhatsApp Number"
                    required
                  />
                </div>
                <div className="input-box">
                  <label for="LEADER_EMAIL" className="form-label">
                    Leader Email Address
                  </label>
                  <label>
                    <p>
                      Notes: Please fill in the email correctly, LOA submissions
                      will be sent via the team leader&apos;s email address
                      filled in.
                    </p>
                  </label>
                  <input
                    type="email"
                    id="LEADER_EMAIL"
                    name="LEADER_EMAIL"
                    className="form-control"
                    placeholder="Input Your Leader Email Address"
                    required
                  />
                </div>
                <div className="input-box">
                  <label for="NISN_NIM" className="form-label">
                    NISN / NIM Team Leader & Team Member
                  </label>
                  <label>
                    <p>
                      Notes: Enter the NISN / NIM in the order of the names of
                      the team leader and team members, in the following format:
                    </p>
                    <h6>231700</h6>
                    <h6>241700</h6>
                    <h6>251700</h6>
                  </label>
                  <textarea
                    type="text"
                    id="NISN_NIM"
                    name="NISN_NIM"
                    className="form-control"
                    placeholder="Input NISN / NIM Team Leader & Team Member"
                    required
                  ></textarea>
                </div>
              </div>

              {/* DATA SEKOLAH START */}
              {/* DATA SEKOLAH START */}
              <h1 className="text-sm md:text-lg lg:text-5xl">SCHOOL DATA</h1>
              <h1 className="garis-bawah"></h1>
              <div className="user-details">
                <div className="input-box">
                  <label htmlFor="NAMA_SEKOLAH" className="form-label">
                    Name of School/University
                  </label>
                  <label>
                    <p>
                      Noted: if all members are in the same institution, write
                      only 1 institution.
                    </p>
                    <p>
                      If the members are not in the same institution, enter the
                      name of the school with the format in the order of the
                      name of the team leader and team members from each school,
                      with the following format:
                    </p>
                    <h6>SMA CERIA</h6>
                    <h6>HAPPY HIGH SCHOOL</h6>
                    <h6>SMA TADIKA MESRA</h6>
                  </label>
                  <textarea
                    type="text"
                    id="NAMA_SEKOLAH"
                    name="NAMA_SEKOLAH"
                    className="form-control"
                    placeholder="Input School Name of Leader & Member Team"
                    required
                    value={selectedNamaSekolah}
                    onChange={handleInputNameSchoolChange}
                  ></textarea>
                  <p>
                    {selectedNamaSekolah.length} / {maxSchoolChars} character
                  </p>
                </div>
                <div className="input-box">
                  <label for="NPSN" className="form-label">
                    Nomor Pokok Sekolah Nasional (NPSN)
                  </label>
                  <label>
                    <p>
                      Notes: Enter the NPSN if you are still in school with the
                      following the order of the names of the team leader and
                      members, with the format as follows as follows :
                    </p>
                    <h6>1201301</h6>
                    <h6>1302402</h6>
                    <h6>1020100</h6>
                  </label>
                  <textarea
                    type="number"
                    id="NPSN"
                    name="NPSN"
                    className="form-control"
                    placeholder="Input Nomor Pokok Sekolah Nasional (NPSN)"
                  ></textarea>
                </div>
                <div className="input-box">
                  <label for="GRADE" className="form-label">
                    Grade
                  </label>
                  <select
                    type="text"
                    id="GRADE"
                    name="GRADE"
                    className="form-control"
                    placeholder="Choose Grade"
                    required
                  >
                    <option value="">--Choose Grade--</option>
                    <option value="Elementary">Elementary</option>
                    <option value="Secondary">Secondary</option>
                    <option value="University">University</option>=
                  </select>
                </div>
                <div className="input-box">
                  <label for="PROVINCE" className="form-label">
                    Province
                  </label>
                  <input
                    type="text"
                    id="PROVINCE"
                    name="PROVINCE"
                    className="form-control"
                    placeholder="Input your Province"
                    required
                  />
                </div>
              </div>
              {/* DATA SEKOLAH END */}
              {/* DATA SEKOLAH END */}

              {/* DATA PEMBIMBING START */}
              {/* DATA PEMBIMBING START */}
              <h1 className="text-sm md:text-lg lg:text-5xl">
                SUPERVISOR DATA
              </h1>
              <h1 className="garis-bawah"></h1>
              <div className="user-details">
                <div className="input-box">
                  <label for="NAME_SUPERVISOR" className="form-label">
                    Name of Teacher/Supervisor
                  </label>
                  <textarea
                    type="text"
                    id="NAME_SUPERVISOR"
                    name="NAME_SUPERVISOR"
                    className="form-control"
                    placeholder="Input Name of Teacher/Supervisor"
                    required
                  ></textarea>
                </div>
                <div className="input-box">
                  <label
                    for="WHATSAPP_NUMBER_SUPERVISOR"
                    className="form-label"
                  >
                    Teacher/Supervisor WhatsApp Number
                    <p>
                      Please write with phone code, example : (phone code) (your
                      number) +62 8177091xxxx
                    </p>
                  </label>
                  <input
                    type="number"
                    id="WHATSAPP_NUMBER_SUPERVISOR"
                    name="WHATSAPP_NUMBER_SUPERVISOR"
                    className="form-control"
                    placeholder="Input Teacher/Supervisor WhatsApp Number"
                    required
                  />
                </div>

                <div className="input-box">
                  <label for="EMAIL_TEACHER_SUPERVISOR" className="form-label">
                    Teacher/Supervisor Email Address
                  </label>
                  <input
                    type="email"
                    id="EMAIL_TEACHER_SUPERVISOR"
                    name="EMAIL_TEACHER_SUPERVISOR"
                    className="form-control"
                    placeholder="Input Teacher/Supervisor Email Address"
                    required
                  />
                </div>
              </div>
              {/* DATA PEMBIMBING END */}
              {/* DATA PEMBIMBING END */}

              {/* DETAIL PROJECT START */}
              {/* DETAIL PROJECT START */}
              <div className="">
                <h1 className="text-sm md:text-lg lg:text-5xl">
                  DETAIL PROJECT
                </h1>
                <h1 className="garis-bawah"></h1>
              </div>
              <div className="user-details">
                <div className="input-box">
                  <label for="PROJECT_TITLE" className="form-label">
                    Project Title
                    <p>
                      Notes: Please fill in the title data CORRECTLY, the data
                      entered cannot be changed!
                    </p>
                  </label>
                  <textarea
                    type="text"
                    id="PROJECT_TITLE"
                    name="PROJECT_TITLE"
                    className="form-control"
                    placeholder="Input Your Project Title"
                    required
                    value={selectedMaxProject}
                    onChange={handleInputProjectChange}
                  ></textarea>
                  <p>
                    {selectedMaxProject.length} / {maxProjectChars} character
                  </p>
                </div>

                {/* Dropdown Kategori */}
                <div className="input-box">
                  <label htmlFor="CATEGORIES" className="form-label">
                    Categories
                  </label>
                  <select
                    id="CATEGORIES"
                    name="CATEGORIES"
                    className="form-control"
                    required
                  >
                    <option value="">--Choose Categories--</option>
                    <option value="Bioinformatics">Bioinformatics</option>
                    <option value="Biomedicine">Biomedicine</option>
                    <option value="Food Technology">Food Technology</option>
                    <option value="Biotechnology">Biotechnology</option>
                    <option value="Food Science and Nutrition">
                      Food Science and Nutrition
                    </option>
                    <option value="Pharmacy">Pharmacy</option>
                    <option value="Health & Medicine">Health & Medicine</option>
                  </select>
                </div>

                <div className="input-box">
                  <label for="YES_NO" className="form-label">
                    Does the project title have ever participated in an
                    invention and innovation competition before?
                  </label>
                  <select
                    type="text"
                    id="YES_NO"
                    name="YES_NO"
                    className="form-control"
                    placeholder="--Choose Information Resources-- "
                    required
                  >
                    <option>--Choose--</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <div className="input-box">
                  <label
                    for="JUDUL_PERNAH_BERPATISIPASI"
                    className="form-label"
                  >
                    If the project title have ever participated in other
                    invention and innovation competition, please write down the
                    name of competition
                  </label>
                  <textarea
                    type="text"
                    id="JUDUL_PERNAH_BERPATISIPASI"
                    name="JUDUL_PERNAH_BERPATISIPASI"
                    className="form-control"
                    placeholder="Input Competition Name"
                  ></textarea>
                  <div className="mt-5" id="form_alerts"></div>
                </div>
                {/* Kolom Harga */}
                <div className="input-box invisible">
                  <label htmlFor="CATEGORY_PRICE" className="form-label ">
                    Registration Price
                  </label>
                  <input
                    type="text"
                    id="CATEGORY_PRICE"
                    name="CATEGORY_PRICE"
                    className="form-control"
                    value={categoryPrice}
                    readOnly
                    placeholder="Harga akan muncul berdasarkan kategori yang dipilih"
                  />
                </div>
              </div>
              {/* DETAIL PROJECT END */}
              {/* DETAIL PROJECT END */}

              {/* GENERAL INFORMATION START */}
              {/* GENERAL INFORMATION START */}
              <div className="">
                <h1 className="text-sm md:text-lg lg:text-5xl">
                  GENERAL INFORMATION
                </h1>
                <h1 className="garis-bawah"></h1>
              </div>
              <div className="user-details">
                <div className="input-box">
                  <label for="COMPLETE_ADDRESS" className="form-label">
                    Full Address
                  </label>
                  <label>
                    <p>
                      Please write down the complete address (Street Name, House
                      Number, RT&RW, District, Regency, City, Province, Postal
                      Code)
                    </p>
                  </label>
                  <textarea
                    type="text"
                    id="COMPLETE_ADDRESS"
                    name="COMPLETE_ADDRESS"
                    className="form-control"
                    placeholder="Input your Full Address"
                    required
                  ></textarea>
                </div>
                <div className="input-box">
                  <label for="INFORMATION_RESOURCES" className="form-label">
                    GLOCOLIS 2025 Competition Information Resources
                  </label>
                  <select
                    type="text"
                    id="INFORMATION_RESOURCES"
                    name="INFORMATION_RESOURCES"
                    className="form-control"
                    placeholder="--Choose Information Resources-- "
                    required
                  >
                    <option value="">
                      --Select the Source of Information--
                    </option>
                    <option value="GLOCOLIS Website">GLOCOLIS Website</option>
                    <option value="IYSA Instagram">IYSA Instagram</option>
                    <option value="GLOCOLIS Instagram">GLOCOLIS Instagram</option>
                    <option value="Supervisor/School">
                      Supervisor/School
                    </option>
                    <option value="IYSA Facebook">IYSA Facebook</option>
                    <option value="IYSA Linkedin">IYSA Linkedin</option>
                    <option value="IYSA Website">IYSA Website</option>
                    <option value="IYSA Email">IYSA Email</option>
                    <option value="GLOCOLIS Email">GLOCOLIS Email</option>
                    <option value="Previous Event">Previous Event</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
                <div className="input-box">
                  <label for="FILE" className="form-label">
                    If you received free registration from a previous event or
                    school visit activity, please attach documentary evidence.{" "}
                  </label>
                  <input
                    type="url"
                    id="FILE"
                    name="FILE"
                    className="form-control"
                    placeholder="Upload Link File Drive"
                  />
                </div>
              </div>
              {/* GENERAL INFORMATION END */}
              {/* GENERAL INFORMATION END */}


              <div className="button">
                <input type="submit" value="SUBMIT FORM" />
              </div>
            </form>

            {/* Loader dan Status Message */}
            {isLoading && (
              <div className="overlay-loader">
                <div className="loader"></div>
                <div>
                  {statusMessage && (
                    <p className="status-message">{statusMessage}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default IndonesiaOnline;
