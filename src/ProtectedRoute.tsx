import React, { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { jwtVerify } from "jose";

const getTokenFromCookie = () => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];
  return token;
};

const studentAccessRoutes = ["/events", "/profile"];
const coordinatorAccessRoutes = [
  "/create-event",
  "/manage-events",
  "/dashboard",
  "/events",
];

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const location = useLocation();
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRoleFromToken = async () => {
      const token = getTokenFromCookie();
      if (token) {
        try {
          const { payload } = await jwtVerify(
            token,
            new TextEncoder().encode("pranay")
          );
          setRole(payload.role as string);
        } catch (error) {
          console.error("Error verifying token:", error);
        }
      }
      setLoading(false);
    };

    fetchRoleFromToken();
  }, []); // Adding an empty dependency array to ensure the effect runs only once on mount

  if (loading) return <div>Loading...</div>;

  if (!role) {
    return <Navigate to="/unauthorized" replace />;
  }

  if (role === "Student") {
    if (!studentAccessRoutes.includes(location.pathname)) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  if (role === "Coordinator") {
    if (!coordinatorAccessRoutes.includes(location.pathname)) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return <>{children}</>;
};

export default PrivateRoute;
