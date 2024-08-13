import Chart from "react-apexcharts";

export default function HeatmapChart() {
  const options = {
    chart: {
      type: "heatmap",
    },
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.5,
        colorScale: {
          ranges: [
            {
              from: 0,
              to: 50,
              color: "#00A100",
              name: "low",
            },
            {
              from: 51,
              to: 100,
              color: "#128FD9",
              name: "medium",
            },
            {
              from: 101,
              to: 150,
              color: "#FFB200",
              name: "high",
            },
            {
              from: 151,
              to: 200,
              color: "#FF0000",
              name: "extreme",
            },
          ],
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      type: "category",
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    },
  };

  const series = [
    {
      name: "Jordans",
      data: [20, 29, 37, 36, 44, 45, 50],
    },
    {
      name: "Sneakers",
      data: [35, 41, 45, 48, 52, 53, 60],
    },
    {
      name: "Football Shoes",
      data: [50, 57, 61, 63, 69, 70, 75],
    },
    {
      name: "Running Shoes",
      data: [80, 85, 88, 90, 95, 100, 105],
    },
  ];

  return (
    <>
      <Chart options={options} series={series} type="heatmap" width="500" />
    </>
  );
}
