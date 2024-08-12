import { useQuery } from "react-query";
import { getJordanDetails } from "../../data/apiJordan";

export default function useGetJordansDetails(folderName, id) {
  const {
    isLoading,
    data: jordansDetails,
    error,
  } = useQuery(["jordansDetails", folderName, id], () =>
    getJordanDetails(folderName, id)
  );

  return { isLoading, jordansDetails, error };
}
