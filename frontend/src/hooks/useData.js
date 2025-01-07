import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addDataSet } from "../redux/dataSetSlice";
import { useNavigate } from "react-router-dom";

const useData = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(BASE_URL + "data", {
          withCredentials: true,
        });
        console.log("got data dispatch Add Data");
        setData(response.data.data);
        dispatch(addDataSet(response.data.data));
      } catch (error) {
        console.log(error);
        console.log("got error");
        if (error?.response?.data?.message == "Invalid Token") {
          console.log("invalid token error navigate login");
          navigate("/login");
        }
      }
    };

    fetchData();
  }, [BASE_URL, dispatch, navigate]);

  return data;
};

export default useData;
