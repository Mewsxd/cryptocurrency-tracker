import { Col, Row, Typography } from "antd";
import millify from "millify";
import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "react-chartjs-2";
import { useSelector } from "react-redux";
const { Title } = Typography;
const LineChart = ({ coinName, coinHistory, coinPrice }) => {
  const exchangeRate = useSelector((state) => state.exchangeRate.exchangeRate);
  const currencyCode = useSelector((state) => state.exchangeRate.currencyCode);

  console.log(exchangeRate);
  const price = [];
  const timestamp = [];
  const currencySymbols = {
    inr: "₹",
    usd: "$",
    eur: "€",
  };
  const currencySymbol = currencySymbols[currencyCode];
  for (let i = 0; i < coinHistory?.data?.history?.length; i++) {
    price.push(coinHistory?.data?.history[i].price * exchangeRate);
    timestamp.push(
      new Date(
        coinHistory?.data?.history[i].timestamp * 1000
      ).toLocaleDateString()
    );
  }
  price.reverse();
  timestamp.reverse();
  console.log(coinHistory);
  const data = {
    labels: timestamp,
    datasets: [
      {
        label: `Price In ${currencySymbol}`,
        data: price,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };

  const options = {
    scales: {
      yAxis: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <>
      <Row className="chart-header">
        <Title level={3} className="chart-title">
          {coinName} Price Chart
        </Title>
        <Col className="price-container">
          <Title level={5} onClick="price-change">
            {coinHistory?.data?.change}%
          </Title>
          <Title level={5} className="current-price">
            Current {coinName} price: {currencySymbol}
            {millify(coinPrice * exchangeRate)}
          </Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;
