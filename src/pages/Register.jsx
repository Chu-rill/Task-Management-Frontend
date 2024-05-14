import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import LoadingIndicator from "@/components/LoadingIndicator";
import { liveLink, localLink } from "../api";

function Register() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await fetch(`${localLink}/auth/registerUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user,
          password: pass,
          email: email,
        }),
      });
      const res = await response.json();
      // if (!res.ok) {
      //   throw new Error(res.message);
      // }
      setUser("");
      setPass("");
      setEmail("");
      console.log(res);
      if (res.message === "Successful") {
        alert("User Created");
        navigate("/login");
      }
      if (res.message === "Something went wrong") {
        alert("Something went wrong");
      }
      if (res.message === "User already exists") {
        alert("User already exists");
      }
      // Redirect to "/login" upon successful sign up
    } catch (error) {
      // alert(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  // 1.25

  return (
    <div className=" bg-neutral-800 flex flex-col items-center justify-center h-screen">
      <form onSubmit={handleSubmit}>
        <div className="  bg-gray-800 rounded-lg shadow-md p-8 max-w-sm w-full">
          <h2 className="text-2xl mb-4 font-semibold text-center">Register</h2>

          <input
            type="text"
            placeholder="Username"
            className="w-full rounded-md px-4 py-2 mb-4 bg-gray-200 text-gray-800 focus:outline-none focus:ring focus:border-purple-600"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />

          <input
            type="text"
            placeholder="E-mail"
            className="w-full rounded-md px-3 py-2 mb-4 bg-gray-200 text-gray-800 focus:outline-none focus:ring focus:border-purple-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="relative bg-gray-200 rounded-md flex mb-4 items-center ">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full m-0 rounded-md px-4 py-2 overflow-x-auto bg-gray-200 text-gray-800 focus:outline-none focus:ring focus:border-purple-600"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
            <FontAwesomeIcon
              icon={showPassword ? faEye : faEyeSlash}
              className="absolute right-0 mr-3 text-xl hover:cursor-pointer "
              onClick={togglePasswordVisibility}
            />
          </div>
          <button
            className=" flex justify-center w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition duration-300"
            type="submit"
          >
            {loading ? <LoadingIndicator /> : "Sign Up"}
          </button>

          <div className="flex justify-center mt-2">
            <p className="text-sm">
              Already have an account?{" "}
              <span className="text-purple-600 cursor-pointer">
                <Link to="/login">Login</Link>
              </span>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;
