import { useQuery } from "react-query";
import { getRunningShoesData } from "../../data/apiRunningShoes";

export default function useGetRunningShoes() {
  const {
    isLoading,
    data: runningShoesData,
    error,
  } = useQuery({
    queryKey: ["sneakers"],
    queryFn: getRunningShoesData,
  });
  return { isLoading, runningShoesData, error };
}
