import React from "react";
import Chart from "react-apexcharts";

const DonutChart = ({ data }) => {
  const options = {
    chart: { type: 'donut', height: 250 },
    labels: ['Coding', 'Design', 'Aptitude', 'Logic', 'Other']
  };

  return <Chart options={options} series={data} type="donut" height={250} />;
};

export default DonutChart;
