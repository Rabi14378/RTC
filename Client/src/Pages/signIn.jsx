import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useInput from "@/Hooks/useInput";
import { Label } from "@radix-ui/react-label";
import { FcGoogle } from "react-icons/fc";

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

  let formIsValid = false;
  if (emailIsValid && passwordIsValid) formIsValid = true;
  const submitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) return;
    const signInData = {
      email: enteredEmail,
      password: enteredPassword,
    };
    console.log(signInData);
    resetEmail("");
    resetPassword("");
  };
  const googleSignInHandler = () => {
    console.log("sign in with google");
  };
  return (
    <form
      onSubmit={submitHandler}
      className="w-full max-w-sm mx-auto bg-white shadow-lg rounded-2xl p-8 flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-center text-gray-800">Sign In</h2>
      <div className="flex flex-col">
        <Label
          htmlFor="email"
          className="text-gray-700 text-lg font-semibold mb-2">
          Email
        </Label>
        <Input
          type="text"
          id="email"
          placeholder="Enter your email"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={enteredEmail}
          className={`w-full px-4 py-3 border rounded-md text-gray-800 focus:outline-none focus:ring-2 transition-all duration-300 
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
      </div>
      <div className="flex flex-col">
        <Label
          htmlFor="password"
          className="text-gray-700 text-lg font-semibold mb-2">
          Password
        </Label>
        <Input
          type="password"
          id="password"
          placeholder="Enter your password"
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
          value={enteredPassword}
          className={`w-full px-4 py-3 border rounded-md text-gray-800 focus:outline-none focus:ring-2 transition-all duration-300 
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
      </div>
      <div className="mt-6 flex flex-col gap-4">
        <Button className="w-full py-3 bg-blue-600 text-white font-semibold text-lg rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          Sign In
        </Button>
        <div className="flex items-center gap-2">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="text-gray-500 text-sm">or</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>
        <Button
          onClick={googleSignInHandler}
          className="w-full py-3 flex items-center justify-center gap-3 border border-gray-300 text-gray-700 font-semibold text-lg rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50">
          <FcGoogle size={24} /> Sign in with Google
        </Button>
      </div>
    </form>
  );
}
