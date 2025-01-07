import { useEffect } from "react";
import useQuery from "../hooks/useQuery";
import BarAndLineChart from "./BarAndLineChart";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addDataSet } from "../redux/dataSetSlice";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const SharedDashboard = () => {
  const navigate = useNavigate();
  const dataSet = useSelector((store) => store.dataSet);
  const dispatch = useDispatch();
  const query = useQuery();
  const age = query.get("age");
  const gender = query.get("gender");
  const startdate = query.get("startdate");
  const enddate = query.get("enddate");

  const filterOption = {
    age: age,
    gender: gender,
    startdate: startdate || "",
    enddate: enddate || "",
  };

  console.log(age, gender, startdate, enddate);

  const fetchData = async () => {
    try {
      const response = await axios.get(BASE_URL + "data", {
        withCredentials: true,
      });

      dispatch(addDataSet(response.data.data));
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.message == "Token Invalid") {
        navigate(`/login`);
        // axios.post(BASE_URL + "/logout");
      }
    }
  };

  useEffect(() => {
    if (!dataSet) {
      fetchData();
    }
  }, []);

  return (
    dataSet && (
      <div className="max-w-[800px] mx-auto">
        <BarAndLineChart
          isSharedDashboard={true}
          data={dataSet}
          filterOption={filterOption}
        />
      </div>
    )
  );
};

export default SharedDashboard;
