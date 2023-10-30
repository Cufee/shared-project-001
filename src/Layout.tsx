import Navbar from "./components/shared/Navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "./routes/Landing";
import Upload from "./routes/Upload";
import Footer from "./components/shared/Footer";
import Manage from "./routes/Manage";
import Profile from "./routes/Profile";
import Register from "./routes/Register";
import GetStarted from "./routes/GetStarted";
import Error from "./routes/Error";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/upload",
    element: <Upload />,
  },
  {
    path: "/manage",
    element: <Manage />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/join",
    element: <Register />,
  },
  {
    path: "/get-started",
    element: <GetStarted />,
  },
  {
    path: "*",
    element: (
      <Error code={404} message="This page was moved or does not exist" />
    ),
  },
]);

function Layout() {
  return (
    <>
      <div className="flex flex-col items-center justify-start h-full min-h-screen">
        <Navbar />
        <RouterProvider router={router} />
      </div>
      <Footer />
    </>
  );
}

export default Layout;
