import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import { deleteImageFromFolder, DeleteImageFromFolderParams } from "../../data/apiRunningShoes";

interface UseDeleteAnImageProps {
  onClose: () => void;
}

export default function useDeleteAnImage({ onClose }: UseDeleteAnImageProps) {
  const queryClient = useQueryClient();

  const {
    error,
    isLoading,
    mutate: mutateDeleteRunningShoesImage,
  } = useMutation<void, Error, DeleteImageFromFolderParams>({
    mutationFn: deleteImageFromFolder,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["runningshoesDetails"],
      });
      onClose();
      toast.success("RunningShoes image deleted successfully");
    },
  });

  return { mutateDeleteRunningShoesImage, isLoading, error };
}
