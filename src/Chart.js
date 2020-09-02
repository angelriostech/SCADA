import React from 'react';
import {Bar} from 'react-chartjs-2';

const data = {
    datasets: [{
        label: 'REFERENCIA MAXIMA',
        type:'line',
        data: [700, 700, 700,700, 700, 700, 700],
        fill: false,
        borderColor: '#fc0303',
        backgroundColor: '#fc0303',
        pointBorderColor: '#fc0303',
        pointBackgroundColor: '#fc0303',
        pointHoverBackgroundColor: '#fc0303',
        pointHoverBorderColor: '#fc0303',
        yAxisID: 'y-axis-1'
    },{
        type: 'line',
        label: 'TEMPERATURA',
        data: [200, 185, 590, 621, 250, 400, 95],
        fill: false,
        backgroundColor: '#0f03fc',
        borderColor: '#0f03fc',
        hoverBackgroundColor: '#0f03fc',
        hoverBorderColor:'#0f03fc',
        yAxisID: 'y-axis-1'
    },{
        type: 'line',
        label: 'REFERENCIA MINIMA',
        data: [0, 0, 0, 0, 0, 0, 0],
        fill: false,
        backgroundColor: '#71B37A',
        borderColor: '#71B37A',
        hoverBackgroundColor: '#71B37A',
        hoverBorderColor: '#71B37A',
        yAxisID: 'y-axis-1'
    }
    ]
};

const options = {
    responsive: true,
    tooltips: {
        mode: 'label'
    },
    elements: {
        line: {
            fill: false
        }
    },
    scales: {
        xAxes: [
            {
                display: true,
                gridLines: {
                    display: false
                },
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            }
        ],
        yAxes: [
            {
                type: 'linear',
                display: true,
                position: 'left',
                id: 'y-axis-1',
                gridLines: {
                    display: true
                },
                labels: {
                    show: true
                }
            },
            {
                type: 'linear',
                display: false,
                position: 'right',
                id: 'y-axis-2',
                gridLines: {
                    display: true
                },
                labels: {
                    show: true
                }
            }
        ]
    }
};


export default function Chart(){


        return (
            <div>
                <Bar
                    data={data}
                    options={options}
                />
            </div>
        );
}
