import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import LoadingIndicator from "@/components/LoadingIndicator";
import { storeToken } from "../jwt";
import { liveLink, localLink } from "../api";

// const navigate = useNavigate();
function Login(props) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const navigate = useNavigate();

  // a basic function to check id there an empty input field
  async function auth() {
    if (email === "" || pass === "") {
      alert("Empty input Field");
    } else {
      try {
        setLoading(true);
        const response = await fetch(`${liveLink}/auth/loginUser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: pass,
          }),
        });

        const res = await response.json();
        // if (!response.ok) {
        //   throw new Error(res.message);
        // }
        setPass("");
        setEmail("");

        console.log(res);
        if (res.message === "Successful") {
          const token = res.token;
          console.log("token:" + token);

          // Store token in session storage
          storeToken(token);
          alert("User Login Successful");
          navigate("/home");
        }
        if (res.message === "Invalid email or password") {
          alert("Invalid email or password");
        }
        if (res.message === "User does not exist") {
          alert("User does not exist");
        }
      } catch (error) {
        // alert(error);
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <div className=" bg-neutral-800 flex flex-col items-center justify-center h-screen m-0">
      <div className=" bg-gray-800 rounded-lg shadow-md p-8 max-w-sm w-full">
        <h2 className="text-2xl mb-4 font-semibold text-center">Login</h2>
        <input
          type="text"
          placeholder="Email"
          className="w-full rounded-md px-4 py-2 mb-4 bg-gray-200 text-gray-800 focus:outline-none focus:ring focus:border-purple-600"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="relative bg-gray-200 rounded-md flex mb-4 items-center ">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full rounded-md px-4 py-2 overflow-x-auto bg-gray-200 text-gray-800 focus:outline-none focus:ring focus:border-purple-600"
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
          onClick={auth}
        >
          {loading ? <LoadingIndicator /> : "Login"}
        </button>

        <div className="flex justify-center mt-2">
          <p className="text-sm">
            Don't have an account?{" "}
            <span className="text-purple-600 cursor-pointer">
              <Link to="/register">Register</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
export default Login;
