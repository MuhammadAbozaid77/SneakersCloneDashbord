import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./AppLayout";
import Home from "../pages/Home";
import Jordan from "../pages/Jordan/Jordan";
import Sneakrs from "../pages/Sneakrs/Sneakrs";
import RunningShoes from "../pages/RunningShoes/RunningShoes";
import FootballShoes from "../pages/FootballShoes/FootballShoes";
import Profile from "../pages/Profile/Profile";
import Login from "../pages/Auth/Login";
import PageNotFound from "../components/ui/PageNotFound";
// import PageNotFound from "../components/ui/PageNotFound";

export default function Navigations() {
  return (
    <>
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route element={<AppLayout />}>
          <Route index element={<Navigate replace to="home" />} />
          <Route path="home" element={<Home />} />
          <Route path="jordan" element={<Jordan />} />
          <Route path="sneakrs" element={<Sneakrs />} />
          <Route path="runningShoes" element={<RunningShoes />} />
          <Route path="footballShoes" element={<FootballShoes />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="login" element={<Login />} />
      </Routes>
    </>
  );
}
