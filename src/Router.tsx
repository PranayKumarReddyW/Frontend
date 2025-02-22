import { createBrowserRouter } from "react-router-dom";
import { Applayout } from "./components/layouts/AppLayout";
import NoMatch from "./pages/NoMatch";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Events from "./components/Events";
import EventDetails from "./components/EventDetails";
import Home from "./pages/Home";
import LoginForm from "./pages/Login";
import SuccessPage from "./pages/success-page";
import CreateEvent from "./pages/CreateEvent";
import PrivateRoute from "./ProtectedRoute";
import QrCodeScanner from "./components/qrcode";
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
            // <PrivateRoute>
            <Dashboard />
            //{" "}
            // </PrivateRoute>
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
          element: <LoginForm />,
        },
        {
          path: "payment-success",
          element: <SuccessPage />,
        },
        {
          path: "create-event",
          element: (
            <PrivateRoute>
              <CreateEvent />
            </PrivateRoute>
          ),
        },
        {
          path: "/scan",
          element: <QrCodeScanner />,
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
