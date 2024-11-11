import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ShortUrl from "./pages/ShortUrl.jsx";
import ToastProvider from "./Toast/ToastProvider.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
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

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastProvider>
      <RouterProvider router={router}></RouterProvider>
    </ToastProvider>
  </StrictMode>
);
