import { useMutation } from "react-query";
import toast from "react-hot-toast";
import { addNewRunningShoesItem } from "../../data/apiRunningShoes";

export default function useAddNewRunningShoes({ onClose }) {
  const {
    error,
    isLoading,
    mutate: mutateAddNewRunningShoes,
  } = useMutation({
    mutationFn: addNewRunningShoesItem,
    onSuccess: () => {
      toast.success("New Jordan Added Successfuly");
      onClose();
    },
  });

  return { mutateAddNewRunningShoes, isLoading, error };
}
