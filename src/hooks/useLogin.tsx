import { useMutation } from "react-query";
import { loginFunction } from "../data/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface LoginResponse {
  accessToken: string;
}

export default function useLogin() {
  const navigate = useNavigate();

  const {
    error,
    isLoading,
    mutate: mutateLogin,
  } = useMutation<LoginResponse, Error>({
    mutationFn: loginFunction,
    onSuccess: (data) => {
      localStorage.setItem("userToken", data.accessToken);
      toast.success("Logged in Successfully");
      navigate("/home");
    },
  });

  return { mutateLogin, isLoading, error };
}
