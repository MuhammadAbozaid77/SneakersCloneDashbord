import { NavLink } from "react-router-dom";
import { sidebarNav } from "../../data/header";
import LogoCompo from "./LogoCompo";
import { LuLogOut } from "react-icons/lu";
import { FaCircleUser } from "react-icons/fa6";
import useLogout from "../../hooks/useLogout";

export default function Sidebar() {
  const { mutateLogout } = useLogout();
  const handelLogout = () => {
    mutateLogout();
  };
  return (
    <>
      <div className="w-[350px] lg:flex justify-between flex-col hidden bg-white h-[100%] overflow-y-auto border-r">
        <div>
          <LogoCompo />
          <ul className="">
            {sidebarNav.map((el, index) => (
              <li
                className="border-b bg-white navLinkes duration-150 hover:bg-slate-200"
                key={index}
              >
                <NavLink
                  to={el.path}
                  className="font-semibold block p-3 text-slate-600"
                >
                  {el.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <ul className="">
            <li className=" bg-white navLinkes duration-150 hover:bg-slate-200 border-t">
              <NavLink
                to={"profile"}
                className="font-semibold flex justify-start items-center p-3 "
              >
                <FaCircleUser size={30} color="#003a91" />
                <span className="mx-2 text-slate-600"> Profile </span>
              </NavLink>
            </li>

            <li
              className="darkBlue  text-white navLinkes flex justify-start items-center  p-3"
              onClick={handelLogout}
            >
              <LuLogOut size={30} />
              <span className="font-semibold block mx-2 text-[18px]">
                Logout
              </span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
