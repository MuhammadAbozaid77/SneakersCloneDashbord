import toast from "react-hot-toast";
import { deleteImageFromFolder } from "../../data/apiJordan";
import { useMutation, useQueryClient } from "react-query";

export default function useDeleteAnImage() {
  const queryClient = useQueryClient();

  const {
    error,
    isLoading,
    mutate: mutateDeleteJordanImage,
  } = useMutation({
    mutationFn: deleteImageFromFolder,
    onSuccess: () => {
      toast.success("Jordan image deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["jordan"],
      });
    },
  });

  return { mutateDeleteJordanImage, isLoading, error };
}
