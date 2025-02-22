import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function Applayout() {
  const location = useLocation();
  const hideHeaderPaths = ["/signup", "/", "/login"]; // Add more paths as needed

  return (
    <>
      {!hideHeaderPaths.includes(location.pathname) && <Header />}
      <div className="flex-grow flex flex-col">
        <div className="container px-4 md:px-8 flex-grow flex flex-col">
          <Outlet />
        </div>
      </div>
      <div className="container px-4 md:px-8">
        <Footer />
      </div>
    </>
  );
}
