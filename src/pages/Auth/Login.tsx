import { useForm, SubmitHandler } from "react-hook-form";
import useLogin from "../../hooks/useLogin";
import FormSpinner from "../../components/ui/FormSpinner";
import logo from "./../../assets/logo.jpg";
import picc from "./../../assets/four.jpg";

type ValuesType = {
  userEmail: string;
  userPassword: string;
};

export default function Login() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ValuesType>();

  const { mutate, isLoading, error } = useLogin(); // Note: it's `mutate`, not `mutateLogin`

  const handelSubmitFun: SubmitHandler<ValuesType> = (values) => {
    mutate(values);
  };

  return (
    <>
      <div className="relative flex justify-center items-center h-[100vh] bg-gray-100">
        <div className="lg:flex justify-center items-center h-[100%] w-[100%] hidden">
          <img src={picc} alt="" className="h-[100%] w-[100%]" />
        </div>
        <div className="w-[100%] bg-black/90 h-[100%] flex justify-center items-center p-5">
          <form
            onSubmit={handleSubmit(handelSubmitFun)}
            className="relative z-10 md-h-[500px] h-auto md:w-[500px]  w-[100%] border shadow p-[30px] bg-white rounded-[10px]"
          >
            {error && (
              <div className="bg-red-500 p-2 text-white mb-[10px] rounded-[5px]">
                {error instanceof Error
                  ? error.message
                  : "An unknown error occurred"}
              </div>
            )}
            {isLoading && <FormSpinner />}

            <div className="flex justify-center items-center mb-[30px]">
              <img src={logo} alt="" className="w-[120px]" />
            </div>
            <div className="flex justify-center items-start flex-col mb-3">
              <label
                className="font-semibold text-gray-600"
                htmlFor="UserEmail"
              >
                User Email
              </label>
              <input
                className="border p-2 w-[100%] rounded-md text-gray-500 text-[18px]"
                type="email"
                id="UserEmail"
                {...register("userEmail", {
                  required: "This Email Is Required",
                })}
              />
              {errors.userEmail && (
                <span className="text-red-500">{errors.userEmail.message}</span>
              )}
            </div>
            <div className="flex justify-center items-start flex-col mb-3">
              <label
                className="font-semibold text-gray-600"
                htmlFor="UserPassword"
              >
                User Password
              </label>
              <input
                className="border p-2 w-[100%] rounded-md text-gray-500 text-[18px]"
                type="password"
                id="UserPassword"
                {...register("userPassword", {
                  required: "This Password Is Required",
                })}
              />
              {errors.userPassword && (
                <span className="text-red-500">
                  {errors.userPassword.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="border p-2 my-[20px] w-[100%] rounded-md text-white bg-black spinnerHoverColor duration-150 text-[18px]"
            >
              Login
            </button>
          </form>
        </div>
        {/* Content on top of the background image */}
      </div>
    </>
  );
}
