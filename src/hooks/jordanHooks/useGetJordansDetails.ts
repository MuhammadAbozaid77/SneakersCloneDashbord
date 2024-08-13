import { useQuery } from "react-query";
import { getJordanDetails } from "../../data/apiJordan";

export default function useGetJordansDetails(folderName: string, id: string) {
  const {
    isLoading,
    data: jordansDetails,
    error,
  } = useQuery(["jordansDetails", folderName, id], () =>
    getJordanDetails(folderName, id)
  );

  return { isLoading, jordansDetails, error };
}
