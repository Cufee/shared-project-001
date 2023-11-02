import Navbar from "./components/shared/Navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import Landing from "./routes/Landing";
import Upload from "./routes/Upload";
import Footer from "./components/shared/Footer";
import Manage from "./routes/Manage";
import Profile from "./routes/Profile";
import Register from "./routes/Register";
import GetStarted from "./routes/GetStarted";
import Error from "./routes/Error";

import Login from "./routes/Login";
import NotificationProvider, {
  NotificationContainer,
} from "./core/contexts/NotificationProvider";
import UserProvider, { useUserContext } from "./core/contexts/UserProvider";

function Layout() {
  return (
    <NotificationProvider>
      <UserProvider>
        <div className="flex flex-col items-center justify-start h-full min-h-screen">
          <NotificationContainer />
          <Navbar />
          <div className="flex flex-col items-center justify-start flex-grow w-full h-full">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route
                path="/upload"
                element={
                  <ProtectedRoute>
                    <Upload />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/manage"
                element={
                  <ProtectedRoute>
                    <Manage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route path="/join" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/get-started" element={<GetStarted />} />
              <Route
                path="*"
                element={
                  <Error code={404} message="This page does not exist" />
                }
              />
            </Routes>
          </div>
        </div>
        <Footer />
      </UserProvider>
    </NotificationProvider>
  );
}

function ProtectedRoute({ children }: { children: any }) {
  const { user, loading } = useUserContext();
  if (loading) {
    return <span className="m-auto loading loading-lg"></span>;
  }
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default Layout;
