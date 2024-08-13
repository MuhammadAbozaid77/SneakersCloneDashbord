import Chart from "react-apexcharts";

export default function ChartLine() {
  const options = {
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: ["Jordan", "Sneakers", "Running Shoes", "Football Shoes"],
    },
  };

  const series = [
    {
      name: "Series 1",
      data: [3, 5,9, 20],
    },
  ];
  return (
    <>
      <Chart options={options} series={series} type="line" width="500" />
    </>
  );
}
