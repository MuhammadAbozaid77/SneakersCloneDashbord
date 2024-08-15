import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./AppLayout";
import Home from "../pages/Dashbord/Home";
import Jordan from "../pages/Jordan/Jordan";
import Sneakrs from "../pages/Sneakrs/Sneakrs";
import RunningShoes from "../pages/RunningShoes/RunningShoes";
import FootballShoes from "../pages/FootballShoes/FootballShoes";
import Profile from "../pages/Profile/Profile";
import Login from "../pages/Auth/Login";
import PageNotFound from "../components/ui/PageNotFound";
import ProtectedRouting from "./ProtectedRouting";
import JordanDetails from "../pages/Jordan/JordanDetails";
import FootballShoesDetails from "../pages/FootballShoes/FootballShoesDetails";
import SneakersDetails from "../pages/Sneakrs/SneakersDetails";
import RunningShoesDetails from "../pages/RunningShoes/RunningShoesDetails";
// import PageNotFound from "../components/ui/PageNotFound";

export default function Navigations() {
  return (
    <>
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route
          element={
            <ProtectedRouting>
              <AppLayout />
            </ProtectedRouting>
          }
        >
          <Route index element={<Navigate replace to="home" />} />
          <Route path="home" element={<Home />} />
          <Route path="jordan" element={<Jordan />} />
          <Route
            path="jordan/jordandetails/:id/:folderName"
            element={<JordanDetails />}
          />
          <Route path="sneakrs" element={<Sneakrs />} />
          <Route
            path="sneakers/sneakersdetails/:id/:folderName"
            element={<SneakersDetails />}
          />
          <Route path="runningShoes" element={<RunningShoes />} />
          <Route
            path="runningShoes/runningShoesdetails/:id/:folderName"
            element={<RunningShoesDetails />}
          />
          <Route path="footballShoes" element={<FootballShoes />} />
          <Route
            path="footballShoes/footballShoesdetails/:id/:folderName"
            element={<FootballShoesDetails />}
          />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="login" element={<Login />} />
      </Routes>
    </>
  );
}
