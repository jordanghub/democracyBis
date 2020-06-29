import React from 'react';
import { Radar, Polar } from 'react-chartjs-2';
import * as Styled from './RadarGraph.style';

const options = {
  label: '',
  scale: {
    angleLines: {
      display: false,
    },
    ticks: {
      display: false,
      beginAtZero: true,
      max: 100,
      // suggestedMin: 50,
      // suggestedMax: 100,
      maxTicksLimit: 3,
    },
    pointLabels: {
      padding: 1,
      fontSize: 10,
      fontFamily: 'Roboto',
      fontStyle: 'bold',
    },
  },
  tooltips: {
    label: '',
    callbacks: {
      title: () => '',
      label: (tooltipItem, data) =>
        `${data.labels[tooltipItem.index]}: ${tooltipItem.label}`,
    },
  },
};

// // TODO props dynamiques

export const RadarGraph = ({ labels = [], dataVal = [] }) => {
  const data = {
    labels,

    // tooltips: {

    // },
    datasets: [
      {
        // backgroundColor: 'rgba(179,181,198,0.3)',
        backgroundColor: 'rgba(0,0,255,0.1)',
        borderColor: 'rgba(0,0,0,0.1)',
        // borderColor: 'rgba(179,181,198,1)',
        // pointBackgroundColor: 'rgba(179,181,198,1)',
        // pointBackgroundColor: [
        //   'rgba(63,81,181,1)',
        //   'rgba(255,0,0,1)',
        //   'rgba(0,255,0,1)',
        //   'rgba(200,12,120,1)',
        //   'rgba(255,255,1)',
        //   'rgba(0,255,255,1)',
        // ],
        pointBackgroundColor: 'rgba(63,81,181,0.4)',
        borderWidth: 0,
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(63,81,181,0.4)',
        gridLines: {
          color: ['red', 'blue', 'green', 'orange', 'black'],
        },
        // pointHoverBorderColor: 'rgba(179,181,198,1)',
        // backgroundColor: 'transparent',
        // borderColor: 'transparent',
        // pointBackgroundColor: 'rgba(179,181,198,1)',
        // pointBorderColor: '#fff',
        // pointHoverBackgroundColor: '#fff',
        // pointHoverBorderColor: 'rgba(179,181,198,1)',
        data: dataVal,
      },
    ],
  };

  return (
    <Styled.Wrapper>
      <Radar legend={null} data={data} options={options} />
    </Styled.Wrapper>
  );
};
// export const RadarGraph = ({ labels = [], dataVal = [] }) => {
//   const data = {
//     labels,
//     datasets: [
//       {
//         data: dataVal,
//         backgroundColor: [
//           '#FF6384',
//           '#4BC0C0',
//           '#FFCE56',
//           '#E7E9ED',
//           '#36A2EB',
//         ],
//       },
//     ],
//   };

//   const options = {};

//   return (
//     <Styled.Wrapper>
//       <Polar legend={null} data={data} options={options} />
//     </Styled.Wrapper>
//   );
// };

// import { HorizontalBar } from 'react-chartjs-2';

// export const RadarGraph = ({ labels = [], dataVal = [] }) => {
//   const data = {
//     labels,
//     datasets: [
//       {
//         backgroundColor: 'rgba(0,0,255,0.2)',
//         borderColor: 'transparent',
//         borderWidth: 0,
//         hoverBackgroundColor: 'rgba(255,99,132,0.4)',
//         hoverBorderColor: 'rgba(255,99,132,1)',
//         data: dataVal,
//       },
//     ],
//   };

//   return (
//     <Styled.Wrapper>
//       <HorizontalBar
//         legend={null}
//         data={data}
//         options={{
//           maintainAspectRatio: false,
//           scales: {
//             offset: false,
//             xAxes: [
//               {
//                 ticks: {
//                   display: false,
//                 },
//                 gridLines: {
//                   display: false,
//                 },
//               },
//             ],
//             yAxes: [
//               {
//                 gridLines: {
//                   display: false,
//                 },
//               },
//             ],
//           },
//           barThickness: 'flex',
//         }}
//       />
//     </Styled.Wrapper>
//   );
// };
