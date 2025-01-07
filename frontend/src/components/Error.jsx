import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-[90vh] w-full flex justify-center items-center">
      <h1 className="text-xl font-bold text-textColor">404 Page Not Found</h1>
      <button
        onClick={() => {
          navigate("/dashboard");
        }}
        className="py-1  px-2 bg-accesntColor border-2 border-accesntColor hover:bg-white hover:text-textColor text-white font-semibold w-fit rounded-md transition-colors duration-200 "
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default Error;
