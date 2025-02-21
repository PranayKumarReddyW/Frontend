import { createBrowserRouter } from "react-router-dom";
import { Applayout } from "./components/layouts/AppLayout";
import NoMatch from "./pages/NoMatch";
import Dashboard from "./pages/Dashboard";
import Empty from "./pages/Empty";
import Sample from "./pages/Sample";
import Signup from "./pages/Signup";
import Events from "./components/Events";
import EventDetails from "./components/EventDetails";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateEvent from "./pages/CreateEvent";
import PrivateRoute from "./ProtectedRoute"; // Import the PrivateRoute component

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
          path: "/dashboard",
          element: (
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          ),
        },

        {
          // Protect the events route
          path: "events",
          element: (
            <PrivateRoute>
              <Events />
            </PrivateRoute>
          ),
        },
        {
          path: "events/:id/:name",
          element: <EventDetails />,
        },
        {
          path: "signup",
          element: <Signup />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          // Protect the create event route
          path: "create-event",
          element: (
            <PrivateRoute>
              <CreateEvent />
            </PrivateRoute>
          ),
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
