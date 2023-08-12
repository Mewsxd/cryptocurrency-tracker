import React, { useState } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import millify from "millify";
import { Col, Row, Typography, Select } from "antd";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../../services/CryptoApi";
import LineChart from "../LineChart";
import { useSelector } from "react-redux";

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
  const currencyCode = useSelector((state) => state.exchangeRate.currencyCode);
  const exchangeRate = useSelector((state) => state.exchangeRate.exchangeRate);
  const [timePeriod, setTimePeriod] = useState("7d");
  const { coinId } = useParams();
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({
    coinId,
    timePeriod,
  });
  const currencySymbols = {
    inr: "₹",
    usd: "$",
    eur: "€",
  };
  const currencySymbol = currencySymbols[currencyCode];
  // console.log(currencySymbol[currencyCode]);
  // console.log(coinHistory);
  const cryptoDetails = data?.data?.coin;
  // console.log(cryptoDetails.links[0]);
  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];
  if (isFetching) {
    return "Loading....";
  }

  const stats = [
    {
      title: "Price in USD",
      value: `${currencySymbol} ${
        cryptoDetails?.price && millify(cryptoDetails?.price * exchangeRate)
      }`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `${currencySymbol} ${
        cryptoDetails["24hVolume"] &&
        millify(cryptoDetails["24hVolume"] * exchangeRate)
      }`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `${currencySymbol} ${
        cryptoDetails?.marketCap &&
        millify(cryptoDetails?.marketCap * exchangeRate)
      }`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high",
      value: `${currencySymbol} ${millify(
        cryptoDetails?.allTimeHigh?.price * exchangeRate
      )}`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails?.supply?.confirmed ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `${currencySymbol} ${millify(cryptoDetails?.supply?.max)}`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `${currencySymbol} ${millify(cryptoDetails?.supply?.circulating)}`,
      icon: <ExclamationCircleOutlined />,
    },
  ];
  // console.log(data);
  return (
    <Col className="coin-details-container">
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">
          {cryptoDetails?.name} ({cryptoDetails?.symbol})
        </Title>
        <p>
          {cryptoDetails?.name} live price in US dollars. View value statistics,
          market cap and supply.
        </p>
      </Col>
      <Select
        className="select-timeperiod"
        placeholder="Select time period"
        onChange={(val) => setTimePeriod(val)}
        defaultValue="7d"
      >
        {time.map((date) => (
          <Option key={date}>{date}</Option>
        ))}
      </Select>
      <LineChart
        coinHistory={coinHistory}
        coinName={cryptoDetails?.name}
        coinPrice={cryptoDetails?.price}
      />
      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              {cryptoDetails?.name} Value statisics
            </Title>
            <p>An overview showing stats of {cryptoDetails?.name}</p>
          </Col>
          {stats?.map(({ icon, title, value }) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              Other statisics
            </Title>
            <p>An overview showing stats of all cryptocurrencies</p>
          </Col>
          {genericStats?.map(({ icon, title, value }) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
      <Col className="coin-desk-link">
        <Row className="coin-desk">
          <Title level={2} className="coin-details-heading">
            What is {cryptoDetails.name} ?
          </Title>
          {/* <p>{HTMLReactParser(cryptoDetails.description)}</p> */}
          <Title level={4} className="coin-details-answer">
            {HTMLReactParser(cryptoDetails.description)}
          </Title>
        </Row>
        <Col className="coin-links">
          <Title level={4}>{cryptoDetails.name} links</Title>
          {cryptoDetails?.links.map((link) => {
            return (
              <Row className="coin-link" key={link?.name}>
                <Title level={5} className="link-name">
                  {link?.type}
                </Title>
                {
                  <a href={link?.url} target="_blank">
                    {link?.name}
                  </a>
                }
              </Row>
            );
          })}
        </Col>
      </Col>
    </Col>
  );
};

export default React.memo(CryptoDetails);
