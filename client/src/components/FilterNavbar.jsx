import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

const FilterNavbar = ({
  setNameGlobal,
  setTemperament,
  setPage,
  setOrder,
  setWeight,
  setHeight,
  setLife,
}) => {
  const [temperaments, setTemperaments] = useState([]);
  const [name, setName] = useState("");
  const [selectedNameOrder, setSelectedNameOrder] = useState("");
  const [selectedWeightOrder, setSelectedWeightOrder] = useState("");
  const [selectedHeightOrder, setSelectedHeightOrder] = useState("");
  const [selectedLifeOrder, setSelectedLifeOrder] = useState("");
  const [temperamentOption, setTemperamentOption] = useState("");

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

  const submitName = (e) => {
    e.preventDefault();

    setNameGlobal(name);
    setPage(1);
  };

  const setTemperamentGlobal = (id) => {
    setTemperament(id);
    setPage(1);
  };

  const handleNameOptionChange = (e) => {
    setSelectedNameOrder(e.target.value);
    setOrder(e.target.value);
  };

  const handleWeightOptionChange = (e) => {
    setSelectedWeightOrder(e.target.value);
    setWeight(e.target.value);
  };

  const handleHeightOptionChange = (e) => {
    setSelectedHeightOrder(e.target.value);
    setHeight(e.target.value);
  };

  const handleLifeOptionChange = (e) => {
    setSelectedLifeOrder(e.target.value);
    setLife(e.target.value);
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleTemperamentOption = (e) => {
    setTemperamentOption(e.target.value);
    setTemperamentGlobal(e.target.value);
  };

  const cleanFilters = () => {
    setName("");
    setNameGlobal("");
    setTemperament("");
    setPage(1);
    setSelectedNameOrder("");
    setOrder("");
    setSelectedWeightOrder("");
    setWeight("");
    setSelectedHeightOrder("");
    setHeight("");
    setSelectedLifeOrder("");
    setLife("");
    setTemperamentOption("");
    setTemperamentGlobal("");
  };

  return (
    <nav className="navbar navbar-expand-md bg-dark navbar-dark py-3">
      <div className="container">
        <div className="d-flex flex-column flex-lg-row w-100 justify-content-between">
          <div className="d-grid d-lg-block">
            <select
              className="form-select bg-dark text-white"
              aria-label="Default select example"
              value={temperamentOption}
              onChange={handleTemperamentOption}
            >
              <option value="" id="temperament_title">
                Filter by Temperament
              </option>
              {temperaments ? (
                temperaments.map((t) => (
                  <option key={t.id} value={t.id}>
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
              <form
                className="d-flex w-100"
                role="search"
                onSubmit={submitName}
              >
                <input
                  className="form-control me-2 ms-2"
                  type="search"
                  placeholder="Enter dog breed name..."
                  aria-label="Search"
                  value={name}
                  onChange={handleName}
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
                  value="ASC"
                  checked={selectedNameOrder === "ASC"}
                  onClick={handleNameOptionChange}
                  readOnly
                />
                <label className="form-check-label" htmlFor="radio_az">
                  A - Z
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="radio_name"
                  id="radio_za"
                  value="DESC"
                  checked={selectedNameOrder === "DESC"}
                  onClick={handleNameOptionChange}
                  readOnly
                />
                <label className="form-check-label" htmlFor="radio_za">
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
                  value="ASC"
                  checked={selectedWeightOrder === "ASC"}
                  onClick={handleWeightOptionChange}
                  readOnly
                />
                <label className="form-check-label" htmlFor="radio_weight">
                  Less
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="radio_weight"
                  id="weight_more"
                  value="DESC"
                  checked={selectedWeightOrder === "DESC"}
                  onClick={handleWeightOptionChange}
                  readOnly
                />
                <label className="form-check-label" htmlFor="radio_weight">
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
                  value="ASC"
                  checked={selectedHeightOrder === "ASC"}
                  onClick={handleHeightOptionChange}
                  readOnly
                />
                <label className="form-check-label" htmlFor="radio_height">
                  Less
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="radio_height"
                  id="height_more"
                  value="DESC"
                  checked={selectedHeightOrder === "DESC"}
                  onClick={handleHeightOptionChange}
                  readOnly
                />
                <label className="form-check-label" htmlFor="radio_height">
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
                  value="ASC"
                  checked={selectedLifeOrder === "ASC"}
                  onClick={handleLifeOptionChange}
                  readOnly
                />
                <label className="form-check-label" htmlFor="radio_life">
                  Less
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="radio_life"
                  id="life_more"
                  value="DESC"
                  checked={selectedLifeOrder === "DESC"}
                  onClick={handleLifeOptionChange}
                  readOnly
                />
                <label className="form-check-label" htmlFor="radio_life">
                  More
                </label>
              </div>
            </ul>
          </div>

          <div className="d-grid d-lg-block  mt-2 mt-lg-0">
            <button className="btn btn-dark" onClick={cleanFilters}>
              Clean Filters
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default FilterNavbar;
