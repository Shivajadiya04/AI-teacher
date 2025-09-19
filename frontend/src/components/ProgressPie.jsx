// frontend/src/components/ProgressPie.jsx
import React from 'react';
import Chart from 'react-apexcharts';

const ProgressPie = ({ completed = 0, pending = 0, due = 0 }) => {
  const total = completed + pending + due;
  const series = total > 0
    ? [
        Math.round((completed / total) * 100),
        Math.round((pending / total) * 100),
        Math.round((due / total) * 100),
      ]
    : [0, 0, 0];

  const options = {
    labels: ['Completed', 'Pending', 'Due'],
    legend: {
      position: 'bottom',
    },
    dataLabels: {
      formatter: (val) => `${val.toFixed(1)}%`,
    },
    tooltip: {
      y: {
        formatter: (val) => `${val}%`,
      },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-4">
      <h3 className="text-lg font-semibold mb-3">Roadmap Progress</h3>
      <Chart type="donut" series={series} options={options} height={300} />
    </div>
  );
};

export default ProgressPie;
