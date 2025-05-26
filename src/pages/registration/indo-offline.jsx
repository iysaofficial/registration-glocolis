"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function IndonesiaOffline() {
  const [selectedMaxNamaLengkap, setselectedMaxNamaLengkap] = useState("");
  const maxNameChars = 180;
  const [selectedMaxProject, setselectedMaxProject] = useState("");
  const [selectedNamaSekolah, setselectedNamaSekolah] = useState("");
  const maxSchoolChars = 500;
  const maxProjectChars = 160;
  const [selectedCategory, setSelectedCategory] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [canClick, setCanClick] = useState(false);
  const router = useRouter();

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
    // Add price logic if needed
  };

  useEffect(() => {
    const termsAccepted = sessionStorage.getItem("termsAccepted");
    if (!termsAccepted) {
      alert("You must agree to the Terms & Conditions first.");
      router.push("/registration/homeindo");
    }
  }, [router]);

  const scriptURL =
    "https://script.google.com/macros/s/AKfycbwK3-0TDYMuekqqtYSwebx-qEcZchOoWP_JElopO9-k9b9G3YquOPHPe8AAfa94sjoZHg/exec";

  useEffect(() => {
    const form = document.forms["regist-form"];
    if (form) {
      const handleSubmit = async (e) => {
        e.preventDefault();
        setShowModal(true);
        setCanClick(false);
        setCountdown(5);

        let count = 5;
        const interval = setInterval(() => {
          count -= 1;
          setCountdown(count);
          if (count <= 1) {
            clearInterval(interval);
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
    setShowModal(false);
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

        const formData = {
          namaLengkap: selectedMaxNamaLengkap,
          projectTitle: selectedMaxProject,
          category: selectedCategory,
          namasekolah: selectedNamaSekolah,
        };

        form.reset();
        setTimeout(() => {
          router.push(
            `/registration/thankyouinter?namaLengkap=${encodeURIComponent(
              selectedMaxNamaLengkap
            )}&projectTitle=${encodeURIComponent(
              selectedMaxProject
            )}&category=${encodeURIComponent(
              selectedCategory
            )}&namasekolah=${encodeURIComponent(selectedNamaSekolah)}`
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
            <h4 className="text-xl">
              HELLO GLOCOLIS 2025 PARTICIPANTS, Please pay attention to the
              following information before filling out the registration form:
            </h4>
            <br />
            <p>
              1. Please fill in the required data correctly and make sure there
              are no typos. Also ensure that the submitted data is final and
              will not be changed.
            </p>
            <p>
              2. After making sure the data is correct, you can click the{" "}
              <span className="fw-bold">"SUBMIT FORM"</span> button only once.
              If the data is successfully sent, you will be redirected to
              another page.
            </p>
            <p>
              3. There will be an email notification that your registration has
              been received, sent to the team leader's email address, and the
              documents will be validated by our team. Please be patient and
              wait up to 3 days after registration, the Letter of Acceptance
              (LOA) will be sent to the team leader's email address.
            </p>
            <br />
            {showModal && (
              <div className="modal-overlay-submit">
                <div className="modal-submit text-lg-center text-md-center">
                  <h2 className="text-center">⚠️ATTENTION!</h2>
                  <p>
                    The submitted data cannot be changed. The committee will use
                    the last data received for certificate printing.
                    <br />
                    <b>MAKE SURE ALL DATA IS CORRECT!</b>
                    <br />
                    <b>
                      DO NOT REGISTER AGAIN WITH THE SAME DATA MULTIPLE TIMES!
                    </b>
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
                  <label className="form-label" value="Indonesian Participant">
                    Participant Category
                  </label>
                  <input
                    type="text"
                    id="CATEGORY_PARTICIPANT"
                    name="CATEGORY_PARTICIPANT"
                    className="form-control"
                    placeholder="Choose Participant Category"
                    value="INDONESIAN PARTICIPANT"
                    readOnly
                  />
                </div>
                <div className="input-box">
                  <label htmlFor="CATEGORY_COMPETITION" className="form-label">
                    Competition Category
                  </label>
                  <select
                    type="text"
                    id="CATEGORY_COMPETITION"
                    name="CATEGORY_COMPETITION"
                    className="form-control"
                    placeholder="Choose Competition Category"
                    onChange={handleCategoryChange}
                    required
                  >
                    <option value="">--Select Competition Category--</option>
                    <option value="Global Competition for Life Sciences - Offline Competition">
                      Offline Competition
                    </option>
                    <option value="Global Competition for Life Sciences - Offline Competition + Excursion">
                      Offline Competition + Excursion
                    </option>
                  </select>
                </div>
              </div>

              <div className="user-details">
                <div className="input-box">
                  <label htmlFor="NAMA_LENGKAP" className="form-label">
                    Team Leader & Members Name
                  </label>
                  <label>
                    <p>
                      Enter the team leader and members' names, starting with
                      the team leader, in the following format:
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
                    placeholder="Enter Team Leader & Members Name"
                    required
                    value={selectedMaxNamaLengkap}
                    onChange={handleInputNameChange}
                  ></textarea>
                  <p>
                    {selectedMaxNamaLengkap.length} / {maxNameChars} character
                  </p>
                </div>
                <div className="input-box">
                  <label htmlFor="LEADER_WHATSAPP" className="form-label">
                    Team Leader WhatsApp Number
                  </label>
                  <label>
                    <p>
                      Please write with country code, example: (country code)
                      (phone number) +62 81770914xxxx
                    </p>
                    <p>
                      Notes: Please enter the correct team leader's number, to
                      be added to the group
                    </p>
                  </label>
                  <input
                    type="number"
                    id="LEADER_WHATSAPP"
                    name="LEADER_WHATSAPP"
                    className="form-control"
                    placeholder="Enter Team Leader WhatsApp Number"
                    required
                  />
                </div>
                <div className="input-box">
                  <label htmlFor="LEADER_EMAIL" className="form-label">
                    Team Leader Email Address
                  </label>
                  <label>
                    <p>
                      Notes: Please enter the correct email, the LOA will be
                      sent to the team leader's email address provided.
                    </p>
                  </label>
                  <input
                    type="email"
                    id="LEADER_EMAIL"
                    name="LEADER_EMAIL"
                    className="form-control"
                    placeholder="Enter Team Leader Email Address"
                    required
                  />
                </div>
                <div className="input-box">
                  <label htmlFor="NISN_NIM" className="form-label">
                    NISN / NIM of Team Leader & Members
                  </label>
                  <label>
                    <p>
                      Notes: Enter NISN / NIM in the same order as the team
                      leader and members' names, in the following format:
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
                    placeholder="Enter NISN / NIM of Team Leader & Members"
                    required
                  ></textarea>
                </div>
              </div>

              {/* SCHOOL DATA START */}
              <h1 className="text-sm md:text-lg lg:text-5xl">SCHOOL DATA</h1>
              <h1 className="garis-bawah"></h1>
              <div className="user-details">
                <div className="input-box">
                  <label htmlFor="NAMA_SEKOLAH" className="form-label">
                    School/University Name
                  </label>
                  <label>
                    <p>
                      Notes: Enter the school name in the same order as the team
                      leader and members' names, in the following format:
                    </p>
                    <h6>SMA CERIA</h6>
                    <h6>SMA BAHAGIA</h6>
                    <h6>SMA TADIKA MESRA</h6>
                  </label>
                  <textarea
                    type="text"
                    id="NAMA_SEKOLAH"
                    name="NAMA_SEKOLAH"
                    className="form-control"
                    placeholder="Enter Your School/University Name"
                    required
                    value={selectedNamaSekolah}
                    onChange={handleInputNameSchoolChange}
                  ></textarea>
                  <p>
                    {selectedNamaSekolah.length} / {maxSchoolChars} character
                  </p>
                </div>
                <div className="input-box">
                  <label htmlFor="NPSN" className="form-label">
                    Nomor Pokok Sekolah Nasional (NPSN)
                  </label>
                  <label>
                    <p>
                      Notes: Enter NPSN if still in school, in the same order as
                      the team leader and members' names, in the following
                      format:
                    </p>
                    <h6>1201301</h6>
                    <h6>1302402</h6>
                    <h6>1020100</h6>
                  </label>
                  <textarea
                    id="NPSN"
                    name="NPSN"
                    className="form-control"
                    placeholder="Input Nomor Pokok Sekolah Nasional (NPSN)"
                  ></textarea>
                </div>
                <div className="input-box">
                  <label htmlFor="GRADE" className="form-label">
                    Grade
                  </label>
                  <select
                    id="GRADE"
                    name="GRADE"
                    className="form-control"
                    placeholder="Choose Grade"
                    required
                  >
                    <option value="">--Choose Grade--</option>
                    <option value="Elementary">Elementary</option>
                    <option value="Secondary">Secondary</option>
                    <option value="University">University</option>
                  </select>
                </div>
                <div className="input-box">
                  <label htmlFor="PROVINCE" className="form-label">
                    Province
                  </label>
                  <input
                    type="text"
                    id="PROVINCE"
                    name="PROVINCE"
                    className="form-control"
                    placeholder="Enter Your Province"
                    required
                  />
                </div>
              </div>
              {/* SCHOOL DATA END */}

              {/* SUPERVISOR DATA START */}
              <h1 className="text-sm md:text-lg lg:text-5xl">
                SUPERVISOR DATA
              </h1>
              <h1 className="garis-bawah"></h1>
              <div className="user-details">
                <div className="input-box">
                  <label htmlFor="NAME_SUPERVISOR" className="form-label">
                    Supervisor/Teacher Name
                  </label>
                  <textarea
                    id="NAME_SUPERVISOR"
                    name="NAME_SUPERVISOR"
                    className="form-control"
                    placeholder="Enter Supervisor/Teacher Name"
                    required
                  ></textarea>
                </div>
                <div className="input-box">
                  <label
                    htmlFor="WHATSAPP_NUMBER_SUPERVISOR"
                    className="form-label"
                  >
                    Supervisor/Teacher WhatsApp Number
                  </label>
                  <label>
                    <p>
                      Please write with country code, example: (country code)
                      (phone number) +62 81770914xxx
                    </p>
                  </label>
                  <input
                    type="number"
                    id="WHATSAPP_NUMBER_SUPERVISOR"
                    name="WHATSAPP_NUMBER_SUPERVISOR"
                    className="form-control"
                    placeholder="Enter Supervisor/Teacher WhatsApp Number"
                    required
                  />
                </div>
                <div className="input-box">
                  <label
                    htmlFor="EMAIL_TEACHER_SUPERVISOR"
                    className="form-label"
                  >
                    Supervisor/Teacher Email Address
                  </label>
                  <input
                    type="email"
                    id="EMAIL_TEACHER_SUPERVISOR"
                    name="EMAIL_TEACHER_SUPERVISOR"
                    className="form-control"
                    placeholder="Enter Supervisor/Teacher Email Address"
                    required
                  />
                </div>
              </div>
              {/* SUPERVISOR DATA END */}

              {/* PROJECT DETAILS START */}
              <div className="">
                <h1 className="text-sm md:text-lg lg:text-5xl">
                  PROJECT DETAILS
                </h1>
                <h1 className="garis-bawah"></h1>
              </div>
              <div className="user-details">
                <div className="input-box">
                  <label htmlFor="PROJECT_TITLE" className="form-label">
                    Project Title
                  </label>
                  <label>
                    <p>
                      Notes: Please fill in the project title CORRECTLY, the
                      submitted data cannot be changed!
                    </p>
                  </label>
                  <textarea
                    id="PROJECT_TITLE"
                    name="PROJECT_TITLE"
                    className="form-control"
                    placeholder="Enter Your Project Title"
                    required
                    value={selectedMaxProject}
                    onChange={handleInputProjectChange}
                  ></textarea>
                  <p>
                    {selectedMaxProject.length} / {maxProjectChars} character
                  </p>
                </div>
                {/* Category Dropdown */}
                <div className="input-box">
                  <label htmlFor="CATEGORIES" className="form-label">
                    Category
                  </label>
                  <select
                    id="CATEGORIES"
                    name="CATEGORIES"
                    className="form-control"
                    placeholder="--Choose-- "
                    required
                  >
                    <option value="">--Select Category--</option>
                    <option value="Bioinformatics">Bioinformatics</option>
                    <option value="Biomedicine">Biomedicine</option>
                    <option value="Food Technology">Food Technology</option>
                    <option value="Biotechnology">Biotechnology</option>
                    <option value="Food Science and Nutrition">
                      Food Science and Nutrition
                    </option>
                    <option value="Pharmacy">Pharmacy</option>
                  </select>
                </div>
                <div className="input-box">
                  <label htmlFor="YES_NO" className="form-label">
                    Has the project title ever participated in previous
                    invention and innovation competitions?
                  </label>
                  <select
                    id="YES_NO"
                    name="YES_NO"
                    className="form-control"
                    placeholder="--Choose Information Resources-- "
                    required
                  >
                    <option>--Select--</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <div className="input-box">
                  <label
                    htmlFor="JUDUL_PERNAH_BERPATISIPASI"
                    className="form-label"
                  >
                    If the project title has participated in other invention and
                    innovation competitions, please write the competition name
                  </label>
                  <textarea
                    id="JUDUL_PERNAH_BERPATISIPASI"
                    name="JUDUL_PERNAH_BERPATISIPASI"
                    className="form-control"
                    placeholder="Enter Competition Name"
                  ></textarea>
                  <div className="mt-5" id="form_alerts"></div>
                </div>
              </div>
              {/* PROJECT DETAILS END */}

              {/* GENERAL INFORMATION START */}
              <div className="">
                <h1 className="text-sm md:text-lg lg:text-5xl">
                  GENERAL INFORMATION
                </h1>
                <h1 className="garis-bawah"></h1>
              </div>
              <div className="user-details">
                <div className="input-box">
                  <label htmlFor="COMPLETE_ADDRESS" className="form-label">
                    Complete Address
                  </label>
                  <label>
                    <p>
                      Please write your complete address (Street Name, House
                      Number, RT&RW, District, Regency, City, Province, Postal
                      Code)
                    </p>
                  </label>
                  <textarea
                    id="COMPLETE_ADDRESS"
                    name="COMPLETE_ADDRESS"
                    className="form-control"
                    placeholder="Enter Your Complete Address"
                    required
                  ></textarea>
                </div>
                <div className="input-box">
                  <label htmlFor="INFORMATION_RESOURCES" className="form-label">
                    Information Source for GLOCOLIS 2025 Competition
                  </label>
                  <select
                    id="INFORMATION_RESOURCES"
                    name="INFORMATION_RESOURCES"
                    className="form-control"
                    placeholder="--Choose Information Resources-- "
                    required
                  >
                    <option value="">--Select Information Source--</option>
                    <option value="GLOCOLIS Website">GLOCOLIS Website</option>
                    <option value="IYSA Website">IYSA Website</option>
                    <option value="IYSA Instagram">IYSA Instagram</option>
                    <option value="GLOCOLIS Instagram">
                      GLOCOLIS Instagram
                    </option>
                    <option value="Supervisor/School">Supervisor/School</option>
                    <option value="IYSA Facebook">IYSA Facebook</option>
                    <option value="IYSA Linkedin">IYSA Linkedin</option>
                    <option value="IYSA Email">IYSA Email</option>
                    <option value="GLOCOLIS Email">GLOCOLIS Email</option>
                    <option value="Previous Event">Previous Event</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
                <div className="input-box">
                  <label htmlFor="FILE" className="form-label">
                    If you received free registration from a previous event or
                    previous school visit activity, please attach supporting
                    documentation
                  </label>
                  <input
                    type="url"
                    id="FILE"
                    name="FILE"
                    className="form-control"
                    placeholder="Upload Drive File Link"
                  />
                </div>
              </div>
              {/* GENERAL INFORMATION END */}

              <div className="button">
                <input type="submit" value="SUBMIT FORM" />
              </div>
            </form>
            {/* Loader and Status Message */}
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

export default IndonesiaOffline;
