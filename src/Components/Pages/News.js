import React from "react";
import { useGetNewsQuery } from "../../services/NewsApi";
import { Card, Col, Row, Typography } from "antd";
import { useGetCryptoNewsQuery } from "../../services/CryptoNewsApi";

const News = ({ simplified }) => {
  const count = simplified ? 8 : 20;
  const { Title } = Typography;
  const { data: cryptoNews, isFetching } = useGetNewsQuery();
  if (isFetching) {
    return <div>Loading...</div>;
  }
  // console.log(cryptoNews);
  // console.log(cryptoNews?.articles);
  const newsData = cryptoNews?.data.slice(0, count);
  // console.log(newsData);
  // console.log(simplified);
  // const newsData = [];
  return (
    <Row gutter={[18, 18]}>
      {newsData?.map((news, index) => {
        return (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card hoverable={true} className="news-card">
              <a href={news?.link} target="_blank" rel="noreferrer">
                <div className="news-image-container">
                  <Title className="news-title" level={4}>
                    {news?.title}
                  </Title>
                  {
                    <img
                      style={{ maxWidth: "100px", maxHeight: "100px" }}
                      src="https://play-lh.googleusercontent.com/mBJAI03dkaMJp6Fl0sKyQBLCMAxTDuxdy2dNGFuxzcsx232zmIsm6vXOZWNGfql8KDk"
                    />
                  }
                  {/* <img src={news?.}/> */}
                </div>
                <p>
                  {news.shortDescription > 70
                    ? `${news.shortDescription.substring(0, 70)}...`
                    : news.shortDescription}
                </p>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p>{`${news.publisher}`}</p>
                  <p>{news.when}</p>
                </div>
              </a>
            </Card>
          </Col>
        );
      })}
    </Row>
    // <Row gutter={[24, 24]}>
    //   <Col xs={24} sm={12} lg={6}>
    //     <Card hoverable={true} className="news-card">
    //       <a href="www.google.com" target="_blank" rel="noreferrer">
    //         <div className="news-image-container">
    //           <Title className="news-title" level={4}>
    //             "A MAN KILLS 40 PEOPLE"
    //           </Title>
    //         </div>
    //       </a>
    //     </Card>
    //   </Col>
    //   ;
    // </Row>
  );
};

export default React.memo(News);
