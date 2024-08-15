import { HashRouter } from "react-router-dom";

type propsType = {
  children: React.ReactNode;
};
export default function RoutesProvider({ children }: propsType) {
  return <HashRouter>{children}</HashRouter>;
}

// return <HashRouter hashType="hashbang">{children}</HashRouter>;
