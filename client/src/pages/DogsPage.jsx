import { useState, useEffect } from "react";
import FilterNavbar from "../components/FilterNavbar";
import DogListings from "../components/DogListings";
import PaginationNavbar from "../components/PaginationNavbar";
import Spinner from "../components/Spinner";

const DogsPage = ({ addToFavorite, removeFromFavorite, favorites }) => {
  const [dogs, setDogs] = useState([]);
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");
  const [order, setOrder] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [life, setLife] = useState("");
  const [temperament, setTemperament] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchDogs = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/dogs/filter?page=${page}&name=${name}&temperament=${temperament}&order=${order}&weight=${weight}&height=${height}&life=${life}`
        );
        const data = await res.json();
        setDogs(data.data);
        setTotalPages(data.totalPages);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching dogs", error);
      }
    };
    fetchDogs();
  }, [page, name, temperament, order, weight, height, life]);

  return (
    <section>
      <FilterNavbar
        setNameGlobal={setName}
        setTemperament={setTemperament}
        setPage={setPage}
        setOrder={setOrder}
        setWeight={setWeight}
        setHeight={setHeight}
        setLife={setLife}
      />
      {loading ? (
        <Spinner />
      ) : (
        <div className="container p-5" style={{ minHeight: "700px" }}>
          {dogs ? (
            <>
              <PaginationNavbar
                pages={totalPages}
                page={page}
                setPage={setPage}
              />
              <DogListings
                dogs={dogs}
                addToFavorite={addToFavorite}
                removeFromFavorite={removeFromFavorite}
                favorites={favorites}
              />
            </>
          ) : (
            <p>No dogs found!</p>
          )}
        </div>
      )}
    </section>
  );
};

export default DogsPage;
