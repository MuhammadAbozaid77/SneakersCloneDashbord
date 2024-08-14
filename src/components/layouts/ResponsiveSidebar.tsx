import { NavLink } from "react-router-dom";
import { sidebarNav } from "../../data/header";
import useLogout from "../../hooks/useLogout";
import LogoCompo from "./LogoCompo";
import { LuLogOut } from "react-icons/lu";
import { FaCircleUser } from "react-icons/fa6";
import { BsChevronDoubleLeft } from "react-icons/bs";

export default function ResponsiveSidebar({ setShowSidebar }) {
  const { mutateLogout } = useLogout();
  const handelLogout = () => {
    mutateLogout();
  };

  const handelShowSidebar = () => {
    setShowSidebar((prev) => !prev);
  };

  return (
    <>
      <div
        className="absolute inset-0 lg:hidden block bg-black/70 h-[100%] z-[100]"
        onClick={handelShowSidebar}
      >
        <div
          className="w-[250px] bg-slate-900 h-[100%] flex flex-col justify-between"
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <LogoCompo />
            <ul className="">
              {sidebarNav.map((el, index) => (
                <li
                  className="border-b bg-transparent navLinkesResponsive duration-150 hover:bg-[#9c9c9c]"
                  key={index}
                >
                  <NavLink
                    to={el.path}
                    className="font-semibold block p-3 text-white/80 text-[18px]  hover:text-black"
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
                <LuLogOut size={30} className="text-yellow-500" />
                <span className="font-semibold block mx-2 text-[18px]">
                  Logout
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="absolute top-[30px] right-[30px] border p-1 rounded-md bg-white">
          <BsChevronDoubleLeft size={20} color="black" />
        </div>
      </div>
    </>
  );
}
