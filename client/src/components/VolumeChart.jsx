import React, { useState, useEffect } from "react";
import {
  TabList,
  Tab,
  Card,
  Title,
  Subtitle,
  AreaChart,
  Divider,
  BarChart,
} from "@tremor/react";
const VolumeChart = () => {
  const [showVolumeChartTab, setShowVolumeChartTab] = useState("combined");
  const [volumeData, setVolumeData] = useState([]);

  useEffect(() => {
    GetTotalVolumes().then((response) => setVolumeData(response.data));
  }, []);

  return (
    <div>
      <Title>Market Caps | Daily</Title>
      <Subtitle>Showing the past 30 days.</Subtitle>
      <TabList
        defaultValue="combined"
        value={showBarChartTab}
        onValueChange={setShowBarChartTab}
        className="w-full"
      >
        <Tab value="combined" text="Combined" className="font-semibold" />
        <Tab value="btc" text="Bitcoin" className="font-semibold" />
        <Tab value="eth" text="Ethereum" className="font-semibold" />
        <Tab value="doge" text="Dogecoin" className="font-semibold" />
        <Tab value="mana" text="Mana" className="font-semibold" />
      </TabList>
      {showBarChartTab == "combined" ? (
        <BarChart
          data={chartData}
          className="mt-6"
          index="time"
          colors={["orange", "gray", "yellow", "blue"]}
          categories={["BTC", "ETH", "DOGE", "MANA"]}
        ></BarChart>
      ) : showBarChartTab == "btc" ? (
        <BarChart
          data={chartData}
          className="mt-6"
          index="time"
          colors={["orange"]}
          categories={["BTC"]}
        ></BarChart>
      ) : showBarChartTab == "eth" ? (
        <BarChart
          data={chartData}
          className="mt-6"
          index="time"
          colors={["gray"]}
          categories={["ETH"]}
        ></BarChart>
      ) : showBarChartTab == "doge" ? (
        <BarChart
          data={chartData}
          className="mt-6"
          index="time"
          colors={["yellow"]}
          categories={["DOGE"]}
        ></BarChart>
      ) : showBarChartTab == "mana" ? (
        <BarChart
          data={chartData}
          className="mt-6"
          index="time"
          colors={["blue"]}
          categories={["MANA"]}
        ></BarChart>
      ) : (
        "Something went wrong"
      )}
    </div>
  );
};

export default VolumeChart;
