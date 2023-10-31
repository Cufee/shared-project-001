import { Link, useNavigate } from "react-router-dom";
import useUserInfo from "../core/hooks/useUserInfo";

function Login() {
  const { token } = useUserInfo();
  const navigate = useNavigate();
  if (token) navigate("/upload");

  return (
    <div className="flex flex-col w-full max-w-sm gap-2 m-auto">
      {token}
      <label htmlFor="email">
        <input
          name="username"
          type="text"
          placeholder="Username"
          className="w-full max-w-md input input-bordered"
        />
      </label>
      <label htmlFor="email">
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full max-w-md input input-bordered"
        />
      </label>
      <button className="w-full btn btn-primary">Login</button>
      <div className="divider"></div>
      <span className="text-center">Don't have an account?</span>
      <Link to="/join" className="w-full btn btn-sm btn-ghost">
        Register
      </Link>
    </div>
  );
}
export default Login;
