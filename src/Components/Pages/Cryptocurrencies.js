import { Row, Col, Card } from "antd";
import React, { Component, useEffect, useState } from "react";
import { useGetCryptosQuery } from "../../services/CryptoApi";
import { Link } from "react-router-dom";
import millify from "millify";
import Input from "antd/es/input/Input";
import { useSelector } from "react-redux";

const Cryptocurrencies = ({ simplified }) => {
  // console.log("CRYPTOCUR RUNNING");
  const exchangeRate = useSelector((state) => state.exchangeRate.exchangeRate);
  const [searchTerm, setSearchTerm] = useState("");
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);
  if (isFetching) {
    return "Loading....";
  }
  // console.log(cryptos);
  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col
            className="crypto-card"
            xs={24}
            sm={12}
            lg={6}
            key={currency.uuid}
          >
            <Link to={`/crypto/${currency.uuid}`}>
              <Card
                hoverable={true}
                title={`${currency.rank}. ${currency.name}`}
                extra={<img className="crypto-image" src={currency.iconUrl} />}
              >
                <p>Price:{millify(currency.price * exchangeRate)}</p>
                <p>Market Cap:{millify(currency.marketCap * exchangeRate)}</p>
                <p>Daily Change:{millify(currency.change * exchangeRate)}</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default React.memo(Cryptocurrencies);
