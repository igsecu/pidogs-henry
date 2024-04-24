import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

const NotFoundPage = () => {
  return (
    <div className="section text-center mt-3">
      <div
        className="container h-100 d-flex flex-column align-items-center justify-content-center"
        style={{ minHeight: "700px" }}
      >
        <FaExclamationTriangle className="text-warning fs-1 mb-1" />
        <h1 style={{ fontSize: "48px" }}>404 Not Found</h1>
        <p className="fw-bold">This page does not exist!</p>
        <Link to="/" className="btn btn-dark">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
