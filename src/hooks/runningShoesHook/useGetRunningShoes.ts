import { useQuery } from "react-query";
import { getRunningShoesData } from "../../data/apiRunningShoes";

export default function useGetRunningShoes() {
  const {
    isLoading,
    data: runningshoesData,
    error,
  } = useQuery({
    queryKey: ["runningshoesData"],
    queryFn: getRunningShoesData,
  });
  return { isLoading, runningshoesData, error };
}
