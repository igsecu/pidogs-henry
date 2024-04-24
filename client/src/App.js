import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import { useState, useEffect } from "react";

import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import DogsPage from "./pages/DogsPage";
import DogPage from "./pages/DogPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const itemsFromLocalStorage =
      JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(itemsFromLocalStorage);
  }, []);

  const addToFavorite = (newDog) => {
    const itemsFromLocalStorage =
      JSON.parse(localStorage.getItem("favorites")) || [];
    itemsFromLocalStorage.unshift(newDog);
    localStorage.setItem("favorites", JSON.stringify(itemsFromLocalStorage));
    setFavorites(itemsFromLocalStorage);
  };

  const removeFromFavorite = (dog) => {
    const itemsFromLocalStorage =
      JSON.parse(localStorage.getItem("favorites")) || [];
    const filteredItems = itemsFromLocalStorage.filter((i) => {
      return i.id !== dog.id;
    });

    localStorage.setItem("favorites", JSON.stringify(filteredItems));
    setFavorites(filteredItems);
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout favorites={favorites} />}>
        <Route index element={<HomePage />} />
        <Route
          path="/dogs"
          element={
            <DogsPage
              addToFavorite={addToFavorite}
              removeFromFavorite={removeFromFavorite}
              favorites={favorites}
            />
          }
        />
        <Route
          path="/dogs/:id"
          element={
            <DogPage
              addToFavorite={addToFavorite}
              removeFromFavorite={removeFromFavorite}
              favorites={favorites}
            />
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
