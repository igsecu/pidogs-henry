import { useState, useEffect } from "react";

const DogCard = ({ dog, addToFavorite, removeFromFavorite, favorites }) => {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    favorites.forEach((f) => {
      if (f.id === dog.id) {
        setFavorite(true);
        return;
      }
    });
  }, [favorites, dog.id]);

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
    <div
      className="card p-2 border rounded-0 ms-2 mb-2 text-center"
      style={{ width: "18rem" }}
    >
      <img
        src={dog.image}
        className="card-img-top rounded-0"
        alt="..."
        style={{ height: "200px" }}
      />
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <h5 className="card-title">{dog.name}</h5>
          <small className="card-text fw-bold">Weight: {dog.weight}</small>
          <div className="mt-2 d-flex flex-row justify-content-center flex-wrap g-5 ">
            {dog.temperaments ? (
              dog.temperaments.map((t) => (
                <span key={t} className="badge text-bg-success me-2 mb-1">
                  {t}
                </span>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>

        <div className="border-top border-2 pt-2 d-flex justify-content-between align-items-center">
          <a href="/" className="text-decoration-none text-dark">
            See More
          </a>
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
  );
};

export default DogCard;
