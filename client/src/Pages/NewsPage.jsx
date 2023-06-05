import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, SimpleNewsCard } from "../components/index.js";
import { GetNewsData } from "../data.js";
import {
  Card,
  Title,
  Subtitle,
  Callout,
  Text,
  Divider,
  Button,
} from "@tremor/react";

const NewsPage = () => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    GetNewsData().then((response) => setNewsData(response.data.data));
  }, []);

  return (
    <div>
      <Navbar />
      <div className="mx-auto mt-20 w-2/3">
        <Title>Catch up with some news crypto news</Title>
        <Divider className="m-2" />
        <div className="mb-10 flex flex-wrap justify-center gap-6">
          {newsData.length != 0 ? (
            newsData.map((item, i) => (
              <SimpleNewsCard
                key={i}
                title={item["title"]}
                image={item["image_url"]}
                author={item["source_name"]}
                date={item["date"]}
              />
            ))
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
