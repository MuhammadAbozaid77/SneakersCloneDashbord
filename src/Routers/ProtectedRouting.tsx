import { Navigate } from "react-router-dom";
type propsType = {
  children: React.ReactNode;
};

export default function ProtectedRouting({ children }: propsType) {
  const userToken = "ttt";
  // const userToken = localStorage.getItem("userToken");
  if (userToken) {
    return children;
  } else {
    return <Navigate to={"login"} />;
  }
}
