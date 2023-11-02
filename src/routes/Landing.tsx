import { Link } from "react-router-dom";

function Landing() {
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
          <Link to="/get-started" className="btn btn-primary">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Landing;
