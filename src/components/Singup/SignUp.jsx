import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "https://weather-app-backend-lngu.onrender.com/api/users";
      const { data: res } = await axios.post(url, data);
      navigate("/login");
      console.log(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div
      className={
        "w-full min-h-screen bg-gray-800 flex flex-col items-center justify-center gap-4"
      }
    >
      <div className={"flex justify-center items-center gap-8 text-white"}>
        <p>Already have an account?</p>
        <Link to="/login">
          <button
            type="button"
            className="px-6 py-2 text-white rounded-full bg-gray-950"
          >
            Sing in
          </button>
        </Link>
      </div>

      <form
        className={
          "flex flex-col justify-center items-center gap-4 p-4 bg-blue-300 rounded-lg w-11/12 md:w-2/5 lg:w-1/3"
        }
        onSubmit={handleSubmit}
      >
        <h1 className="text-xl font-semibold text-gray-800 drop-shadow-lg">
          Create Account
        </h1>
        <input
          type="text"
          placeholder="First Name"
          name="firstName"
          onChange={handleChange}
          value={data.firstName}
          required
          className={"w-full p-2 rounded-lg"}
        />
        <input
          type="text"
          placeholder="Last Name"
          name="lastName"
          onChange={handleChange}
          value={data.lastName}
          required
          className={"w-full p-2 rounded-lg"}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          value={data.email}
          required
          className={"w-full p-2 rounded-lg"}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          value={data.password}
          required
          className={"w-full p-2 rounded-lg"}
        />
        {error && (
          <div className={"p-4 bg-red-600 text-white rounded-lg"}>{error}</div>
        )}
        <button
          type="submit"
          className={"px-6 py-2 bg-gray-950 text-white rounded-full"}
        >
          Sing Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
