import React, { useState, useEffect } from "react";
import { Card, Title, Subtitle, Text } from "@tremor/react";

const CurrencyCard = ({
  fullName = "Crypto",
  name = "BTC",
  sgdExchange = "1000",
  usdExchange = "1200",
}) => {
  return (
    <Card
      className="h-32 p-4 drop-shadow-md"
      decoration="left"
      decorationColor={
        name == "BTC"
          ? "amber"
          : name == "DOGE"
          ? "yellow"
          : name == "ETH"
          ? "gray"
          : "blue"
      }
    >
      <div className="flex h-full justify-between">
        <div>
          <Subtitle>{fullName}</Subtitle>
          <Title className="text-2xl">{name}</Title>
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex items-end justify-end">
            <Title className="text-2xl">${sgdExchange}</Title>
            <Subtitle className="text-lg">SGD</Subtitle>
          </div>
          <div className="flex items-end justify-end">
            <Title className="text-2xl">${usdExchange}</Title>
            <Subtitle className="text-lg">USD</Subtitle>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CurrencyCard;
