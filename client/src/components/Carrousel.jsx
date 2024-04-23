import NoFound from "./NoFound";

const Carrousel = ({ comments }) => {
  return (
    <section className="p-3 mt-2">
      <h3 className="border-bottom border-2 border-danger pb-2">
        Last Comments
      </h3>
      {comments.length === 0 ? (
        <div className="mt-5 d-flex align-items-center justify-content-center">
          <NoFound text="No comments to show!" />
        </div>
      ) : (
        <div
          id="comments-carousel"
          className="carousel slide carousel-dark mt-5 d-flex align-items-center border rounded shadow"
          style={{ height: "300px" }}
        >
          <div className="carousel-inner text-center">
            {comments.map((c, index) => (
              <div
                key={c.id}
                className={
                  index === 0 ? "carousel-item active" : "carousel-item"
                }
              >
                <img
                  src={c.dog.image}
                  className="rounded-circle "
                  alt="Dog"
                  style={{
                    width: "150px",
                    height: "150px",
                    boxShadow: "1px 2px 5px black",
                  }}
                />
                <p className="fst-italic mt-3 mb-0">"{c.text}"</p>
                <div className="text-center fw-bold">
                  <p className="mb-0">{c.dog.name}</p>
                  <small className="text-secondary">{c.from}</small>
                </div>
              </div>
            ))}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#comments-carousel"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#comments-carousel"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      )}
    </section>
  );
};

export default Carrousel;
