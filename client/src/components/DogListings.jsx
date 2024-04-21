import DogCard from "./DogCard";

const DogListings = ({ dogs }) => {
  return (
    <div className="d-flex flex-wrap justify-content-center">
      {dogs.map((d) => (
        <DogCard key={d.id} dog={d} />
      ))}
    </div>
  );
};

export default DogListings;
