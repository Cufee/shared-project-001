import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login } from "../core/api/auth";
import { useEffect } from "react";
import { useUserContext } from "../core/contexts/UserProvider";
import { useNotificationContext } from "../core/contexts/NotificationProvider";

function Login() {
  const { error } = useNotificationContext();
  const { loading, user, saveToken } = useUserContext();
  if (loading) return null;

  const navigate = useNavigate();
  useEffect(() => {
    if (user) navigate("/upload");
  }, [user]);

  const { register, handleSubmit } = useForm();
  const onSubmit = async (data: unknown) => {
    const payload = data as { username: string; password: string };
    const res = await login(payload.username, payload.password);
    if (res.data && res.data.token) {
      saveToken(res.data.token);
      navigate("/upload");
    } else {
      error("Invalid username or password");
    }
  };

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
