import { useQuery } from "react-query";
import { getFootballShoesDetails } from "../../data/apiFootballShoes";

export default function useGetFootballShoesDetails(
  folderName: string,
  id: string
) {
  const {
    isLoading,
    data: footballShoesDetails,
    error,
  } = useQuery(["footballshoesDetails", folderName, id], () =>
    getFootballShoesDetails(folderName, id)
  );

  return { isLoading, footballShoesDetails, error };
}
