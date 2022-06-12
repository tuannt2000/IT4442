import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto'

const data = {
    labels: [
        "01/01/2019",
        "02/01/2019",
        "03/01/2019",
        "04/01/2019",
        "05/01/2019",
        "06/01/2019",
        "07/01/2019"
    ],
    datasets: [
        {
            label: "Đã hoàn thành",
            fill: false,
            borderColor: "red",
            borderWidth: 1,
            pointRadius: 2,
            data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
            label: "Đang làm",
            fill: false,
            borderColor: "pink",
            borderWidth: 1,
            pointRadius: 2,
            data: [70, 32, 45, 65, 87, 92, 99]
        },
        {
            label: "Tạm dừng",
            fill: false,
            borderColor: "blue",
            borderWidth: 2,
            pointRadius: 2,
            data: [135, 91, 125, 144, 143, 143, 139]
        },
        {
            label: "Chưa bắt đầu",
            fill: false,
            borderColor: "green",
            borderWidth: 2,
            pointRadius: 2,
            data: [40, 67, 135, 124, 89, 80, 75]
        }
    ]
};

var options = {
    legend: {
        position: "right",
        labels: {
            boxWidth: 10
        }
    },
    scales: {
        xAxes: [
            {
                ticks: { display: false }
            }
        ]
    }
};


const LineChart = () => {
    return (
        <div style={{
            width : "60%",
            display : "inline-block"
        }}>
            <Line data={data} options={options} />
        </div>
    )
}

export default LineChart;