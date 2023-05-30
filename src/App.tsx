import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { Create, Home, Playlist, Settings } from "./pages";
import { Layout } from "./components/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Home /> },
      {
        path: "playlist",
        children: [
          { path: "", element: <Playlist /> },
          { path: "create", element: <Create /> },
        ],
      },
      { path: "settings", element: <Settings /> },
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
