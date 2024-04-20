import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

const FilterNavbar = () => {
  const [temperaments, setTemperaments] = useState([]);

  useEffect(() => {
    const fetchTemperaments = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/dogs/temperaments");
        const data = await res.json();

        if (data.statusCode === 200) {
          setTemperaments(data.data);
        }
      } catch (error) {
        console.log("Error fetching temperaments", error);
      }
    };

    fetchTemperaments();
  }, []);

  return (
    <nav className="navbar navbar-expand-md bg-dark navbar-dark py-3">
      <div className="container">
        <div className="d-flex flex-column flex-lg-row w-100 justify-content-between">
          <div className="d-grid d-lg-block">
            <select
              className="form-select bg-dark text-white"
              aria-label="Default select example"
            >
              <option selected>Filter by Temperament</option>
              {temperaments ? (
                temperaments.map((t) => (
                  <option key={t.id} value={t.name}>
                    {t.name}
                  </option>
                ))
              ) : (
                <p>No temperaments to show!</p>
              )}
            </select>
          </div>
          <div className="d-grid d-lg-block mt-2 mt-lg-0">
            <div className="d-flex align-items-center">
              <FaSearch className="text-danger fs-3" />
              <form class="d-flex w-100" role="search">
                <input
                  className="form-control me-2 ms-2"
                  type="search"
                  placeholder="Enter dog breed name..."
                  aria-label="Search"
                />
                <button className="btn btn-outline-danger" type="submit">
                  Search
                </button>
              </form>
            </div>
          </div>

          <div className="dropdown d-grid d-lg-block mt-2 mt-lg-0">
            <button
              className="btn btn-dark dropdown-toggle border"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Order By
            </button>
            <ul className="dropdown-menu p-2 bg-dark text-white w-100">
              <p className="mb-0 border-bottom border-1">Name</p>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="radio_name"
                  id="radio_az"
                />
                <label className="form-check-label" for="radio_az">
                  A - Z
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="radio_name"
                  id="radio_za"
                />
                <label className="form-check-label" for="radio_za">
                  Z - A
                </label>
              </div>

              <p className="mt-2 mb-0 border-bottom border-1">Weight</p>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="radio_weight"
                  id="weight_less"
                />
                <label className="form-check-label" for="radio_weight">
                  Less
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="radio_weight"
                  id="weight_more"
                />
                <label className="form-check-label" for="radio_weight">
                  More
                </label>
              </div>

              <p className="mt-2 mb-0 border-bottom border-1">Height</p>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="radio_height"
                  id="height_less"
                />
                <label className="form-check-label" for="radio_height">
                  Less
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="radio_height"
                  id="height_more"
                />
                <label className="form-check-label" for="radio_height">
                  More
                </label>
              </div>
              <p className="mt-2 mb-0 border-bottom border-1">Life</p>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="radio_life"
                  id="life_less"
                />
                <label className="form-check-label" for="radio_life">
                  Less
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="radio_life"
                  id="life_more"
                />
                <label className="form-check-label" for="radio_life">
                  More
                </label>
              </div>
            </ul>
          </div>

          <div className="d-grid d-lg-block  mt-2 mt-lg-0">
            <button className="btn btn-dark">Clean Filters</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default FilterNavbar;
