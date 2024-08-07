import ReactQueryProvider from "./ReactQueryProvider";
import { Toaster } from "react-hot-toast";
import RoutesProvider from "./RouterProvider";
import Navigations from "./Navigations";

export default function AppProvider() {
  return (
    <ReactQueryProvider>
      <Toaster position="top-center" reverseOrder={false} />
      <RoutesProvider>
        <Navigations />
      </RoutesProvider>
    </ReactQueryProvider>
  );
}
