import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { AuthContext } from "../AuthContext/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router";
import { FaRegUserCircle } from "react-icons/fa";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { SignUpWithEmailPassword, UpdateUser } = useContext(AuthContext);
  console.log(SignUpWithEmailPassword);
  const navigate = useNavigate();
  const [upazilas, setUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    axios.get("/upazila.json").then((res) => {
      setUpazilas(res.data.upazilas);
    });
    axios.get("/districts.json").then((res) => {
      setDistricts(res.data.districts);
    });
  }, []);
  console.log(upazilas, districts);
  const handleFromData = async (data) => {
    console.log(data.photoURL[0]);

    const file = data.photoURL[0];
    console.log(file);

    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=5badb61c303d075b3a4757bc1229a32b`,
      { image: file },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const mainPhotoUrl = res.data.data.display_url;
    const name = data?.name;

    const email = data?.email;
    const bloodGroup = data?.bloodGroup;
    const upazila = data?.upazila;
    const districts = data?.districts;

    const formData = {
      name,
      email,

      mainPhotoUrl,
      bloodGroup,
      upazila,
      districts,
    };

    console.log(formData);

    if (res.data.success == true) {
      SignUpWithEmailPassword(data.email, data.Password)
        .then((res) => {
          UpdateUser({ displayName: data?.name, photoURL: mainPhotoUrl })
            .then(() => {
              console.log(res.user);
              axios
                .post(`http://localhost:5000/user`, formData)
                .then((res) => {
                  console.log(res.data);
                  navigate("/");
                })
                .then((error) => {
                  console.log(error);
                });
            })
            .then((error) => {
              console.log(error);
            });
        })
        .then((error) => {
          console.log(error);
        });
    }
  };
  return (
    <div className="w-96 mx-auto my-11">
      <div className="flex flex-col gap-4 ">
        <h1 className="text-4xl font-extrabold "> Register Account </h1>

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
          <label className="label text-[#000000] font-semibold ">
            PhotoURl
          </label>
          <input
            type="file"
            {...register("photoURL", { required: true })}
            className="input w-full"
            placeholder="photoURL"
          />
          <label className="label text-[#000000] font-semibold ">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input w-full"
            placeholder="Email"
          />
          <label className="label text-[#000000] font-semibold ">
            Select a blood group
          </label>

          <select
            {...register("bloodGroup", {
              required: "Blood group is required",
              onChange: (e) => {
                console.log("Selected Blood Group:", e.target.value);
              },
            })}
            defaultValue=""
            className="select w-full"
          >
            <option value="" disabled>
              Select blood group
            </option>

            <option value="A+">A+</option>
            <option value="A-">A-</option>

            <option value="B+">B+</option>
            <option value="B-">B-</option>

            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>

            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>

          <label className="label text-[#000000] font-semibold ">
            Select a districts
          </label>

          <select
            {...register("districts", { required: "districts is required" })}
            defaultValue=""
            className="select w-full"
          >
            <option value="" disabled>
              Select district
            </option>

            {districts.map((u) => (
              <option key={u.id} value={u.name}>
                {u.name}
              </option>
            ))}
          </select>

          <label className="label text-[#000000] font-semibold ">
            Select a upazila
          </label>

          <select
            {...register("upazila", { required: "Upazila is required" })}
            defaultValue=""
            className="select w-full"
          >
            <option value="" disabled>
              Select upazila
            </option>

            {upazilas.map((u) => (
              <option key={u.id} value={u.name}>
                {u.name}
              </option>
            ))}
          </select>

          <label className="label text-[#000000] font-semibold">Password</label>
          <input
            type="password"
            {...register("Password", {
              required: "Password is required",
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                message:
                  "Password must have at least 1 uppercase, 1 lowercase and minimum 6 characters",
              },
            })}
            className="input w-full"
            placeholder="Password"
          />
          {errors.Password && (
            <p style={{ color: "red" }}>{errors.Password.message}</p>
          )}
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn bg-primary mt-4">Register</button>
        </fieldset>
      </form>
      <p className="text-[#71717A]">
        already have an account ? <span className="text-primary">Login</span>
      </p>
    </div>
  );
};

export default Register;
