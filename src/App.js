import { Link, Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";
import { Layout, Typography, Space, Card } from "antd";
import Navbar from "./Components/Navbar/Navbar";
import "./_App.css";
import Homepage from "./Components/Pages/Homepage";
import Exchanges from "./Components/Pages/Exchanges";
import CryptoDetails from "./Components/Pages/CryptoDetails";
import News from "./Components/Pages/News";
import Cryptocurrencies from "./Components/Pages/Cryptocurrencies";
function App() {
  // const cors = require("cors");
  // app.use(cors());
  // fetch("https://api.coinlore.net/api/exchanges/")
  //   .then((res) => res.json())
  //   .then((data) => console.log(data));
  // var requestOptions = {
  //   method: "GET",
  //   redirect: "follow",
  // };
  // fetch("https://api.coingecko.com/api/v3/exchanges")
  //   .then((res) => res.json())
  //   .then((data) => console.log(data));
  // fetch("https://api.coinstats.app/public/v1/exchanges", requestOptions)
  //   .then((response) => response.text())
  //   .then((result) => console.log(result))
  //   .catch((error) => console.log("error", error));
  return (
    <div className="App">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route exact path="/" element={<Homepage />} />
              <Route exact path="/exchanges" element={<Exchanges />} />
              <Route
                exact
                path="/cryptocurrencies"
                element={<Cryptocurrencies />}
              />
              <Route exact path="/crypto/:coinId" element={<CryptoDetails />} />
              <Route exact path="/news" element={<News />} />
            </Routes>
          </div>
        </Layout>

        <div className="footer">
          <Typography.Title
            level={5}
            style={{ color: "white", textAlign: "center" }}
          >
            Cryptoverse
            <br />
            All rights reserved
          </Typography.Title>
          <Space>
            <Link to="/">Home</Link>
            <Link to="/exchanges">Exchanges</Link>
            <Link to="/news">News</Link>
          </Space>
        </div>
      </div>
    </div>
  );
}

export default App;
