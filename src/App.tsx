import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { Create, Connect, Home, Playlist, Settings } from "./pages";
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
  {
    path: "/connect",
    element: <Connect />,
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
