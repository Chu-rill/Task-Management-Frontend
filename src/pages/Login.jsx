import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import LoadingIndicator from "@/components/LoadingIndicator";
// const navigate = useNavigate();
function Login(props) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showPopover, setShowPopover] = useState(false);
  const navigate = useNavigate();

  // a basic function to check id there an empty input field
  async function auth() {
    if (email === "" || pass === "") {
      alert("Empty input Field");
    } else {
      try {
        const response = await fetch(`http://localhost:3000/auth/loginUser`, {
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
        if (!response.ok) {
          throw new Error(res.message);
        }
        setPass("");
        setEmail("");

        console.log(res);
        alert("User Login");
        navigate("/home");
      } catch (error) {
        alert(error);
      }
    }
  }

  return (
    <div className=" bg-neutral-800 flex flex-col items-center justify-center h-screen">
      <div className=" bg-gray-800 rounded-lg shadow-md p-8 max-w-sm w-full">
        <h2 className="text-2xl mb-4 font-semibold text-center">Login</h2>
        <input
          type="text"
          placeholder="Email"
          className="w-full rounded-md px-4 py-2 mb-4 bg-gray-200 text-gray-800 focus:outline-none focus:ring focus:border-purple-600"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full rounded-md px-4 py-2 mb-4 bg-gray-200 text-gray-800 focus:outline-none focus:ring focus:border-purple-600"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        {loading && <LoadingIndicator />}
        <button
          className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition duration-300"
          onClick={auth}
        >
          Login
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
