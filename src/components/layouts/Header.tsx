import { RxHamburgerMenu } from "react-icons/rx";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

// Define the type for the props
interface HeaderProps {
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Header({ setShowSidebar }: HeaderProps) {
  const handleShowSidebar = () => {
    setShowSidebar((prev) => !prev);
  };

  return (
    <div className="flex justify-between items-center h-[80px] border-b p-3 bg-white">
      <div
        className="lg:hidden block border p-2 rounded-md cursor-pointer"
        onClick={handleShowSidebar}
      >
        <RxHamburgerMenu size={25} />
      </div>
      <div></div>
      <div className="p-2 border rounded hover:bg-slate-200 duration-150">
        <Link to={"https://github.com/MuhammadAbozaid77"} target="_blank">
          <FaGithub size={25} />
        </Link>
      </div>
    </div>
  );
}
