function Login() {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-2">
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
      <div>
        <button className="btn btn-primary">Login</button>
      </div>
    </div>
  );
}
export default Login;
