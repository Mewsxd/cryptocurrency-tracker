import { Avatar, Col, Row, Typography } from "antd";
import React from "react";
import { useGetCryptoExchangeQuery } from "../../services/CryptoExchange";
import millify from "millify";
import ExchangeLineChart from "../ExchangeLineChart";
import { useSelector } from "react-redux";

const Exchanges = () => {
  const currencyCode = useSelector((state) => state.exchangeRate.currencyCode);
  const exchangeRate = useSelector((state) => state.exchangeRate.exchangeRate);
  const { Text, Title } = Typography;
  const { data, isFetching } = useGetCryptoExchangeQuery();
  if (isFetching) return "Loading...";
  console.log(data);
  const exchangeData = data?.slice(0, 30);
  console.log(exchangeData[0].name);

  const currencySymbols = {
    inr: "₹",
    usd: "$",
    eur: "€",
  };
  const currencySymbol = currencySymbols[currencyCode];
  return (
    <>
      <Row className="exchange-header-container">
        <Col span={6}>
          <Title level={3}>Exchange</Title>
        </Col>
        <Col span={6}>
          <Title level={3}>24h trading volume</Title>
        </Col>
        <Col span={6}>
          <Title level={3}>Trust score</Title>
        </Col>
        <Col span={6}>
          <Title level={3}>Last 7 days</Title>
        </Col>
      </Row>
      <div className="exchange-container">
        {exchangeData?.map((data) => {
          return (
            <Row className="exchange">
              <Col span={6}>
                <Text>
                  <strong>{data?.trust_score_rank}.</strong>
                </Text>
                <Avatar className="exchange-image" src={data?.image} />
                <Text>
                  <strong>
                    <a href={data?.url} target="_blank" rel="noreferrer">
                      {data?.name}
                    </a>
                  </strong>
                </Text>
              </Col>
              <Col span={6}>
                {currencySymbol}
                {millify(data?.trade_volume_24h_btc * exchangeRate)}
              </Col>
              <Col span={6}>{data?.trust_score}</Col>
              <Col span={2}>
                <ExchangeLineChart id={data?.id} />
              </Col>
            </Row>
          );
        })}
      </div>
    </>
  );
};

export default React.memo(Exchanges);
