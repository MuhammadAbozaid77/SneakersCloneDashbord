import { useMutation, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import { addNewFootballShoesItem } from "../../data/apiFootballShoes";

export default function useAddNewFootballShoes({ onClose }) {
  const queryClient = useQueryClient();

  const {
    error,
    isLoading,
    mutate: mutateAddNewFootballShoes,
  } = useMutation({
    mutationFn: addNewFootballShoesItem,
    onSuccess: () => {
      toast.success("New Football Shoes Added Successfuly");
      queryClient.invalidateQueries({
        queryKey: ["footballShoes"],
      });
      onClose();
    },
  });

  return { mutateAddNewFootballShoes, isLoading, error };
}
