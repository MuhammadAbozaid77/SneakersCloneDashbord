import { useQuery } from "react-query";
import { getSneakersData } from "../../data/apiSneakrs";

export default function useGetSneakers() {
  const {
    isLoading,
    data: sneakersData,
    error,
  } = useQuery({
    queryKey: ["sneakersData"],
    queryFn: getSneakersData,
  });
  return { isLoading, sneakersData, error };
}
