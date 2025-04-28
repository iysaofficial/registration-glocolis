"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function Thankyouinter() {
  const searchParams = useSearchParams();

  const fullName = searchParams.get("namaLengkap") || "No data available";
  const projectTitle = searchParams.get("projectTitle") || "No data available";
  const category = searchParams.get("category") || "No data available";
  const schoolName = searchParams.get("namasekolah") || "No data available";

  return (
    <section className="thankyou">
      <div>
        <h1>Thank You for Registering!</h1>
        <p>
          We appreciate your participation and look forward to your engagement.
        </p>

        <table className="thankyou-table">
          <tbody>
            <tr>
              <td>
                <strong>Team Member</strong>
              </td>
              <td>{fullName}</td>
            </tr>
            <tr>
              <td>
                <strong>School Name</strong>
              </td>
              <td>{schoolName}</td>
            </tr>
            <tr>
              <td>
                <strong>Project Title</strong>
              </td>
              <td>{projectTitle}</td>
            </tr>
            <tr>
              <td>
                <strong>Competition Category</strong>
              </td>
              <td>{category}</td>
            </tr>
          </tbody>
        </table>

        <p>
          <strong>
            *If the data appears, take a screenshot of this page as proof of
            successful registration
          </strong>
        </p>
        <Link href="/"legacyBehavior>
          <a className="btn btn-action">
            Back to Registration Menu
          </a>
        </Link>
      </div>
    </section>
  );
}

export default Thankyouinter;