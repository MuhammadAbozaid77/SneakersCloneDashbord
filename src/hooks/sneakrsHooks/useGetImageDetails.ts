import { useQuery } from "react-query";
import { GetSneakrsImages } from "../../data/apiSneakrs";

export default function useGetImageDetails(folderName) {
  const {
    isLoading,
    data: SneakersImages,
    error,
  } = useQuery({
    queryKey: ["useGetImageDetails", folderName],
    queryFn: () => GetSneakrsImages({ folderName }),
  });

  return { isLoading, SneakersImages, error };
}
