import { useForm } from "react-hook-form";
import useQuery from "../core/hooks/useQuery";

function Register() {
  const query = useQuery();
  const invite = query.get("invite");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => console.log(data);
  console.log(watch("example"));

  return (
    <form
      className="flex flex-col items-center justify-center w-full gap-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label htmlFor="email">
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
      <label htmlFor="passwordResetToken">
        <input
          type="password"
          placeholder="Number of fingers you have"
          className="w-full max-w-md input input-bordered"
          {...register("passwordResetToken", { required: true })}
        />
      </label>
      <label htmlFor="name">
        <input
          type="text"
          placeholder="Name"
          className="w-full max-w-md input input-bordered"
          {...register("name", { required: true })}
        />
      </label>
      <label htmlFor="surname">
        <input
          type="text"
          placeholder="Surname"
          className="w-full max-w-md input input-bordered"
          {...register("surname", { required: true })}
        />
      </label>
      {(invite && (
        <label htmlFor="inviteToken">
          <input
            disabled
            type="hidden"
            value={invite}
            className="w-full max-w-md input input-bordered"
            {...register("inviteToken", { required: true })}
          />
        </label>
      )) || (
        <label htmlFor="companyName">
          <input
            type="text"
            placeholder="Company Name"
            className="w-full max-w-md input input-bordered"
            {...register("companyName", { required: true })}
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
