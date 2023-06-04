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
import { GetAllCoinValues, GetMarketCaps, GetTotalVolumes } from "../data.js";
import { Waveform } from "@uiball/loaders";

const ValueChart = () => {
  const [showTab, setShowTab] = useState("combined");
  const [showBarChartTab, setShowBarChartTab] = useState("combined");
  const [showVolumeChartTab, setShowVolumeChartTab] = useState("combined");

  const [lineData, setLineData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [volumeData, setVolumeData] = useState([]);

  useEffect(() => {
    GetAllCoinValues().then((response) => setLineData(response.data));
    GetMarketCaps().then((response) => setChartData(response.data));
    GetTotalVolumes().then((response) => setVolumeData(response.data));
  }, []);

  if (lineData.length <= 0) {
    return (
      <Card
        className="flex h-80 w-full items-center justify-center"
        decoration="top"
        decorationColor="amber"
      >
        {/* <Ring size={40} lineWeight={5} speed={2} color="black" />; */}
        <Waveform size={30} speed={1} lineWeight={2.5} color="#dfdfdf" />
      </Card>
    );
  }
  return (
    <Card className="grid w-full" decoration="top" decorationColor="amber">
      <Title>Cryptocurrency Value | Daily</Title>
      <Subtitle>Showing the past 30 days</Subtitle>
      <TabList
        defaultValue="combined"
        value={showTab}
        onValueChange={setShowTab}
        className="w-full"
      >
        <Tab value="combined" text="Combined" className="font-semibold" />
        <Tab value="btc" text="Bitcoin" className="font-semibold" />
        <Tab value="eth" text="Ethereum" className="font-semibold" />
        <Tab value="doge" text="Dogecoin" className="font-semibold" />
        <Tab value="mana" text="Mana" className="font-semibold" />
      </TabList>
      {showTab == "combined" ? (
        <AreaChart
          data={lineData}
          className="mt-6"
          index="time"
          colors={["orange", "gray", "yellow", "blue"]}
          categories={["BTC", "ETH", "DOGE", "MANA"]}
        ></AreaChart>
      ) : showTab == "btc" ? (
        <AreaChart
          data={lineData}
          className="mt-6"
          index="time"
          colors={["orange"]}
          categories={["BTC"]}
        ></AreaChart>
      ) : showTab == "eth" ? (
        <AreaChart
          data={lineData}
          className="mt-6"
          index="time"
          colors={["gray"]}
          categories={["ETH"]}
        ></AreaChart>
      ) : showTab == "doge" ? (
        <AreaChart
          data={lineData}
          className="mt-6"
          index="time"
          colors={["yellow"]}
          categories={["DOGE"]}
        ></AreaChart>
      ) : showTab == "mana" ? (
        <AreaChart
          data={lineData}
          className="mt-6"
          index="time"
          colors={["blue"]}
          categories={["MANA"]}
        ></AreaChart>
      ) : (
        "Something went wrong"
      )}
      <Divider />
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
      <Divider />
      <Title>Total Volumes | Daily</Title>
      <Subtitle>Showing the past 30 days.</Subtitle>
      <TabList
        defaultValue="combined"
        value={showVolumeChartTab}
        onValueChange={setShowVolumeChartTab}
        className="w-full"
      >
        <Tab value="combined" text="Combined" className="font-semibold" />
        <Tab value="btc" text="Bitcoin" className="font-semibold" />
        <Tab value="eth" text="Ethereum" className="font-semibold" />
        <Tab value="doge" text="Dogecoin" className="font-semibold" />
        <Tab value="mana" text="Mana" className="font-semibold" />
      </TabList>
      {showVolumeChartTab == "combined" ? (
        <BarChart
          data={volumeData}
          className="mt-6"
          index="time"
          colors={["orange", "gray", "yellow", "blue"]}
          categories={["BTC", "ETH", "DOGE", "MANA"]}
          yAxisWidth={48}
        ></BarChart>
      ) : showVolumeChartTab == "btc" ? (
        <BarChart
          data={volumeData}
          className="mt-6"
          index="time"
          colors={["orange"]}
          categories={["BTC"]}
          yAxisWidth={48}
        ></BarChart>
      ) : showVolumeChartTab == "eth" ? (
        <BarChart
          data={volumeData}
          className="mt-6"
          index="time"
          colors={["gray"]}
          categories={["ETH"]}
          yAxisWidth={48}
        ></BarChart>
      ) : showVolumeChartTab == "doge" ? (
        <BarChart
          data={volumeData}
          className="mt-6"
          index="time"
          colors={["yellow"]}
          categories={["DOGE"]}
          yAxisWidth={48}
        ></BarChart>
      ) : showVolumeChartTab == "mana" ? (
        <BarChart
          data={volumeData}
          className="mt-6"
          index="time"
          colors={["blue"]}
          categories={["MANA"]}
          yAxisWidth={48}
        ></BarChart>
      ) : (
        "Something went wrong"
      )}
    </Card>
  );
};

export default ValueChart;
