import { useQuery } from "react-query";
import { GetJordanImages } from "../../data/apiJordan";

export default function useGetImageDetails(folderName) {
  const {
    isLoading,
    data: jordansImages,
    error,
  } = useQuery({
    queryKey: ["useGetImageDetails", folderName],
    queryFn: () => GetJordanImages({ folderName }),
  });

  return { isLoading, jordansImages, error };
}
