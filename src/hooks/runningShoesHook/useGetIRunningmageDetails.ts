import { useQuery } from "react-query";
import { GetRunningShoesImages } from "../../data/apiRunningShoes";

export default function useGetIRunningmageDetails(folderName) {
  const {
    isLoading,
    data: runningShoesImages,
    error,
  } = useQuery({
    queryKey: ["useGetImageDetails", folderName],
    queryFn: () => GetRunningShoesImages({ folderName }),
  });

  return { isLoading, runningShoesImages, error };
}
