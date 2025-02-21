import { createBrowserRouter } from "react-router-dom";

import { Applayout } from "./components/layouts/AppLayout";

import NoMatch from "./pages/NoMatch";
import Dashboard from "./pages/Dashboard";
import Empty from "./pages/Empty";
import Sample from "./pages/Sample";
import Signup from "./pages/Signup";
import Events from "./components/Events";
import Login from "./pages/Login";
import Home from "./pages/Home";
export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Applayout />,
      children: [
        {
          path: "/",
          element: <Home />,

        },
        {
          path: "",
          element: <Dashboard />,
        },
        {
          path: "sample",
          element: <Sample />,
        },
        {
          path: "empty",
          element: <Empty />,
        },
        {
          path: "events",
          element: <Events />,
        },
        {
          path: "signup",
          element: <Signup />,
        },
        {
          path: "login",
          element: <Login />,
        },
      ],
    },
    {
      path: "*",
      element: <NoMatch />,
    },
  ],
  {
    basename: global.basename,
  }
);
