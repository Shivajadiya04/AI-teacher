import React from "react";
import Chart from "react-apexcharts";

const BarChart = ({ data }) => {
  const options = {
    chart: { type: 'bar', height: 250 },
    xaxis: { categories: ['Coding', 'Design', 'Aptitude', 'Logic', 'Writing', 'Speaking', 'Other'] }
  };

  return <Chart options={options} series={[{ name: 'Score', data }]} type="bar" height={250} />;
};

export default BarChart;
