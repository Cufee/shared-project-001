// username: string;
// password: string;
// passwordResetToken: string;
// name: string;
// surname: string;
// companyName: string;

import useQuery from "../core/hooks/useQuery";

function Register() {
  const query = useQuery();
  const invite = query.get("invite");

  return (
    <form className="flex flex-col items-center justify-center w-full gap-2">
      <label htmlFor="email">
        <input
          name="username"
          type="text"
          placeholder="Username"
          className="w-full max-w-md input input-bordered"
        />
      </label>
      <label htmlFor="password">
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full max-w-md input input-bordered"
        />
      </label>
      <label htmlFor="passwordResetToken">
        <input
          name="passwordResetToken"
          type="password"
          placeholder="Number of fingers you have"
          className="w-full max-w-md input input-bordered"
        />
      </label>
      <label htmlFor="name">
        <input
          name="name"
          type="text"
          placeholder="Name"
          className="w-full max-w-md input input-bordered"
        />
      </label>
      <label htmlFor="surname">
        <input
          name="surname"
          type="text"
          placeholder="Surname"
          className="w-full max-w-md input input-bordered"
        />
      </label>
      {(invite && (
        <label htmlFor="inviteToken">
          <input
            disabled
            name="inviteToken"
            type="hidden"
            value={invite}
            className="w-full max-w-md input input-bordered"
          />
        </label>
      )) || (
        <label htmlFor="companyName">
          <input
            name="companyName"
            type="text"
            placeholder="Company Name"
            className="w-full max-w-md input input-bordered"
          />
        </label>
      )}
      <button type="submit" className="btn btn-primary">
        {invite ? "Join" : "Register"}
      </button>
    </form>
  );
}
export default Register;
