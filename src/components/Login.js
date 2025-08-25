import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { GoogleLogin,GoogleOAuthProvider } from "@react-oauth/google";

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

  async function handlelogin() {
    try {
      seterrmsg(null);
      setLoading(true);
      if (!email.current.value || !password.current.value) {
        seterrmsg("Email and password are required.");
        setLoading(false);
        return;
      }
      const res = await axios.post("/api/login", {
        email: email.current.value,
        password: password.current.value,
      });
      console.log(res.data);
      // dispatch user and navigate
      navigate("/");
    } catch (err) {
      seterrmsg(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  async function handlesignin() {
    try {
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

      const res = await axios.post("/api/signup", {
        email: email.current.value,
        password: password.current.value,
        username: username.current.value,
        fullName: fullName.current.value,
        phoneno: phoneno.current.value,
      });
      console.log(res.data);
      navigate("/");
    } catch (err) {
      seterrmsg(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const token = credentialResponse.credential;
      const res = await axios.post("/api/google-login", { token });
      console.log("Google Login:", res.data);
      navigate("/");
    } catch (err) {
      seterrmsg(err.response?.data?.message || "Google login failed");
    }
  };

  const handleGoogleSignup = async (credentialResponse) => {
    const token = credentialResponse.credential;
    // STEP 1: ask extra info (password + phone)
    const password = prompt("Enter a password to use with your Google account:");
    const phoneno = prompt("Enter your phone number:");
    if (!password || !phoneno) {
      seterrmsg("Password and phone number are required for Google signup.");
      return;
    }

    try {
      const res = await axios.post("/api/google-signup", {
        token,
        password,
        phoneno,
      });
      console.log("Google Signup:", res.data);
      navigate("/");
    } catch (err) {
      seterrmsg(err.response?.data?.message || "Google signup failed");
    }
  };

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
                className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                type="text"
                ref={fullName}
                placeholder="John Doe"
              />
            </div>
          )}

          <div>
            <label className="text-sm font-medium text-gray-600">Email</label>
            <input
              className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
              type="email"
              ref={email}
              placeholder="you@example.com"
            />
          </div>

          {!islogin && (
            <>
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Username
                </label>
                <input
                  className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                  type="text"
                  ref={username}
                  placeholder="yourusername"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">
                  Contact Number
                </label>
                <input
                  className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                  type="tel"
                  ref={phoneno}
                  placeholder="1234567890"
                />
              </div>
            </>
          )}

          <div>
            <label className="text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
              type="password"
              ref={password}
              placeholder="••••••••"
            />
          </div>

          {errormsg && (
            <p className="text-red-600 bg-red-100 text-sm px-4 py-2 rounded-lg">
              {errormsg}
            </p>
          )}

          <button
            className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-500 transition duration-200"
            onClick={islogin ? handlelogin : handlesignin}
          >
            {isLoading ? "Loading..." : islogin ? "Log In" : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 space-y-3">
         <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}> {islogin ? <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => seterrmsg("Google login failed")}
          /> :
          <GoogleLogin
            onSuccess={handleGoogleSignup}
            onError={() => seterrmsg("Google signup failed")}
            text="signup_with"
          />}</GoogleOAuthProvider>
        </div>

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
