import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import { GetOHLC } from "../data";
import { Coins } from "../classes";

const CandleChart = ({ coin }) => {
  const [data, setData] = useState([]);
  const currentCoin = Coins[coin];

  const options = {
    legend: "none",
    candlestick: {
      fallingColor: { strokeWidth: 0, fill: "blue" }, // red
      risingColor: { strokeWidth: 0, fill: "#0f9d58" }, // green
    },
  };

  const headers = ["Date", "open", "high", "low", "close"];

  useEffect(() => {
    GetOHLC(currentCoin.name).then((response) => {
      response.data.unshift(headers);
      console.log(response.data);
      setData(response.data);
    });
  }, []);

  return (
    <Chart
      chartType="CandlestickChart"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
};

export default CandleChart;
