import { useQuery } from "react-query";
import { getSneakersDetails } from "../../data/apiSneakrs";

export default function useGetSneakersDetails(folderName: string, id: string) {
  const {
    isLoading,
    data: sneakersDetails,
    error,
  } = useQuery(["sneakersDetails", folderName, id], () =>
    getSneakersDetails(folderName, id)
  );

  return { isLoading, sneakersDetails, error };
}
