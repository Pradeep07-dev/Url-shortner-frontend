import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ShortUrl from "./pages/ShortUrl";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/:hashvalue",
    element: <ShortUrl></ShortUrl>,
  },
]);

const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
