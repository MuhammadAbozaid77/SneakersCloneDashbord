import style from "./SpinnerLoading.module.css";

export default function SpinnerLoading() {
  return (
    <>
      <div className="flex flex-col gap-2 items-center justify-center">
        <span className={`${style.loader}`}></span>
        <span className="font-bold text-[#003a91] text-[18px]"> Loading </span>
      </div>
    </>
  );
}
