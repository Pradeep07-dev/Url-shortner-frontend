import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ShortUrl from "./pages/ShortUrl";
import Home from "./pages";

const router = createBrowserRouter([
  {
    path: "/test",
    element: <div />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/:hashvalue",
    element: <ShortUrl></ShortUrl>,
  },
  {
    path: "/testing",
    element: <ShortUrl></ShortUrl>,
  },
]);

const App = () => {
  // const router = createBrowserRouter([
  //   {
  //     path: "test",
  //     element: <div />,
  //   },
  //   {
  //     path: "/",
  //     element: <Home />,
  //   },
  //   {
  //     path: "/:hashvalue",
  //     element: <ShortUrl />,
  //   },
  //   {
  //     path: "/testing",
  //     element: <ShortUrl></ShortUrl>,
  //   },
  // ]);

  console.log("called");

  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
