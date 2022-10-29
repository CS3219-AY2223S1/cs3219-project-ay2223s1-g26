import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Donut(props) {
  function hasData() {
    for (const elem of props.data) {
      if (elem > 0) {
        return true
      }
    }
    return false
  }

  const config = {
    labels: ['Easy', 'Medium', 'Hard'],
    datasets: [
      {
        label: 'Difficulty',
        data: props.data,
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)', // green
          'rgba(255, 206, 86, 0.2)', // yellow
          'rgba(255, 99, 132, 0.2)' // red
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)', //green
          'rgba(255, 206, 86, 1)', // yellow
          'rgba(255, 99, 132, 1)' // red
        ],
        borderWidth: 1,
      },
    ]
  };

  return <div>
    { hasData() 
      ? <Doughnut data={config} style={{maxHeight: '340px'}}/> 
      : <p>No data</p>}
  </div>;
}
