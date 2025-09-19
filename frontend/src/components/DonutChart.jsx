import React from 'react';
import Chart from 'react-apexcharts';

const DonutChart = ({ data }) => {
  const series = data.map(d => d.value);
  const options = {
    labels: data.map(d => d.name),
    legend: {
      position: 'bottom'
    }
  };

  return (
    <Chart type="donut" series={series} options={options} height={300} />
  );
};

export default DonutChart;
