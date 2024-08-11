import { useQuery } from "react-query";
import { getJordanData } from "../../data/apiJordan";

export default function useGetJordan() {
  const {
    isLoading,
    data: jordansData,
    error,
  } = useQuery({
    queryKey: ["jordans"],
    queryFn: getJordanData,
  });
  return { isLoading, jordansData, error };
}
