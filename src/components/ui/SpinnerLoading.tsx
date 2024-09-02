import PageContainer from "./PageContainer";
import style from "./SpinnerLoading.module.css";

export default function SpinnerLoading() {
  return (
    <PageContainer>
      <div className="flex flex-col gap-2 items-center justify-center h-[200px]">
        <span className={`${style.loader2}`}></span>
        <span className="font-bold text-black text-[18px]"> Loading </span>
      </div>
    </PageContainer>
  );
}
