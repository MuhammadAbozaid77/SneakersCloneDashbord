import PageContainer from "../../components/ui/PageContainer";
import { FaCircleUser } from "react-icons/fa6";
import { IoMdLogOut } from "react-icons/io";
import useLogout from "../../hooks/useLogout";
import { appAuth } from "../../data/firebaseConfig";

export default function Profile() {
  console.log("appAuth", appAuth);

  const { mutateLogout } = useLogout();
  const handelLogout = () => {
    mutateLogout();
  };

  return (
    <>
      <PageContainer>
        <div className="flex justify-between items-center px-5">
          <div className="font-bold text-[20px] text-[#062965]">Profile</div>
        </div>
      </PageContainer>
      <PageContainer>
        <div className="flex justify-between items-center p-5 flex-col gap-5">
          <div>
            <FaCircleUser size={150} className="text-[#062965]" />
          </div>
          <div>
            <div className="font-bold text-[25px]  text-gray-600">
              Muhammad Abozaid
            </div>
            <div className="font-bold text-[25px]  text-gray-600 ">
              {appAuth?.currentUser?.email}
            </div>
          </div>
          <div>
            <button
              onClick={handelLogout}
              className="bg-red-700 text-white font-bold p-2 w-[100px] rounded flex justify-center items-center"
            >
              <IoMdLogOut color="white" size={30} />
              <span className="mx-2"> Logout </span>
            </button>
          </div>
        </div>
      </PageContainer>
    </>
  );
}
