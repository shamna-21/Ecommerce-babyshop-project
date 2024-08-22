import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useCart } from "../Context/CartContext"; 

function Login() {
  const navigate = useNavigate();
  const { setCart } = useCart();
  const [loginValue, setLoginValue] = useState({ email: "", password: "" });
  const [loginErors, setLoginErors] = useState({ email: "", password: "" });
  

  async function handleSubmit(e) {
    e.preventDefault();
    const validation = {};
    try {
      const response = await axios.get("http://localhost:3000/user");
      const user = response.data.find((use) => use.email === loginValue.email);

      if (user) {
        if(user.blocked){
          toast.warning('Your account is blocked. Please contact support.')
        }
        else if (user.password === loginValue.password) {
          toast.success("login succesfully!");
          localStorage.setItem("id", user.id);
          localStorage.setItem("name", user.name);
          localStorage.setItem('userRole', user.admin)
          const cartResponse = await axios.get(`http://localhost:3000/user/${user.id}`);
          setCart(cartResponse.data.cart || []);

          if (user.admin) {
            navigate("/admin");
          } else {
            navigate("/");
          }
        } else {
          validation.password = "incorrect password";
          toast.warning("incorrect password");
        }
      } else {
        validation.email = "Email not found";
        toast.warning("Email not found or incorrect password");
      }
    } catch (error) {
      toast.error("Errors:" + error);
    }
    setLoginErors(validation);
  }
  function handleChange(e) {
    setLoginValue({ ...loginValue, [e.target.name]: e.target.value });
  }

  return (
    <div class="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 w-full absolute top-0 z-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 class="text-2xl font-bold mb-6 text-center text-red-700">Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label
              for="email"
              class="block text-gray-700 text-sm font-bold mb-2"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={loginValue.email}
              onChange={handleChange}
              class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            ></input>
            {loginErors.email && (
              <span className="text-red-500 text-sm">{loginErors.email}</span>
            )}
          </div>
          <div>
            <labell
              for="password"
              class="block text-gray-700 text-sm font-bold mb-2"
            >
              {" "}
              Password:
            </labell>
            <input
              type="password"
              id="password"
              name="password"
              value={loginValue.password}
              onChange={handleChange}
              class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            ></input>
            {loginErors.password && (
              <span className="text-red-500 text-sm">
                {loginErors.password}
              </span>
            )}
          </div>

          <button
            type="submit"
            class="w-full bg-red-500 text-white py-3 rounded-md mt-5 hover:bg-red-700"
          >
            Login
          </button>
        </form>
        <p class="mt-4 text-center text-sm text-gray-600">
          Don't have an account?
          <Link to="/Sign" className="text-red-600 hover:underline">
            SignUp
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
