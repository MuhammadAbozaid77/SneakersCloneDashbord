import { useMutation, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import { createJordanFolderImage } from "../../data/apiJordan";

interface UseAddNewImageProps {
  onClose: () => void;
}

interface MutateAddNewImagesToFolderArgs {
  folderName: string;
  productImages: FileList;
}

export default function useAddNewImage({ onClose }: UseAddNewImageProps) {
  const queryClient = useQueryClient();

  const {
    error,
    isLoading,
    mutate: mutateAddNewImagesToFolder,
  } = useMutation(
    ({ folderName, productImages }: MutateAddNewImagesToFolderArgs) =>
      createJordanFolderImage(folderName, productImages),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["jordansDetails"],
        });
        onClose();
        toast.success("Images Added Successfully");
      },
    }
  );

  return { mutateAddNewImagesToFolder, isLoading, error };
}
