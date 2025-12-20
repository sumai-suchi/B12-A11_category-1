import { useContext } from "react";
import { useForm } from "react-hook-form";
import { FaRegUserCircle } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../AuthContext/AuthContext";

const Login = () => {
  const { SignIn } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const handleFromData = (data) => {
    console.log(data);

    SignIn(data?.email, data?.Password)
      .then((res) => {
        console.log(res?.user);
        navigate("/");
      })
      .then((error) => {
        console.log(error);
      });
  };
  return (
    <div className="w-96 mx-auto my-11">
      <div className="flex flex-col gap-4 ">
        <h1 className="text-4xl font-extrabold ">SignIn with Account </h1>

        <FaRegUserCircle className="size-8" />
      </div>
      <form onSubmit={handleSubmit(handleFromData)}>
        <fieldset className="fieldset">
          <label className="label text-[#000000] font-semibold ">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input w-full"
            placeholder="name"
          />
          <label className="label text-[#000000] font-semibold ">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input w-full"
            placeholder="Email"
          />
          <label className="label text-[#000000] font-semibold">Password</label>
          <input
            type="password"
            {...register("Password", { required: true })}
            className="input w-full"
            placeholder="Password"
          />
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn bg-primary mt-4">Login</button>
        </fieldset>
      </form>

      <h1>
        If you don't have an account go to{" "}
        <NavLink to={"/auth/register"} className={"text-blue-500 font-bold"}>
          Register
        </NavLink>
      </h1>
    </div>
  );
};

export default Login;
