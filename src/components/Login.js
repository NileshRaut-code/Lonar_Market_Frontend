import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Loginuser, Signupuser } from "../utils/userutils";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const phoneno = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const username = useRef(null);
  const fullName = useRef(null);
  const [errormsg, seterrmsg] = useState(false);
  const [islogin, setlogin] = useState(true);
  const [isLoading, setLoading] = useState(false);

  function handlelogin() {
    seterrmsg(null);
    setLoading(true);
    if (!email.current.value || !password.current.value) {
      seterrmsg("Email and password are required.");
      setLoading(false);
      return;
    }
    Loginuser(dispatch, navigate, seterrmsg, email, password, setLoading);
  }

  function handlesignin() {
    seterrmsg(null);
    setLoading(true);
    if (
      !email.current.value ||
      !password.current.value ||
      !fullName.current.value ||
      !username.current.value ||
      !phoneno.current.value
    ) {
      seterrmsg("All fields are required.");
      setLoading(false);
      return;
    }

    const phoneNoValue = phoneno.current.value;
    if (phoneNoValue && !/^\d+$/.test(phoneNoValue)) {
      seterrmsg("Phone number should only contain digits.");
      setLoading(false);
      return;
    }

    const requestBody = {
      email: email?.current?.value,
      password: password?.current?.value,
      username: username?.current?.value,
      fullName: fullName?.current?.value,
      phoneno: phoneno?.current.value,
    };
    const body = JSON.stringify(requestBody);
    Signupuser(dispatch, navigate, seterrmsg, body, setLoading);
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-white to-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          {islogin ? "Welcome Back!" : "Create an Account"}
        </h2>
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          {!islogin && (
            <div>
              <label className="text-sm font-medium text-gray-600">
                Full Name
              </label>
              <input
                className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                type="text"
                ref={fullName}
                placeholder="John Doe"
              />
            </div>
          )}

          <div>
            <label className="text-sm font-medium text-gray-600">Email</label>
            <input
              className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              type="email"
              ref={email}
              placeholder="you@example.com"
            />
          </div>

          {!islogin && (
            <div>
              <label className="text-sm font-medium text-gray-600">
                Username
              </label>
              <input
                className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                type="text"
                ref={username}
                placeholder="yourusername"
              />
            </div>
          )}

          {!islogin && (
            <div>
              <label className="text-sm font-medium text-gray-600">
                Contact Number
              </label>
              <input
                className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                type="tel"
                ref={phoneno}
                placeholder="1234567890"
              />
            </div>
          )}

          <div>
            <label className="text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              type="password"
              ref={password}
              placeholder="••••••••"
            />
          </div>

          {islogin && (
            <div className="text-right">
              <Link
                to="/forget-password"
                className="text-sm text-indigo-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          )}

          {errormsg && (
            <p className="text-red-600 bg-red-100 text-sm px-4 py-2 rounded-lg">
              {errormsg}
            </p>
          )}

          <button
            className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-500 transition duration-200"
            onClick={islogin ? handlelogin : handlesignin}
          >
            {isLoading ? (
              <div className="flex justify-center">
                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
              </div>
            ) : islogin ? (
              "Log In"
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          {islogin ? (
            <>
              Don’t have an account?{" "}
              <span
                onClick={() => {
                  setlogin(false);
                  seterrmsg(null);
                }}
                className="text-indigo-600 font-medium cursor-pointer hover:underline"
              >
                Sign Up
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                onClick={() => {
                  setlogin(true);
                  seterrmsg(null);
                }}
                className="text-indigo-600 font-medium cursor-pointer hover:underline"
              >
                Log In
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
