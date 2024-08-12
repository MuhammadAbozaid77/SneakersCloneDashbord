import { useQuery } from "react-query";
import { GetJordanImages } from "../../data/apiJordan";

type folderNameType = {
  folderName: string;
};
export default function useGetImageDetails(folderName: folderNameType) {
  const {
    isLoading: imagesLoading,
    data: jordansImages,
    error: imagesError,
  } = useQuery({
    queryKey: ["useGetImageDetails", folderName],
    queryFn: () => GetJordanImages({ folderName }),
  });

  return { imagesLoading, jordansImages, imagesError };
}
