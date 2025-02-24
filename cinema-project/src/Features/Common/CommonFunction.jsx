import { useNavigate } from "react-router-dom";
import { ROUTER_PATHS } from "./Constant";
import { useSelector } from 'react-redux';

const useCommonFunctions = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const redirectToPath = (path) => {
    navigate(path);
  };

  const updateItems = (array, pageSize, currentPage, totalItems) => {
    const totalFakeItems = totalItems;
    const keys =
      array.length > 0
        ? Object.keys(array[0])
        : ["key", "name", "age", "address", "tags"];

    const fakeData = Array.from({ length: totalFakeItems }, (_, index) => {
      return keys.reduce((obj, key) => {
        obj[key] = key === "key" ? `fake-${index + 1}` : `Data ${index + 1}`;
        return obj;
      }, {});
    });

    const fullData = [...fakeData];
    const startIndex = (currentPage - 1) * pageSize;
    array.forEach((item, index) => {
      fullData[startIndex + index] = item;
    });

    return fullData;
  };

  const checkPageLogin = () => {
    const isLogin = isAuthenticated || user;
    console.log(isLogin, "isLogin");
    if (!isLogin) {
      redirectToPath(ROUTER_PATHS.LOGIN);
    } 
  }

  return {
    redirectToPath,
    updateItems,
    checkPageLogin,
  };
};

export default useCommonFunctions;
