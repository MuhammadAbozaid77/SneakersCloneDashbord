import PageContainer from "../../components/ui/PageContainer";
import ChartLine from "./components/ChartLine";
import HeatmapChart from "./components/HeatmapChart";

export default function Home() {
  return (
    <>
      <PageContainer>
        <div className="px-5 flex justify-between items-center lg:flex-row flex-col overflow-x-auto min-h-[80vh]">
          <ChartLine />
          <HeatmapChart />
        </div>
      </PageContainer>
    </>
  );
}
