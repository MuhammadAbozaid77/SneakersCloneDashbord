import { useQuery } from "react-query";
import { getFootballShoesDetails } from "../../data/apiFootballShoes";

export default function useGetFootballShoesDetails(folderName, id) {
  const {
    isLoading,
    data: footballShoesDetails,
    error,
  } = useQuery(["footballShoesDetails", folderName, id], () =>
    getFootballShoesDetails(folderName, id)
  );

  return { isLoading, footballShoesDetails, error };
}
