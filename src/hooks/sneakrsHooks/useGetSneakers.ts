import { useQuery } from "react-query";
import { getSneakrsData } from "../../data/apiSneakrs";

export default function useGetSneakers() {
  const {
    isLoading,
    data: sneakersData,
    error,
  } = useQuery({
    queryKey: ["sneakers"],
    queryFn: getSneakrsData,
  });
  return { isLoading, sneakersData, error };
}
