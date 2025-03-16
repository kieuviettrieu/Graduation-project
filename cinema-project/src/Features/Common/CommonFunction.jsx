import { useNavigate } from "react-router-dom";
import { ACCOUNT_ROLE_STR, ROUTER_PATHS } from "./Constant";
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
    if (!isLogin) {
      redirectToPath(ROUTER_PATHS.LOGIN);
    } 
  }


 const isAdmin = () => {
  return user && (user.roles.includes(ACCOUNT_ROLE_STR.SUPER_ADMIN) || user.roles.includes(ACCOUNT_ROLE_STR.ADMIN_ROLE))
}

  return {
    redirectToPath,
    updateItems,
    checkPageLogin,
    isAdmin,
  };
};

export default useCommonFunctions;
