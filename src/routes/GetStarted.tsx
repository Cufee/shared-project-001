import { Link } from "react-router-dom";

function GetStarted() {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-8">
      <div className="flex flex-col items-center justify-center w-full gap-4 ">
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
        <Link className="w-48 btn btn-lg btn-primary" to="/join">
          Register
        </Link>
        <Link className="w-48 btn btn-lg" to="/login">
          Login
        </Link>
      </div>
    </div>
  );
}
export default GetStarted;
