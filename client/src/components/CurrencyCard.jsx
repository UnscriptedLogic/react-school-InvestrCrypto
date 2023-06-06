import React, { useState, useEffect } from "react";
import { Card, Title, Subtitle, Text } from "@tremor/react";
import { useNavigate } from "react-router-dom";
import { Coins } from "../classes";

const CurrencyCard = ({
  name = "BTC",
  sgdExchange = "1000",
  usdExchange = "1200",
}) => {
  const navigate = useNavigate();
  useEffect(() => {}, []);

  const currentCoin = Coins[name];

  return (
    <Card
      onClick={() => {
        navigate(`/trade/${name}`);
      }}
      className="relative h-32 cursor-pointer overflow-hidden p-0 drop-shadow-md"
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
      <div className="relative flex h-full justify-between">
        <div
          className={`flex h-full w-full overflow-hidden bg-gradient-to-r from-${currentCoin.color}-200 via-transparent`}
        >
          <img
            src={currentCoin.coinImage}
            className="h-full scale-150 object-contain opacity-20"
          />
        </div>
        <div className="absolute flex h-full w-full justify-between p-4">
          <div>
            <Subtitle color="black">{currentCoin.name}</Subtitle>
            <Title className="text-2xl">{name}</Title>
          </div>
          <div className="flex flex-col justify-between">
            <div className="flex items-end justify-end gap-1">
              <Title className="text-2xl">${sgdExchange}</Title>
              <Subtitle className="text-lg">SGD</Subtitle>
            </div>
            <div className="flex items-end justify-end gap-1">
              <Title className="text-2xl">${usdExchange}</Title>
              <Subtitle className="text-lg">USD</Subtitle>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CurrencyCard;
