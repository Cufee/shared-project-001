import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUserContext } from "../core/contexts/UserProvider";

function GetStarted() {
  const { user, loading } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/upload");
  }, [loading]);

  return (
    <div className="flex flex-col gap-8 m-auto">
      <div className="flex flex-col items-center justify-center w-full gap-4 px-8">
        <div className="flex flex-col items-center">
          <span className="text-4xl font-bold">Already have an invite?</span>
        </div>
        <input
          type="text"
          placeholder="https://cloud-file.com/join/..."
          className="w-full max-w-md input"
          autoFocus={true}
        />
      </div>
      <div className="divider">OR</div>
      <div className="flex items-center justify-center gap-4">
        <Link className="w-48 btn btn-primary" to="/join">
          Register
        </Link>
        <Link className="w-48 btn" to="/login">
          Login
        </Link>
      </div>
    </div>
  );
}
export default GetStarted;
