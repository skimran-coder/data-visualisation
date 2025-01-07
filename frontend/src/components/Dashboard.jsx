import BarAndLineChart from "./BarAndLineChart";
import useData from "../hooks/useData";

const Dashboard = () => {
  const dataSet = useData();
  console.log(dataSet);

  if (!dataSet || dataSet.length === 0)
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
