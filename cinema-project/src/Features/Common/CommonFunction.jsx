import { useNavigate } from "react-router-dom";

const useCommonFunctions = () => {
  const navigate = useNavigate();

  const redirectToPath = (path) => {
    navigate(path);
  };

  const updateItems = (array, pageSize, currentPage, totalItems) => {
    const totalFakeItems = totalItems;
    const fakeData = Array.from({ length: totalFakeItems }, (_, index) => ({
      key: `fake-${index + 1}`,
      name: `User ${index + 1}`,
      age: 25 + (index % 10),
      address: `Address ${index + 1}`,
      tags: [index % 2 === 0 ? "developer" : "designer"],
    }));
  
    const fullData = [...fakeData];
    console.log(fullData, "fake");
    const startIndex = (currentPage - 1) * pageSize;
    array.forEach((item, index) => {
      fullData[startIndex + index] = item; 
    });
    
    return fullData;
  }

  return {
    redirectToPath, updateItems
  };
};

export default useCommonFunctions;
