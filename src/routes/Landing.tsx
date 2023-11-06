import { Link } from "react-router-dom";
import { useUserContext } from "../core/contexts/UserProvider";

function Landing() {
  const { user } = useUserContext();
  return (
    <div className="relative h-full hero bg-base-200">
      <div className="text-center hero-content">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">
            <span className="text-primary">Secure</span> Enterprise File Sharing
          </h1>
          <p className="py-6">
            Easily share and collaborate on files with your team, no matter
            where you are.
          </p>
          {user ? (
            <Link to="/upload" className="btn btn-primary">
              Start Uploading
            </Link>
          ) : (
            <Link to="/get-started" className="btn btn-primary">
              Get Started
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
export default Landing;
