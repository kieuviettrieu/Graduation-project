import { useNavigate } from "react-router-dom";

const useCommonFunctions = () => {
  const navigate = useNavigate();

  const redirectToPath = (path) => {
    navigate(path);
  };

  return {
    redirectToPath,
  };
};

export default useCommonFunctions;
