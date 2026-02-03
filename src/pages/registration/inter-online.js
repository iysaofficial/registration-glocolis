"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function InternationalOnline() {
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
  const router = useRouter();
  const [phoneCodes, setPhoneCodes] = useState([]);
  const [phoneCodesLoading, setPhoneCodesLoading] = useState(true);

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
      case "International Youth Business Competition - Online Competition":
        setCategoryPrice("$105 USD");
        break;
      case "International Youth Business Competition - Online Competition + Certificate and Medal (SOUTH EAST ASIA ONLY)":
        setCategoryPrice("$225 USD");
        break;
      case "International Youth Business Competition - Online Competition + Certificate and Medal (Exclude SOUTH EAST ASIA)":
        setCategoryPrice("$275 USD");
        break;
      default:
        setCategoryPrice("");
        break;
    }
  };

  useEffect(() => { 
    const termsAccepted = sessionStorage.getItem("termsAccepted");

    if (!termsAccepted) {
      alert("You must agree to the Terms & Conditions first.");
      router("/registration/homeinter"); // Navigasi ke halaman HomeIndo
    }
  }, [router]);

  const scriptURL = "https://script.google.com/macros/s/AKfycby45Ey3uMVGxT7j4iEvbLNZ1vY4c9FIDMwuyzwL6r4P3MSaddh1rpMvP2Vg3fgu7U3bQw/exec";

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,idd")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const codes = data
            .filter(
              (country) =>
                country.idd && country.idd.root && country.idd.suffixes
            )
            .map((country) => ({
              name: country.name.common,
              code:
                country.idd.root +
                (country.idd.suffixes ? country.idd.suffixes[0] : ""),
            }))
            .sort((a, b) => a.name.localeCompare(b.name));
          setPhoneCodes(codes);
        } else {
          console.error("API response is not an array:", data);
        }
        setPhoneCodesLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching phone codes:", error);
        setPhoneCodesLoading(false);
      });
  }, []);

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
        setStatusMessage("Data sent successfully!");

        // Ambil data sebelum reset
        const formData = {
          namaLengkap: selectedMaxNamaLengkap,
          projectTitle: selectedMaxProject,
          category: selectedCategory,
          categoryPrice: categoryPrice,
          namasekolah: selectedNamaSekolah,
        };

        form.reset();
        setTimeout(() => {
          router.push(
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
        <div class="container">
          <div class="content">
            <div class="sub">FORM REGISTRATION</div>
            <h1 class="garis-bawah"></h1>
            <br />
            <br />
            <h4>
              HELLO GLOCOLIS 2026 PARTICIPANTS, Please consider the following
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
            <br></br>
            <br></br>

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
              <div class="user-details">
                <div class="input-box">
                  <label for="CATEGORY_PARTICIPANT" class="form-label">
                    Categories Participant
                  </label>
                  <select
                    type="text"
                    id="CATEGORY_PARTICIPANT"
                    name="CATEGORY_PARTICIPANT"
                    class="form-control"
                    placeholder="Choose Categories Participant"
                    value=""
                    required
                  >
                    <option value="International Participant">
                      International Participant
                    </option>
                  </select>
                </div>
                <div class="input-box">
                  <label for="CATEGORY_COMPETITION" class="form-label">
                    Category Competition
                  </label>
                  <select
                    type="text"
                    id="CATEGORY_COMPETITION"
                    name="CATEGORY_COMPETITION"
                    class="form-control"
                    placeholder="Choose Category Competition "
                    required
                    onChange={handleCategoryChange}
                  >
                    <option value="">--Choose Category Competition--</option>
                    <option value="International Youth Business Competition - Online Competition">
                      Online Competition
                    </option>
                    <option value="International Youth Business Competition - Online Competition + Certificate and Medal (SOUTH EAST ASIA ONLY)">
                      Online Competition + Certificate and Medal (SOUTH EAST
                      ASIA)
                    </option>
                    <option value="International Youth Business Competition - Online Competition + Certificate and Medal (Exclude SOUTH EAST ASIA)">
                      Online Competition + Certificate and Medal (Exclude SOUTH
                      EAST ASIA)
                    </option>
                  </select>
                </div>
              </div>

              <div class="user-details">
                <div class="input-box">
                  <label for="NAMA_LENGKAP" class="form-label">
                    Name of Leader & Member Team
                  </label>
                  <label>
                    <p>
                      Noted: Input the name of the team leader and team members
                      with the team leader&apos;s name at the beginning, with
                      the following format:
                    </p>
                    <p>Note: maximum 5 members + 1 team leader</p>
                    <h6>Kamal Putra Simatupang</h6>
                    <h6>Nur Alif Rajaloa Hidayat</h6>
                    <h6>Irsyad Zaidan</h6>
                  </label>
                  <textarea
                    type="text"
                    id="NAMA_LENGKAP"
                    name="NAMA_LENGKAP"
                    class="form-control"
                    placeholder="Input Name of Leader & Member Team"
                    required
                    value={selectedMaxNamaLengkap}
                    onChange={handleInputNameChange}
                  ></textarea>
                  <p>
                    {selectedMaxNamaLengkap.length} / {maxNameChars} character
                  </p>
                </div>
                <div class="input-box">
                  <label for="LEADER_WHATSAPP" class="form-label">
                    Leader WhatsApp Number
                    <p>
                      Please write with phone code, example : (phone code) (your
                      number) +62 8177091xxxx
                    </p>
                  </label>
                  <input
                    type="number"
                    id="LEADER_WHATSAPP"
                    name="LEADER_WHATSAPP"
                    class="form-control"
                    placeholder="Input Leader WhatsApp Number"
                    required
                  />
                </div>
                <div class="input-box">
                  <label for="PHONE_CODE" class="form-label">
                    Phone Code
                  </label>
                  <select
                    type="text"
                    id="PHONE_CODE"
                    name="PHONE_CODE"
                    class="form-control"
                    placeholder="Choose Phone Code "
                    required
                  >
                    <option value="">--Choose Phone Code--</option>
                    {phoneCodesLoading ? (
                      <option value="" disabled>Loading...</option>
                    ) : (
                      phoneCodes.map((country) => (
                        <option key={country.name} value={`${country.name} ${country.code}`}>
                          {country.name} {country.code}
                        </option>
                      ))
                    )}
                  </select>
                </div>
                <div class="input-box">
                  <label for="LEADER_EMAIL" class="form-label">
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
                    class="form-control"
                    placeholder="Input Your Leader Email Address"
                    required
                  />
                </div>
              </div>

              {/* DATA SEKOLAH START */}
              {/* DATA SEKOLAH START */}
              <h1 className="text-sm md:text-lg lg:text-5xl">SCHOOL DATA</h1>
              <h1 className="garis-bawah"></h1>
              <div class="user-details">
                <div class="input-box">
                  <label for="NAMA_SEKOLAH" class="form-label">
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
                    class="form-control"
                    placeholder="Input School Name of Leader & Member Team"
                    required
                    value={selectedNamaSekolah}
                    onChange={handleInputNameSchoolChange}
                  ></textarea>
                  <p>
                    {selectedNamaSekolah.length} / {maxSchoolChars} character
                  </p>
                </div>
              </div>
              <div className="user-details">
                <div class="input-box">
                  <label for="GRADE" class="form-label">
                    Grade{" "}
                  </label>
                  <select
                    type="text"
                    id="GRADE"
                    name="GRADE"
                    class="form-control"
                    placeholder="Choose Grade"
                    required
                  >
                    <option value="">--Choose Your Grade--</option>
                    <option value="Elementary">Elementary</option>
                    <option value="Secondary">
                      Secondary
                    </option>
                    <option value="University">University</option>
                    <option value="Public">Public</option>
                  </select>
                </div>
                <div class="input-box">
                  <label for="COUNTRY" class="form-label">
                    Country
                  </label>
                  <input
                    type="text"
                    id="COUNTRY"
                    name="COUNTRY"
                    class="form-control"
                    placeholder="Your Country "
                    required
                  />
                </div>
              </div>

              {/* DATA PEMBIMBING START */}
              {/* DATA PEMBIMBING START */}
              <h1 className="text-sm md:text-lg lg:text-5xl">
                SUPERVISOR DATA
              </h1>
              <h1 className="garis-bawah"></h1>
              <div className="user-details">
                <div class="input-box">
                  <label for="NAME_SUPERVISOR" class="form-label">
                    Name of Teacher/Supervisor
                  </label>
                  <textarea
                    type="text"
                    id="NAME_SUPERVISOR"
                    name="NAME_SUPERVISOR"
                    class="form-control"
                    placeholder="Input Name of Teacher/Supervisor"
                    required
                  ></textarea>
                </div>
                <div class="input-box">
                  <label for="WHATSAPP_NUMBER_SUPERVISOR" class="form-label">
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
                    class="form-control"
                    placeholder="Input Teacher/Supervisor WhatsApp Number"
                    required
                  />
                </div>
                <div class="input-box">
                  <label for="EMAIL_TEACHER_SUPERVISOR" class="form-label">
                    Teacher/Supervisor Email Address
                  </label>
                  <input
                    type="email"
                    id="EMAIL_TEACHER_SUPERVISOR"
                    name="EMAIL_TEACHER_SUPERVISOR"
                    class="form-control"
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
                <div class="input-box">
                  <label for="PROJECT_TITLE" class="form-label">
                    Project Title
                  </label>
                  <textarea
                    type="text"
                    id="PROJECT_TITLE"
                    name="PROJECT_TITLE"
                    class="form-control"
                    placeholder="Input Your Project Title"
                    required
                    value={selectedMaxProject}
                    onChange={handleInputProjectChange}
                  ></textarea>
                  <p>
                    {selectedMaxProject.length} / {maxProjectChars} karakter
                  </p>
                </div>
                <div className="input-box">
                  <label for="CATEGORIES" className="form-label">
                    Categories
                  </label>
                  <select
                    id="CATEGORIES"
                    name="CATEGORIES"
                    className="form-control"
                    required
                  >
                    <option value="">--Choose Category--</option>
                    <option value="Bioinformatics">Bioinformatics</option>
                    <option value="Biomedicine">Biomedicine</option>
                    <option value="Food Technology">Food Technology</option>
                    <option value="Biotechnology">Biotechnology</option>
                    <option value="Food Science and Nutrition">Food Science and Nutrition</option>
                    <option value="Pharmacy">Pharmacy</option>
                    <option value="Health & Medicine">Health & Medicine</option>
                  </select>
                </div>
                <div class="input-box ">
                  <label for="YES_NO" class="form-label">
                    Does the project title have ever participated in an
                    invention and innovation competition before?
                  </label>
                  <select
                    type="text"
                    id="YES_NO"
                    name="YES_NO"
                    class="form-control"
                    placeholder="--Choose-- "
                    required
                  >
                    <option>--Choose--</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <div class="input-box">
                  <label for="JUDUL_PERNAH_BERPATISIPASI" class="form-label">
                    If the project title have ever participated in other
                    invention and innovation competition, please write down the
                    name of competition
                  </label>
                  <textarea
                    type="text"
                    id="JUDUL_PERNAH_BERPATISIPASI"
                    name="JUDUL_PERNAH_BERPATISIPASI"
                    class="form-control"
                    placeholder="Input Competition Name"
                  ></textarea>
                  <div class="mt-5" id="form_alerts"></div>
                </div>

                {/* Kolom Harga */}
                <div className="input-box invisible">
                  <label htmlFor="CATEGORY_PRICE" className="form-label ">
                    Harga Pendaftaran
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

              {/* GENERAL INFORMATION START */}
              {/* GENERAL INFORMATION START */}
              <div className="">
                <h1 className="text-sm md:text-lg lg:text-5xl">
                  GENERAL INFORMATION
                </h1>
                <h1 className="garis-bawah"></h1>
              </div>
              <div className="user-details">
                <div class="input-box">
                  <label for="SOSMED" class="form-label">
                    If you don&apos;t have whatsapp number, please write down
                    your social media account. (Ex: Instagram/FB/Telegram/Line)
                  </label>
                  <label>
                    <p>
                      Copy your URL link(Ex:
                      https://www.instagram.com/iicyms_official/) or write your
                      username (Ex: iysa_official)
                    </p>
                  </label>
                  <input
                    type="text"
                    id="SOSMED"
                    name="SOSMED"
                    class="form-control"
                    placeholder="Input Your Social Media Account "
                    required
                  />
                </div>

                <div class="input-box">
                  <label for="INFORMATION_RESOURCES" class="form-label">
                    GLOCOLIS 2026 Competition Information Resources
                  </label>
                  <select
                    type="text"
                    id="INFORMATION_RESOURCES"
                    name="INFORMATION_RESOURCES"
                    class="form-control"
                    placeholder="--Choose Information Resources-- "
                    required
                  >
                    <option value="">
                      --Select the Source of Information--
                    </option>
                    <option value="IYSA Website">IYSA Website</option>
                    <option value="GLOCOLIS Website">GLOCOLIS Website</option>
                    <option value="IYSA Instagram">IYSA Instagram</option>
                    <option value="GLOCOLIS Instagram">GLOCOLIS Instagram</option>
                    <option value="Supervisor/School">Supervisor/School</option>
                    <option value="IYSA FaceBook">IYSA FaceBook</option>
                    <option value="IYSA Linkedin">IYSA Linkedin</option>
                    <option value="IYSA Email">IYSA Email</option>
                    <option value="GLOCOLIS Email">GLOCOLIS Email</option>
                    <option value="Previous Event">Previous Event</option>
                    <option value="Others">Lainnya</option>
                  </select>
                </div>
              </div>
              <div class="button">
                <input type="submit" value="submit" />
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
