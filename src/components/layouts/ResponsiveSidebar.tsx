import { NavLink } from "react-router-dom";
import { sidebarNav } from "../../data/header";
import useLogout from "../../hooks/useLogout";
import LogoCompo from "./LogoCompo";
import { LuLogOut } from "react-icons/lu";
import { FaCircleUser } from "react-icons/fa6";
import { BsChevronDoubleLeft } from "react-icons/bs";
import { CgClose } from "react-icons/cg";

// Define the type for the props
interface HeaderProps {
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ResponsiveSidebar({ setShowSidebar }: HeaderProps) {
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
        className="absolute inset-0 lg:hidden block bg-black/80 h-[100%] z-[100]"
        onClick={handelShowSidebar}
      >
        <div
          className="w-[300px] bg-white h-[100%] flex flex-col justify-between"
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <LogoCompo />
            <ul className="mt-[8px]">
              {sidebarNav.map((el, index) => (
                <li
                  className=" bg-white navLinkes duration-150 hover:bg-slate-200"
                  key={index}
                >
                  <NavLink
                    to={el.path}
                    className="font-semibold block p-3 text-slate-600 rounded-md mx-[5px] "
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
              className="bg-white text-black border navLinkes flex justify-start items-center  p-3"
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

        <div className="absolute top-[30px] right-[30px] border p-1 rounded-md bg-white">
          <CgClose size={25} color="black" />
        </div>
      </div>
    </>
  );
}
