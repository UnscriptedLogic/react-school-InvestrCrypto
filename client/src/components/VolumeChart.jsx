import React, { useState, useEffect } from "react";
import { GetTotalVolumes } from "../data";
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
    <Card>
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
          autoMinValue
          data={volumeData}
          className="mt-6"
          index="time"
          colors={["orange", "gray", "yellow", "blue"]}
          categories={["BTC", "ETH", "DOGE", "MANA"]}
          yAxisWidth={48}
        ></BarChart>
      ) : showVolumeChartTab == "btc" ? (
        <BarChart
          autoMinValue
          data={volumeData}
          className="mt-6"
          index="time"
          colors={["orange"]}
          categories={["BTC"]}
          yAxisWidth={48}
        ></BarChart>
      ) : showVolumeChartTab == "eth" ? (
        <BarChart
          autoMinValue
          data={volumeData}
          className="mt-6"
          index="time"
          colors={["gray"]}
          categories={["ETH"]}
          yAxisWidth={48}
        ></BarChart>
      ) : showVolumeChartTab == "doge" ? (
        <BarChart
          autoMinValue
          data={volumeData}
          className="mt-6"
          index="time"
          colors={["yellow"]}
          categories={["DOGE"]}
          yAxisWidth={48}
        ></BarChart>
      ) : showVolumeChartTab == "mana" ? (
        <BarChart
          autoMinValue
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

export default VolumeChart;
