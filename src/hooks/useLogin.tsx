import { useMutation } from "react-query";
import { loginFunction } from "../data/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useLogin() {
  const navigate = useNavigate();
  const {
    error,
    isLoading,
    mutate: mutateLogin,
  } = useMutation({
    mutationFn: loginFunction,
    onSuccess: (data) => {
      localStorage.setItem("userToken", data?.accessToken);
      toast.success("Logging Successfuly");
      navigate("/home");
    },
  });

  return { mutateLogin, isLoading, error };
}
