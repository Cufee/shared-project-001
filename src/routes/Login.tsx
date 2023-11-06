import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useUserContext } from "../core/contexts/UserProvider";

function Login() {
  const { loading, user, login } = useUserContext();

  const navigate = useNavigate();
  useEffect(() => {
    if (user) navigate("/upload");
  }, [loading]);

  const { register, handleSubmit } = useForm();
  const onSubmit = (data: unknown) => {
    const payload = data as { username: string; password: string };
    login(payload.username, payload.password);
  };

  if (loading) return null;
  return (
    <div className="flex flex-col w-full max-w-sm gap-2 m-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full gap-2"
      >
        <label htmlFor="username">
          <input
            type="text"
            placeholder="Username"
            className="w-full max-w-md input input-bordered"
            {...register("username", { required: true })}
          />
        </label>
        <label htmlFor="password">
          <input
            type="password"
            placeholder="Password"
            className="w-full max-w-md input input-bordered"
            {...register("password", { required: true })}
          />
        </label>
        <button type="submit" className="w-full btn btn-primary">
          Login
        </button>
      </form>
      <div className="divider"></div>
      <span className="text-center">Don't have an account?</span>
      <Link to="/join" className="w-full btn btn-sm btn-ghost">
        Register
      </Link>
    </div>
  );
}
export default Login;
