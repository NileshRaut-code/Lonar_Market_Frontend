import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
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
      seterrmsg("All Fields are required.");
      setLoading(false);
      return;
    }

    // Validate phone number (allow only digits)
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
    <div className="flex flex-col min-h-[70vh] pb-10 bg-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-semibold text-gray-800">
          {islogin ? "Log in" : "Sign up"} to your account
        </h2>
      </div>
      <div className="p-5 mx-auto w-full max-w-sm">
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          {!islogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div>
                <input
                  className="bg-white block p-3 w-full rounded-md border border-gray-300 text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                  type="text"
                  ref={fullName}
                  placeholder="Full Name"
                />
              </div>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div>
              <input
                className="bg-white block p-3 w-full rounded-md border border-gray-300 text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                type="text"
                ref={email}
                placeholder="Email"
              />
            </div>
          </div>
          {!islogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                UserName
              </label>
              <div>
                <input
                  className="bg-white block p-3 w-full rounded-md border border-gray-300 text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                  type="text"
                  ref={username}
                  placeholder="Username"
                />
              </div>
            </div>
          )}
          {!islogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Contact No
              </label>
              <div>
                <input
                  className="bg-white block p-3 w-full rounded-md border border-gray-300 text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                  type="number"
                  ref={phoneno}
                  placeholder="Contact No"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div>
              <input
                className="bg-white block p-3 w-full rounded-md border border-gray-300 text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                type="password"
                ref={password}
                placeholder="Password"
              />
            </div>
          </div>
          {errormsg && (
            <p
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
              role="alert"
            >
              {errormsg}
            </p>
          )}
          <button
            className="cursor-pointer flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-600"
            onClick={islogin ? handlelogin : handlesignin}
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
            ) : islogin ? (
              "Log In"
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
        <p
          className="cursor-pointer font-semibold text-indigo-600 hover:text-indigo-500"
          onClick={(e) => {
            setlogin(!islogin);
            seterrmsg(null);
          }}
        >
          {!islogin
            ? "If you already have an account? Log In"
            : "If you don't have an account? Sign Up"}
        </p>
      </div>
    </div>
  );
};

export default Login;
