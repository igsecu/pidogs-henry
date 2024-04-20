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

function App() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const itemsFromLocalStorage =
      JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(itemsFromLocalStorage);
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout favorites={favorites} />}>
        <Route index element={<HomePage />} />
        <Route path="/dogs" element={<DogsPage />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
