import DogCard from "./DogCard";

const DogListings = ({
  dogs,
  addToFavorite,
  removeFromFavorite,
  favorites,
}) => {
  return (
    <div className="d-flex flex-wrap justify-content-center">
      {dogs.map((d) => (
        <DogCard
          key={d.id}
          dog={d}
          addToFavorite={addToFavorite}
          removeFromFavorite={removeFromFavorite}
          favorites={favorites}
        />
      ))}
    </div>
  );
};

export default DogListings;
