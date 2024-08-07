import { HashRouter } from "react-router-dom";

export default function RoutesProvider({ children }) {
  return <HashRouter hashType="hashbang">{children}</HashRouter>;
}
