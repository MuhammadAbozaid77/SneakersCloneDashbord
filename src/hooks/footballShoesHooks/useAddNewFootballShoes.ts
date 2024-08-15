import { useMutation, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import { addNewFootballShoesItem } from "../../data/apiFootballShoes";

// Define the props type for the hook
interface UseAddNewFootballShoesProps {
  onClose: () => void;
}

export default function useAddNewFootballShoes({
  onClose,
}: UseAddNewFootballShoesProps) {
  const queryClient = useQueryClient();

  const {
    error,
    isLoading,
    mutate: mutateAddNewFootballShoes,
  } = useMutation({
    mutationFn: addNewFootballShoesItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["footballshoesData"],
      });
      onClose();
      toast.success("New Football Shoes Added Successfully");
    },
  });

  return { mutateAddNewFootballShoes, isLoading, error };
}
