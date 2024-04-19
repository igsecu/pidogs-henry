import { useState, useEffect } from "react";

import MainDog from "../components/MainDog";
import LastDogs from "../components/LastDogs";
import MoreDogs from "../components/MoreDogs";
import Carrousel from "../components/Carrousel";
import Spinner from "../components/Spinner";

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [last, setLast] = useState([]);
  const [more, setMore] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchLast = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/dogs/last");
        const data = await res.json();
        if (data.statusCode === 200) {
          setLast(data.data);
        }
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };

    const fetchMore = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/dogs/views");
        const data = await res.json();
        if (data.statusCode === 200) {
          setMore(data.data);
        }
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };

    const fetchLastComments = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/dogs/comments/last");
        const data = await res.json();
        if (data.statusCode === 200) {
          setComments(data.data);
        }
      } catch (error) {
        console.log("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLast();
    fetchMore();
    fetchLastComments();
  }, []);

  return (
    <div className="container mt-3 ">
      <div className="row">
        {loading ? (
          <Spinner />
        ) : (
          <>
            <div className="col-lg-9">
              <MainDog />
              <Carrousel comments={comments} />
            </div>
            <div className="col-lg-3 mt-3 mt-lg-0">
              <div className="d-flex flex-column flex-lg-column flex-md-row justify-content-center">
                <LastDogs dogs={last} />
                <MoreDogs dogs={more} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
