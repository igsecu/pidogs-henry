import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import NoFound from "../components/NoFound";
import { FaArrowLeft, FaExclamation } from "react-icons/fa";
import { Link } from "react-router-dom";
import Comment from "../components/Comment";

const DogPage = () => {
  const { id } = useParams();

  const [dog, setDog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [comments, setComments] = useState([]);

  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const [add, setAdd] = useState(false);

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
      setShow(true);
      setMessage("Comment created successfully!");
      setTimeout(() => {
        setShow(false);
        setMessage("");
      }, 2000);
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
                        <label className="form-label">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter your name..."
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Comment</label>
                        <textarea
                          type="text"
                          className="form-control"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        />
                      </div>
                      {show ? (
                        <div className="alert alert-success" role="alert">
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
