import { useQuery } from "react-query";
import { GetFootballShoesImages } from "../../data/apiFootballShoes";

type folderNameType = {
  folderName: string;
};
export default function useGetImageDetails(folderName: folderNameType) {
  const {
    isLoading: imagesLoading,
    data: footballShoesImages,
    error: imagesError,
  } = useQuery({
    queryKey: ["useGetImageDetails", folderName],
    queryFn: () => GetFootballShoesImages({ folderName }),
  });

  return { imagesLoading, footballShoesImages, imagesError };
}
