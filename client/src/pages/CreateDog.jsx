import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

const CreateDog = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [minHeight, setMinHeight] = useState(0);
  const [maxHeight, setMaxHeight] = useState(0);
  const [minWeight, setMinWeight] = useState(0);
  const [maxWeight, setMaxWeight] = useState(0);
  const [minLifeSpan, setMinLifeSpan] = useState(0);
  const [maxLifeSpan, setMaxLifeSpan] = useState(0);
  const [allTemperaments, setAllTemperaments] = useState([]);
  const [temperaments, setTemperaments] = useState([]);
  const [file, setFile] = useState(null);
  const [imageSrc, setImageScr] = useState(null);

  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTemperaments = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/dogs/temperaments");
        const data = await res.json();

        if (data.statusCode === 200) {
          setAllTemperaments(data.data);
        }
      } catch (error) {
        console.log("Error fetching temperaments", error);
      }
    };

    fetchTemperaments();
  }, []);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onload = () => {
      setImageScr(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const addTemperament = (temperament) => {
    if (!temperaments.includes(temperament.name)) {
      setTemperaments([temperament.name, ...temperaments]);
    }
  };

  const removeFromTemperaments = (name) => {
    setTemperaments(temperaments.filter((t) => t !== name));
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("Dog image is missing!");
      setShow(true);
      return;
    }

    const newDog = {
      name,
      min_height: minHeight,
      max_height: maxHeight,
      min_weight: minWeight,
      max_weight: maxWeight,
      min_life_span: minLifeSpan,
      max_life_span: maxLifeSpan,
      temperaments,
    };

    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/dogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDog),
      });

      const data = await res.json();

      if (data.statusCode === 201) {
        const formData = new FormData();
        formData.append("image", file);

        const resImageUpload = await fetch(
          `http://localhost:5000/api/dogs/${data.data.id}`,
          {
            method: "PUT",
            body: formData,
          }
        );

        const dataImageUpload = await resImageUpload.json();

        if (dataImageUpload.statusCode === 200) {
          navigate(`/dogs/${data.data.id}`);
        } else {
          setMessage(dataImageUpload.msg);
          setShow(true);
          setLoading(false);
        }
      } else {
        setMessage(data.msg);
        setShow(true);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container py-5 ">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h2 className="text-center">Create New Dog</h2>
          <form
            className="col col-lg-6 mx-auto border shadow px-3"
            onSubmit={submitForm}
          >
            <div className="mt-3 d-flex flex-column flex-md-row align-items-center justify-content-center">
              <img
                className="rounded-circle me-3 bg-secondary object-fit-cover"
                src={imageSrc ? imageSrc : ""}
                alt=""
                style={{ width: "100px", height: "100px" }}
              />

              <div className="mt-3 mt-md-0 text-center text-md-start">
                <label className="form-label fw-bold">Select Dog Picture</label>
                <input
                  className="form-control"
                  type="file"
                  id="formFile"
                  onChange={handleFileChange}
                />
              </div>
            </div>
            <div className="mt-3">
              <label htmlFor="job-type" className="form-label fw-bold">
                Name
              </label>
              <input
                id="type"
                className="form-control"
                placeholder="Enter dog name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mt-3">
              <div className="d-flex justify-content-between">
                <div>
                  <label className="form-label fw-bold">Min Height</label>
                  <input
                    className="form-control"
                    type="number"
                    value={minHeight}
                    onChange={(e) => setMinHeight(e.target.value)}
                  />
                </div>
                <div>
                  <label className="form-label fw-bold">Max Height</label>
                  <input
                    className="form-control"
                    type="number"
                    value={maxHeight}
                    onChange={(e) => setMaxHeight(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="mt-3">
              <div className="d-flex justify-content-between">
                <div>
                  <label className="form-label fw-bold">Min Weight</label>
                  <input
                    className="form-control"
                    type="number"
                    value={minWeight}
                    onChange={(e) => setMinWeight(e.target.value)}
                  />
                </div>
                <div>
                  <label className="form-label fw-bold">Max Weight</label>
                  <input
                    className="form-control"
                    type="number"
                    value={maxWeight}
                    onChange={(e) => setMaxWeight(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="mt-3">
              <div className="d-flex justify-content-between">
                <div>
                  <label className="form-label fw-bold">Min Life Span</label>
                  <input
                    className="form-control"
                    type="number"
                    value={minLifeSpan}
                    onChange={(e) => setMinLifeSpan(e.target.value)}
                  />
                </div>
                <div>
                  <label className="form-label fw-bold">Max Life Span</label>
                  <input
                    className="form-control"
                    type="number"
                    value={maxLifeSpan}
                    onChange={(e) => setMaxLifeSpan(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="mt-3">
              <select
                className="form-select text-dark fw-bold"
                aria-label="Default select example"
              >
                <option value="" id="temperament_title">
                  Choose Temperament
                </option>
                {allTemperaments ? (
                  allTemperaments.map((t) => (
                    <option
                      key={t.id}
                      value={t.id}
                      onClick={() => addTemperament(t)}
                    >
                      {t.name}
                    </option>
                  ))
                ) : (
                  <p>No temperaments to show!</p>
                )}
              </select>
            </div>
            <div className="mt-3">
              {temperaments.length > 0 ? (
                <div className="d-flex justify-content-center flex-wrap mb-2">
                  {temperaments.map((t) => (
                    <span key={t} className="badge text-bg-success me-2 mb-2">
                      <span
                        className="me-2"
                        style={{ cursor: "pointer" }}
                        onClick={() => removeFromTemperaments(t)}
                      >
                        X
                      </span>
                      {t}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-center text-danger fw-bold">
                  No temperaments chosen!
                </p>
              )}
            </div>
            <div className="border-top border-2">
              {show ? (
                <div
                  className="alert alert-danger text-center mt-3"
                  role="alert"
                >
                  {message}!
                </div>
              ) : (
                <></>
              )}
              <div className="mt-3 d-grid">
                <button type="submit" className="btn btn-dark mb-3">
                  Create Dog
                </button>
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default CreateDog;
