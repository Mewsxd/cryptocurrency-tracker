import { Avatar, Col, Row, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useGetCryptoExchangeQuery } from "../../services/CryptoExchange";
import millify from "millify";
import ExchangeLineChart from "../ExchangeLineChart";
import { useSelector } from "react-redux";

const Exchanges = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(null);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    if (screenSize < 768) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);
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
        <Col span={!activeMenu ? 10 : 6}>
          <p className="exchange-header">Exchanges</p>
        </Col>
        <Col span={!activeMenu ? 7 : 6}>
          <p className="exchange-header">24h trading volume</p>
        </Col>
        <Col span={!activeMenu ? 7 : 6}>
          <p className="exchange-header">Trust score</p>
        </Col>
        {activeMenu && (
          <Col span={6}>
            <p className="exchange-header">Trading Volume (Last 7 days)</p>
          </Col>
        )}
      </Row>
      <div className="exchange-container">
        {exchangeData?.map((data) => {
          return (
            <Row className="exchange">
              <Col span={!activeMenu ? 10 : 6}>
                <Text>
                  <strong>{data?.trust_score_rank}.</strong>
                </Text>
                <Avatar className="exchange-image" src={data?.image} />
                <Col>
                  <Text>
                    <strong>
                      <a href={data?.url} target="_blank" rel="noreferrer">
                        {data?.name}
                      </a>
                    </strong>
                  </Text>
                </Col>
              </Col>
              <Col span={!activeMenu ? 7 : 6}>
                {currencySymbol}
                {millify(data?.trade_volume_24h_btc * exchangeRate)}
              </Col>
              <Col span={!activeMenu ? 7 : 6}>{data?.trust_score}</Col>
              {activeMenu && (
                <Col span={2} className="line-chart">
                  <ExchangeLineChart id={data?.id} />
                </Col>
              )}
            </Row>
          );
        })}
      </div>
    </>
  );
};

export default React.memo(Exchanges);
