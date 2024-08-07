import logo from "./../../assets/logo.jpg";
export default function LogoCompo() {
  return (
    <>
      <div className="flex justify-center items-center h-[80px] border-b p-3">
        <img className="h-[100%]" src={logo} alt="" />
      </div>
    </>
  );
}
