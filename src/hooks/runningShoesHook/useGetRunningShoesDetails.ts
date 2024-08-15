import { useQuery } from "react-query";
import { getRunningShoesDetails } from "../../data/apiRunningShoes";

export default function useGetRunningShoesDetails(
  folderName: string,
  id: string
) {
  const {
    isLoading,
    data: runningshoesDetails,
    error,
  } = useQuery(["runningshoesDetails", folderName, id], () =>
    getRunningShoesDetails(folderName, id)
  );

  return { isLoading, runningshoesDetails, error };
}
