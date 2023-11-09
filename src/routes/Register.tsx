import { useForm } from "react-hook-form";
import useQuery from "../core/hooks/useQuery";
import { Link, useNavigate } from "react-router-dom";
import { RegisterFromInvitePayload, RegisterPayload } from "../core/types/Api";
import { useEffect } from "react";
import { useUserContext } from "../core/contexts/UserProvider";

function Register() {
  const query = useQuery();
  const invite = query.get("invite");

  const user = useUserContext();

  const navigate = useNavigate();
  useEffect(() => {
    if (user.user) navigate("/upload");
  }, [user.loading]);

  const { register, handleSubmit } = useForm();
  const onSubmit = async (data: unknown) => {
    if (invite) {
      const payload = data as RegisterFromInvitePayload;
      payload.invitationToken = invite;
      user.register(payload);
    } else {
      user.register(data as RegisterPayload);
    }
  };

  return (
    <form
      className="flex flex-col w-full max-w-sm gap-2 m-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label htmlFor="username">
        <input
          type="text"
          placeholder="Username"
          className="w-full input input-bordered"
          {...register("username", { required: true })}
        />
      </label>
      <label htmlFor="password">
        <input
          type="password"
          placeholder="Password"
          className="w-full input input-bordered"
          {...register("password", { required: true })}
        />
      </label>
      <label htmlFor="passwordResetToken">
        <input
          type="password"
          placeholder="Number of fingers you have"
          className="w-full input input-bordered"
          {...register("passwordResetToken", { required: true })}
        />
      </label>
      <label htmlFor="name">
        <input
          type="text"
          placeholder="Name"
          className="w-full input input-bordered"
          {...register("name", { required: true })}
        />
      </label>
      <label htmlFor="surname">
        <input
          type="text"
          placeholder="Surname"
          className="w-full input input-bordered"
          {...register("surname", { required: true })}
        />
      </label>
      {invite ? (
        <label htmlFor="inviteToken">
          <input
            disabled
            type="hidden"
            value={invite}
            className="w-full input input-bordered"
          />
        </label>
      ) : (
        <label htmlFor="companyName">
          <input
            type="text"
            placeholder="Company Name"
            className="w-full input input-bordered"
            {...register("companyName", { required: true })}
          />
        </label>
      )}
      <button type="submit" className="w-full btn btn-primary">
        {invite ? "Join" : "Register"}
      </button>
      <div className="divider"></div>
      <span className="text-center">Already have an account?</span>
      <Link to="/login" className="w-full btn btn-sm btn-ghost">
        Login
      </Link>
    </form>
  );
}
export default Register;
