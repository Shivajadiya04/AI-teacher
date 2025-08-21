import React from "react";
import Chart from "react-apexcharts";

const LineChart = ({ data }) => {
  const options = {
    chart: { type: 'line', height: 250 },
    xaxis: { categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] }
  };

  return <Chart options={options} series={[{ name: 'Progress', data }]} type="line" height={250} />;
};

export default LineChart;
