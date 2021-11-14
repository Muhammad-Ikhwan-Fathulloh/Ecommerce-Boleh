import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import Logo from "../assets/images/Sale.png";
import Logo2 from "../assets/images/logo2.png";
import axios from "axios";

function LoginPage() {
  const history = useHistory();
  const dataBase = "https://618f2ab250e24d0017ce1649.mockapi.io/api/boleh/user";

  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      history.push("/add");
    }
  }, []);
  const [data, setData] = useState({ email: "", password: "" });
  const [dataErrors, setDataErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  async function login() {
    const result = await result.json();
    localStorage.setItem("user-info", JSON.stringify(result));
    history.push("/");

    console.log(dataBase);
  }
  function submit(e) {
    e.preventDefault();
    setDataErrors(validate(data));
    setIsSubmit(true);

    axios
      .post(dataBase, { email: data.email, password: data.password })

      .then((res) => {
        console.log(res.data);
      });
  }

  useEffect(() => {
    console.log(dataErrors);
    if (Object.keys(dataErrors).length === 0 && isSubmit) {
      console.log(data);
    }
  }, [dataErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      errors.email = "Email harus diisi!";
    } else if (!regex.test(values.email)) {
      errors.email = "Masukkan email yang valid!";
    }

    if (!values.password) {
      errors.password = "Password harus diisi!";
    } else if (values.password.length < 8) {
      errors.password = "Password harus berisi minimal 8 karakter!";
    }
    return errors;
  };

  return (
    <div className="min-h-screen flex justify-around px-54 py-24 bg-gradient-to-r from-primary-100 to-gray-50">
      <div>
        <img
          className="max-w-2xl max-w-7xl mx-auto  mt-4 flex spa"
          src={Logo}
          alt="Logo"
        />
      </div>
      <div className="min-h-screen bg-white-100 flex flex-col">
        <div className="max-w-xl w-full mx-auto"></div>
        <div className="max-w-xl w-96 mx-auto mt-4 bg-white p-8 border border-gray-300 shadow-xl rounded-xl">
          <form onSubmit={(e) => submit(e)} className="space-y-6">
            <div class="h-14 w-14 mx-auto">
              <img src={Logo2} alt="Logo" />
            </div>

            <div className="text-3xl font-bold text-gray-900 mt-2 text-center">
              Login
            </div>

            <div>
              <label
                htmlFor=""
                className="text-sm font-bold text-gray-600 block"
              >
                Email
              </label>
              <input
                // onChange={(e) => handle(e)}
                value={data.email}
                id="email"
                name="email"
                type="text"
                className="w-full p-2 border border-gray-300 rounded mt-1"
                placeholder="Email address"
              />
            </div>

            <div className="text-red-600">
              <p>{dataErrors.email}</p>
            </div>

            <div>
              <label
                htmlFor=""
                className="text-sm font-bold text-gray-600 block"
              >
                Password
              </label>
              <input
                // onChange={(e) => handle(e)}
                value={data.password}
                id="password"
                name="password"
                type="password"
                className="w-full p-2 border border-gray-300 rounded mt-1"
                placeholder="Password"
              />
            </div>

            <div className="text-red-600">
              <p>{dataErrors.password}</p>
            </div>

            <div class="mb-4">
              <input
                className="mr-2 leading-tight"
                type="checkbox"
                id="checkbox_id"
              />
              <label className="text-sm" for="checkbox_id">
                Remember Me
              </label>
            </div>

            <div class="mb-6 text-center">
              <button
                onClick={login}
                className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                type="button"
              >
                Login
              </button>
            </div>

            <div className="text-center">
              <a
                className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                href="./forgot-password.html"
              >
                Forgot your Password?
              </a>
            </div>

            <div className="text-center flex justify-evenly">
              <p className="inline-block text-sm text-black-500 align-baseline">
                No have an account?
              </p>

              <Link
                className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                to="/register"
              >
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
