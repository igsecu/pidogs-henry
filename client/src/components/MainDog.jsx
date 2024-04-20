import dogsImage from "../images/peakpx.jpg";
import { Link } from "react-router-dom";

const MainDog = () => {
  return (
    <div className="card border-0 mb-4 main-dog bg-dark">
      <img src={dogsImage} className="card-img h-100 w-100" alt="Dog" />
      <div className="card-img-overlay d-flex align-items-end">
        <div className="bg-dark bg-opacity-75 text-white d-sm-flex flex-column flex-sm-row justify-content-between w-100 p-3 align-items-center ">
          <h5 className="card-title fs-2 text-center text-md-start">
            Discover all dog breeds
          </h5>
          <Link
            to="/dogs"
            className="bg-danger text-decoration-none text-white rounded p-2 d-grid d-md-block text-center text-md-start custom-btn"
          >
            Enter
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainDog;
