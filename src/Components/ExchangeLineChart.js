import React from "react";
import { Col, Row, Typography } from "antd";
import millify from "millify";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { useGetExchangeHistoryQuery } from "../services/CryptoExchange";
const ExchangeLineChart = (props) => {
  const currencyCode = useSelector((state) => state.exchangeRate.currencyCode);
  const exchangeRate = useSelector((state) => state.exchangeRate.exchangeRate);
  const { data: chartData, isFetching: chartDataFethcing } =
    useGetExchangeHistoryQuery(props.id);
  if (chartDataFethcing) {
    return "Loading...";
  }
  const currencySymbols = {
    inr: "₹",
    usd: "$",
    eur: "€",
  };
  const currencySymbol = currencySymbols[currencyCode];
  const price = [];
  const timestamp = [];
  for (let i = 0; i < chartData?.length; i++) {
    price.push(chartData[i][1] * exchangeRate);

    timestamp.push(
      new Date(chartData[i][0].timestamp * 1000).toLocaleDateString()
    );
  }
  price.reverse();
  timestamp.reverse();
  console.log("Price" + price);
  const data = {
    labels: timestamp,
    datasets: [
      {
        label: `Price In ${currencySymbol}`,
        data: price,
        fill: false,
        backgroundColor: "#f0598e",
        borderColor: "##f0598e",
      },
    ],
  };

  const options = {
    scales: {
      x: {
        display: false, // Hide the x-axis labels
      },
      y: {
        display: false,
        ticks: {
          beginAtZero: true,
        },
      },
    },
    elements: {
      line: {
        borderWidth: 1, // Adjust the borderWidth to make lines thinner
      },
    },
  };
  return (
    <>
      <Line data={data} options={options} />
    </>
  );
};

export default ExchangeLineChart;
