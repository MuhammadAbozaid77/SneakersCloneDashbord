import { useQuery } from "react-query";
import { getFootballShoesData } from "../../data/apiFootballShoes";

export default function useGetFootballShoes() {
  const {
    isLoading,
    data: footballshoesData,
    error,
  } = useQuery({
    queryKey: ["footballshoesData"],
    queryFn: getFootballShoesData,
  });
  return { isLoading, footballshoesData, error };
}
