import { FaExclamation } from "react-icons/fa";

const NoFound = ({ text }) => {
  return (
    <div className="text-center">
      <FaExclamation className="text-danger fs-1 mb-1" />
      <h1 style={{ fontSize: "48px" }}>Not Found</h1>
      <p className="fw-bold">{text}</p>
    </div>
  );
};

export default NoFound;
