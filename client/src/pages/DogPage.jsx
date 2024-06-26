import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import NoFound from "../components/NoFound";
import { FaArrowLeft, FaExclamation } from "react-icons/fa";
import { Link } from "react-router-dom";
import Comment from "../components/Comment";

const DogPage = ({ addToFavorite, removeFromFavorite, favorites }) => {
  const { id } = useParams();

  const [dog, setDog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [comments, setComments] = useState([]);

  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);

  const [favorite, setFavorite] = useState(false);

  const commentsEndRef = useRef(null);

  const scrollToBottom = () => {
    commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchDog = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/dogs/${id}`);
        const data = await res.json();
        if (data.statusCode === 200) {
          setDog(data.data);

          const resComments = await fetch(
            `http://localhost:5000/api/dogs/comments/${id}`
          );
          const dataComments = await resComments.json();
          if (dataComments.statusCode === 200) {
            setComments(dataComments.data);
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDog();
  }, [id]);

  useEffect(() => {
    favorites.forEach((f) => {
      if (f.id === dog?.id) {
        setFavorite(true);
        return;
      }
    });
  }, [favorites, dog?.id]);

  useEffect(() => scrollToBottom(), [comments]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const newComment = {
      dogId: id,
      text: comment,
      from: name ? name : "Anonymous",
    };

    const res = await fetch("http://localhost:5000/api/dogs/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newComment),
    });

    const data = await res.json();

    if (data.statusCode === 201) {
      setComments([
        ...comments,
        {
          id,
          text: comment,
          from: name ? name : "Anonymous",
        },
      ]);
      setComment("");
      setName("");
      setError(false);
      setShow(true);
      setMessage("Comment created successfully!");
      setTimeout(() => {
        setShow(false);
        setMessage("");
      }, 2000);
    }

    if (data.statusCode === 400) {
      setShow(true);
      setMessage(data.msg);
      setError(true);
    }
  };

  const handleAction = () => {
    if (favorite) {
      removeFromFavorite(dog);
      setFavorite(false);
    } else {
      addToFavorite(dog);
      setFavorite(true);
    }
  };

  return (
    <div className="container mt-3" style={{ minHeight: "700px" }}>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Link
            to="/dogs"
            className="d-flex align-items-center text-decoration-none mb-3 text-dark"
          >
            <FaArrowLeft className="me-1" /> <span>Back to Dogs Listings</span>
          </Link>
          {dog ? (
            <div className="row">
              <div className="col-lg-9">
                <div className="text-center">
                  <img
                    src={dog.image}
                    alt="Dog"
                    className="main-dog object-fit-contain"
                  />
                </div>
                <div className="mt-3 border border-2 p-3 rounded">
                  <h3 className="border-bottom border-2 mb-3">{dog.name}</h3>
                  <p className="bg-success bg-opacity-25">
                    <span className="fw-bold">Weight: </span>
                    {dog.weight}
                  </p>
                  <p className="bg-success bg-opacity-25">
                    <span className="fw-bold">Height: </span>
                    {dog.height}
                  </p>
                  <p className="bg-success bg-opacity-25">
                    <span className="fw-bold">Life Span: </span>
                    {dog.life_span}
                  </p>
                  <div className="mb-3 border-bottom border-2">
                    <span className="fw-bold">Temperaments: </span>
                    <div className="d-flex justify-content-start flex-wrap mt-2">
                      {dog.temperaments.length > 0 ? (
                        dog.temperaments.map((t) => (
                          <span
                            key={t}
                            className="badge text-bg-success me-2 mb-2"
                          >
                            {t}
                          </span>
                        ))
                      ) : (
                        <p>No temperaments to show!</p>
                      )}
                    </div>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button
                      className={
                        favorite
                          ? "btn btn-danger rounded-0"
                          : "btn btn-success rounded-0"
                      }
                      onClick={handleAction}
                    >
                      {favorite ? "Remove Favorite" : "Add Favorite"}
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 mt-2 mt-lg-0">
                <div
                  className="border border-2 rounded d-flex flex-column justify-content-between p-2"
                  style={{ height: "700px" }}
                >
                  <div className="h-100 overflow-scroll">
                    {comments.length > 0 ? (
                      <div className="d-flex flex-column">
                        {comments.map((c) => (
                          <Comment key={c.id} comment={c} />
                        ))}
                        <div ref={commentsEndRef} />
                      </div>
                    ) : (
                      <div className="text-center d-flex flex-column align-items-center justify-content-center h-100">
                        <FaExclamation className="text-danger fs-1 mb-1" />
                        <p className="fw-bold">No comments to show!</p>
                      </div>
                    )}
                  </div>
                  <div className="border-top border-2 pt-2 border-dark">
                    <form onSubmit={onSubmit}>
                      <div className="mb-3">
                        <label className="form-label fw-bold">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter your name..."
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label fw-bold">Comment</label>
                        <textarea
                          type="text"
                          className="form-control"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        />
                      </div>
                      {show ? (
                        <div
                          className={`alert ${
                            error ? "alert-danger" : "alert-success"
                          } text-center`}
                          role="alert"
                        >
                          {message}
                        </div>
                      ) : (
                        <></>
                      )}
                      <div className="d-grid">
                        <button
                          type="submit"
                          className={
                            comment ? "btn btn-dark" : "btn btn-dark disabled"
                          }
                        >
                          Send Comment
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              className="d-flex justify-content-center align-items-center "
              style={{ height: "600px" }}
            >
              <NoFound text={`Dog with ID: ${id} not found!`} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DogPage;
