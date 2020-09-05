import React, {useEffect, useRef, useState} from 'react';
import {Bar} from 'react-chartjs-2';



export default function Chart(props){

    const [chartData,setChartData] = useState(props.data)

    const isFirstRun = useRef(true);
    useEffect (() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }
        setChartData(props.data)
    }, [props.data]);


    const data = {
        datasets: [{
            label: 'REFERENCIA MAXIMA',
            type:'line',
            data: chartData.referencia,
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
            data: chartData.temperatura,
            fill: false,
            backgroundColor: '#0f03fc',
            borderColor: '#0f03fc',
            hoverBackgroundColor: '#0f03fc',
            hoverBorderColor:'#0f03fc',
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
                    labels: chartData.tiempo,
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


        return (
            <div>
                <Bar
                    data={data}
                    options={options}
                />
            </div>
        );
}
