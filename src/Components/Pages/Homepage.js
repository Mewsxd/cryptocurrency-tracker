import { Col, Row, Select, Statistic, Typography } from "antd";
import React, { useState } from "react";
import { useGetCryptosQuery } from "../../services/CryptoApi";
import millify from "millify";
import { Link } from "react-router-dom";
import Cryptocurrencies from "./Cryptocurrencies";
import News from "./News";
import { useGetRatesQuery } from "../../services/getExchangeRate";
import { useDispatch, useSelector } from "react-redux";
import { exchangeRateActions } from "../../app/store";
const { Title } = Typography;
const { Option } = Select;
const Homepage = () => {
  const currencyCode = useSelector((state) => state.exchangeRate.currencyCode);
  // console.log(ccode);
  const dispatch = useDispatch();
  // const [currencyCode, setCurrencyCode] = useState("usd");
  const { data, isFetching } = useGetCryptosQuery(10);
  const { data: exchangeData, isFetching: isExchangeDataFetching } =
    useGetRatesQuery("usd");
  // console.log(currencyCode);
  const exchangeRate = useSelector((state) => state.exchangeRate);

  dispatch(
    exchangeRateActions.changeCurrency({
      rate: exchangeData?.usd[currencyCode],
    })
  );
  if (!exchangeRate) return "Loading...";
  if (isFetching) return "Loading....";
  const globalStats = data?.data?.stats;
  if (isExchangeDataFetching) return "Loading...";
  return (
    <>
      <Title level={2} className="heading">
        Global crypto stats
        <Row>
          <Col span={12}>
            <Statistic
              title="Total cryptocurrencies"
              value={millify(globalStats?.total * exchangeRate?.exchangeRate)}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title="Total exchanges"
              value={millify(
                globalStats?.totalExchanges * exchangeRate?.exchangeRate
              )}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title="Total market cap"
              value={millify(
                globalStats?.totalMarketCap * exchangeRate?.exchangeRate
              )}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title="Total 24h volume"
              value={millify(
                globalStats?.total24hVolume * exchangeRate?.exchangeRate
              )}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title="Total markets"
              value={millify(
                globalStats?.totalMarkets * exchangeRate?.exchangeRate
              )}
            />
          </Col>
        </Row>
      </Title>
      <Select
        className="select-timeperiod"
        placeholder="Select currency"
        onChange={(val) =>
          dispatch(exchangeRateActions.changeCurrencyCode({ code: val }))
        }
        defaultValue={currencyCode}
      >
        <Option key="usd">USD (US dollar)</Option>
        <Option key="inr">INR (Indian Rupee)</Option>
      </Select>
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 cryptocurrencies in the world
        </Title>
        <Title level={3} className="show-more">
          <Link to="/cryptocurrencies">Show more</Link>
        </Title>
      </div>
      <Cryptocurrencies simplified />
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Latest crypto news
        </Title>
        <Title level={3} className="show-more">
          <Link to="/news">Show more</Link>
        </Title>
      </div>
      <News simplified={true} />
    </>
  );
};

export default React.memo(Homepage);
