import { FaDog } from "react-icons/fa";
import { Link, NavLink, useLocation } from "react-router-dom";

const Navbar = ({ favorites }) => {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-md bg-dark navbar-dark py-3">
      <div className="container">
        <NavLink
          to="/"
          className="navbar-brand d-flex flex-row align-items-center fs-2 fw-bold"
        >
          <FaDog /> <span className="ms-2">Dogs</span>
        </NavLink>

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
            {location.pathname !== "/" && (
              <li className="navbar-item text-center text-start-md">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
              </li>
            )}
            <li className="nav-item dropdown text-center text-start-md">
              <span
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Favorites
              </span>
              <ul
                className="dropdown-menu bg-light border-0 text-dark shadow border"
                style={{ maxHeight: "150px" }}
              >
                {favorites ? (
                  <p className="mb-0 fw-bold text-center">
                    No favorites to show!
                  </p>
                ) : (
                  <li>
                    <a className="dropdown-item" href="/">
                      Action
                    </a>
                  </li>
                )}
              </ul>
            </li>

            <li className="navbar-item bg-danger rounded text-center text-start-md custom-btn mt-2 mt-md-0 ms-md-2">
              <Link to="/" className="nav-link text-white ">
                Create Dog
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
