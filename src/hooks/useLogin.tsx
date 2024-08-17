import { useMutation, UseMutationResult } from "react-query";
import { loginFunction, LoginArgs } from "../data/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// Define the expected response and error types
export interface LoginResponse {
  accessToken: string;
}

export interface LoginError {
  message: string;
}

export default function useLogin(): UseMutationResult<
  LoginResponse,
  LoginError,
  LoginArgs
> {
  const navigate = useNavigate();

  const mutation = useMutation<LoginResponse, LoginError, LoginArgs>({
    mutationFn: async (args) => {
      const user = await loginFunction(args);
      if (user) {
        // Assuming you have a method to generate an access token
        const accessToken = "yourAccessTokenGenerationLogic";
        return { accessToken };
      }
      throw new Error("Invalid user data");
    },
    onSuccess: (data: LoginResponse) => {
      localStorage.setItem("userToken", data.accessToken);
      toast.success("Logged in Successfully");
      navigate("/home");
    },
    onError: (error: LoginError) => {
      toast.error(error.message);
    },
  });

  return mutation;
}
