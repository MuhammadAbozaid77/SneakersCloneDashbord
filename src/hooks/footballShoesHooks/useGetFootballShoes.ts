import { useQuery } from "react-query";
import { getFootballShoesData } from "../../data/apiFootballShoes";

export default function useGetFootballShoes() {
  const {
    isLoading,
    data: footballShoesData,
    error,
  } = useQuery({
    queryKey: ["footballShoes"],
    queryFn: getFootballShoesData,
  });
  return { isLoading, footballShoesData, error };
}
