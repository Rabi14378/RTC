import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useInput from "@/Hooks/useInput";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { useAuth } from "@/context/authContext";
import axios from "axios";
export default function SignIn() {
  const {
    value: enteredEmail,
    valueIsValid: emailIsValid,
    hasError: emailHasError,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredPassword,
    valueIsValid: passwordIsValid,
    hasError: passwordHasError,
    inputChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput((value) => value.trim() !== "");
  const { login } = useAuth();
  const [error, setError] = useState(null);

  let formIsValid = false;
  if (emailIsValid && passwordIsValid) formIsValid = true;
  const submitHandler = async (event) => {
    event.preventDefault();
    if (!formIsValid) return;

    const signInData = {
      email: enteredEmail,
      password: enteredPassword,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        signInData,
        { headers: { "Content-Type": "application/json" } }
      );

      login(response);
      resetEmail("");
      resetPassword("");
    } catch (error) {}
  };
  const googleSignInHandler = () => {
    console.log("sign in with google");
  };
  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen">
      <div className="text-center md:text-left md:w-1/2 md:pr-8">
        <h1 className="text-red-400 text-4xl font-bold">Let's Chat</h1>
        <p className="text-gray-700 text-lg mt-2">
          Let's remove the distance between us by Chatting!! on Let's Chat.
        </p>
      </div>
      <form
        onSubmit={submitHandler}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm space-y-6">
        <Input
          type="text"
          id="email"
          placeholder="Enter your email"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={enteredEmail}
          className={`w-full p-3  border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-100  
            ${
              emailHasError
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
        />
        {emailHasError && (
          <p className="text-red-500 text-sm mt-2">
            Please enter a valid email
          </p>
        )}

        <Input
          type="password"
          id="password"
          placeholder="Enter your password"
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
          value={enteredPassword}
          className={`w-full p-3 border rounded-md text-gray-800 focus:outline-none focus:ring-2
            ${
              passwordHasError
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
        />
        {passwordHasError && (
          <p className="text-red-500 text-sm mt-2">
            Please enter a valid password
          </p>
        )}

        <Button className="w-full p-3 bg-blue-600 text-white font-semibold text-lg rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          Sign In
        </Button>
        <p className="text-center mt-2">
          don't have an account?
          <Link to="/signup" className="text-blue-500 hover-underline">
            Create one!
          </Link>
        </p>
        <div className="flex items-center gap-2">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="text-gray-500 text-sm">or</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>
        <Button
          onClick={googleSignInHandler}
          className="w-full py-3 flex bg-gray-200 items-center justify-center gap-3 border border-gray-300 text-gray-700 font-semibold text-lg rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50">
          <FcGoogle size={24} /> Sign in with Google
        </Button>
      </form>
    </div>
  );
}
