import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { Home, Playlist, Settings } from "./pages";
import { Layout } from "./components/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/playlist", element: <Playlist /> },
      { path: "/settings", element: <Settings /> },
    ],
  },
]);

const App: React.FC = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
