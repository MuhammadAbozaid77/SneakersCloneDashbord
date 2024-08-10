import { useMutation } from "react-query";
import { logoutFunction } from "../data/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useLogout() {
  const navigate = useNavigate();
  const { mutate: mutateLogout } = useMutation({
    mutationFn: logoutFunction,
    onSuccess: () => {
      localStorage.removeItem("userToken");
      toast.success("Logout Successfuly");
      navigate("/login");
    },
  });
  return { mutateLogout };
}
