import { FaDog } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-md bg-dark navbar-dark py-3">
      <div className="container">
        <a
          href="/"
          className="navbar-brand d-flex flex-row align-items-center fs-2 fw-bold"
        >
          <FaDog /> <span className="ms-2">Dogs</span>
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navmenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navmenu">
          <ul className="navbar-nav ms-auto">
            <li className="navbar-item text-center text-start-md">
              <a href="#learn" className="nav-link">
                Favorites
              </a>
            </li>
            <li className="navbar-item bg-danger rounded text-center text-start-md custom-btn ms-2">
              <a href="#questions" className="nav-link text-white ">
                Create Dog
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
