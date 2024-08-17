// src/hooks/useLogin.tsx

import { useMutation } from "react-query";
import { loginFunction } from "../data/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// Define the expected response and error types
export interface LoginResponse {
  accessToken: string;
}

export interface LoginError {
  message: string;
}

export default function useLogin() {
  const navigate = useNavigate();

  const mutation = useMutation<
    LoginResponse,
    LoginError,
    { userEmail: string; userPassword: string }
  >({
    mutationFn: loginFunction,
    onSuccess: (data: LoginResponse) => {
      // Save the accessToken to localStorage
      localStorage.setItem("userToken", data.accessToken);
      toast.success("Logged in Successfully");
      navigate("/home");
    },
    onError: (error: LoginError) => {
      // Ensure the error is of type LoginError before accessing its properties
      toast.error(error.message);
    },
  });

  return {
    mutateLogin: mutation.mutate,
    isLoading: mutation.isLoading,
    error: mutation.error,
  };
}
