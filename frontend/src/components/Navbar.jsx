import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addToken, addUser, removeUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import useCookie from "../hooks/useCookie";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const Navbar = () => {
  const user = useSelector((store) => store.user.user);
  const token = useCookie("token");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "user/logout", {}, { withCredentials: true });
      navigate("/login");
      dispatch(removeUser());
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUser = async () => {
    try {
      const response = await axios.get(BASE_URL + "user/userDetails", {
        withCredentials: true,
      });

      console.log("got user dispatch addUser");

      dispatch(addUser(response.data.data));
    } catch (error) {
      console.error(error);
      console.log("error occured while fetch user navigating to login");
      navigate("/login");
    }
  };

  useEffect(() => {
    if (!token) {
      console.log("token not found navigating to login");
      navigate("/login");
    } else {
      console.log("token  found fetch user and dispatch addToken");
      dispatch(addToken(token));
      fetchUser();
    }
  }, [token]);

  return (
    <nav className="flex justify-between min-w-[100vw] h-[8vh] shadow-md py-4 px-2">
      <p className="text-xl font-bold">Data Visualisation</p>

      {user && (
        <div className="relative flex gap-2 items-center mr-4 hover:cursor-pointer group">
          <span className="flex justify-center items-center min-w-8 min-h-8 text-white bg-accesntColor rounded-full">
            {user.name.split("")[0].toUpperCase()}
            {user.name.split("")[1].toUpperCase()}
          </span>
          <p className="text-lg font-semibold">{user.name}</p>

          <button
            onClick={handleLogout}
            className="absolute top-[100%] transition-colors duration-200 shadow-md hidden group-hover:block right-0 bg-white text-md p-2 hover:bg-gray-300 rounded-md"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
