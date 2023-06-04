import React, { useState, useEffect } from "react";
import "./LandingPage.css";
import { Waveform } from "@uiball/loaders";
import { GetNewsData } from "../data";
import { Card, Title } from "@tremor/react";
import { Navbar } from "../components/index.js";
import {
  ExchangeRatesCard,
  ValueChart,
  SimpleNewsCard,
} from "../components/index.js";

const LandingPage = () => {
  const [newsData, setNewsData] = useState();

  useEffect(() => {
    GetNewsData().then((response) => setNewsData(response.data));
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto">
        <div className="items-top flex justify-center gap-4 overflow-auto p-14">
          <div className="custom-sticky">
            <ExchangeRatesCard />
          </div>
          <div className="flex h-fit w-3/5">
            <div className="flex w-full flex-col items-center justify-center gap-y-4">
              <ValueChart />
            </div>
          </div>
          <div className="custom-sticky w-80">
            <Card decoration="top" decorationColor="violet">
              {newsData != undefined ? (
                <div className="flex flex-col gap-2">
                  <Title>Today's Crypto News</Title>
                  {newsData.data.map((article, i) => (
                    <SimpleNewsCard
                      key={i}
                      title={article.title}
                      author={article["source_name"]}
                      date={article.date}
                      image={article["image_url"]}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  {/* <Ring size={40} lineWeight={5} speed={2} color="black" />; */}
                  <Waveform
                    size={30}
                    speed={1}
                    lineWeight={2.5}
                    color="#dfdfdf"
                  />
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
