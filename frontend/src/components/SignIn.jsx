import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../redux/userSlice";
axios.defaults.withCredentials = true;

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const SignIn = () => {
  const [isSignInPage, setIsSignInPage] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const navigate = useNavigate();

  const user = useSelector((store) => store.user.user);

  const dispatch = useDispatch();

  const handleFormSubmit = async () => {
    try {
      if (isSignInPage) {
        const response = await axios.post(
          BASE_URL + "user/signup",
          {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
          },
          { withCredentials: true }
        );

        if (response.data.success) {
          dispatch(addUser(response.data.data));
          setErrorMessage("");
          navigate("/dashboard");
        }
      } else {
        const response = await axios.post(
          BASE_URL + "user/signin",
          {
            email: emailRef.current.value,
            password: passwordRef.current.value,
          },
          { withCredentials: true }
        );
        if (response.data.success) {
          dispatch(addUser(response.data.data));
          setErrorMessage("");
          navigate("/dashboard");
        }
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="flex justify-center items-center w-full h-[92vh]">
      <form
        className="flex flex-col gap-3 p-6 bg-white border-borderColor shadow-md rounded-md m-auto"
        onSubmit={(e) => e.preventDefault()}
      >
        <h3 className="text-center text-md font-semibold">
          {isSignInPage ? "Sign Up" : "Sign In"}
        </h3>
        {isSignInPage && (
          <input
            ref={nameRef}
            type="text"
            placeholder="Enter your Name"
            className="py-2 px-4 border border-borderColor rounded-md w-80"
          />
        )}
        <input
          ref={emailRef}
          type="email"
          placeholder="Enter your Email"
          className="py-2 px-4 border border-borderColor rounded-md w-80"
        />
        <input
          ref={passwordRef}
          type="password"
          placeholder="Enter your Password"
          className="py-2 px-4 border border-borderColor rounded-md w-80"
        />
        <p
          onClick={() => setIsSignInPage(!isSignInPage)}
          className="text-xs cursor-pointer"
        >
          {isSignInPage
            ? "Already have an Account? Sign In Now."
            : "Don't have an Account? Sign Up Now"}
        </p>

        {errorMessage && (
          <p className="text-xs text-red-500"> {errorMessage} </p>
        )}

        <button
          onClick={handleFormSubmit}
          type="submit"
          className="bg-accesntColor mt-3 py-2 px-3 self-center hover:bg-white hover:text-textColor border-2 border-accesntColor transition-colors duration-200 text-white rounded-md w-fit"
        >
          {isSignInPage ? "Sign Up" : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default SignIn;
