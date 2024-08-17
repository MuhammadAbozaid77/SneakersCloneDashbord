import toast from "react-hot-toast";
import {
  deleteImageFromFolder,
  DeleteImageFromFolderParams,
} from "../../data/apiJordan";
import { useMutation, useQueryClient } from "react-query";

interface UseDeleteAnImageProps {
  onClose: () => void;
}

export default function useDeleteAnImage({ onClose }: UseDeleteAnImageProps) {
  const queryClient = useQueryClient();

  const {
    error,
    isLoading,
    mutate: mutateDeleteJordanImage,
  } = useMutation<void, Error, DeleteImageFromFolderParams>({
    mutationFn: deleteImageFromFolder,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["jordansDetails"],
      });
      onClose();
      toast.success("Jordan image deleted successfully");
    },
  });

  return { mutateDeleteJordanImage, isLoading, error };
}
