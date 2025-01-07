import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addDataSet } from "../redux/dataSetSlice";
import BarAndLineChart from "./BarAndLineChart";
import { useNavigate } from "react-router-dom";
import useCookie from "../hooks/useCookie";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const Dashboard = () => {
  const navigate = useNavigate();
  const token = useCookie("token");

  const dispatch = useDispatch();

  const dataSet = useSelector((store) => store.dataSet);

  const user = useSelector((store) => store.user.user);

  const fetchData = async () => {
    try {
      const response = await axios.get(BASE_URL + "data", {
        withCredentials: true,
      });

      console.log("got data dispatch Add Data");

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

  useEffect(() => {
    if (!user) {
      console.log("useEff user not found navigating to login");
      navigate("/login");
    } else if (!dataSet) {
      console.log("user  found fetching data");
      fetchData();
    }
  }, []);

  if (!dataSet)
    return (
      <div className="flex justify-center items-center w-full min-h-[92vh]">
        <div className="h-12 w-12 rounded-full border-[4px] border-r-gray-500 animate-spin "></div>
      </div>
    );

  return (
    dataSet && (
      <div className="max-w-[800px] mx-auto">
        <BarAndLineChart data={dataSet} />
      </div>
    )
  );
};

export default Dashboard;
