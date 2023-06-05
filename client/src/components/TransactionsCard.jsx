import React, { useState, useEffect } from "react";
import { Card, Title, Subtitle, Text, BadgeDelta } from "@tremor/react";

const TransactionsCard = ({
  subtitle,
  details,
  date,
  id,
  amount,
  currency_type,
  transac_type,
}) => {
  return (
    <Card
      className="flex justify-between drop-shadow-md"
      decoration="left"
      decorationColor={parseInt(amount) < 0 ? "amber" : "green"}
    >
      <div>
        <div className="flex items-end justify-start gap-1">
          <Subtitle className="text-lg">ID: </Subtitle>
          <Title className="text-2xl">{id}</Title>
        </div>
        <Subtitle className="text-md">{date.split("T")[0]}</Subtitle>
        <Subtitle className="text-md">{details}</Subtitle>
      </div>
      <div className="flex flex-col items-end justify-end">
        <BadgeDelta deltaType="unchanged">
          {transac_type.split("_")[1]}
        </BadgeDelta>
        <Title>
          <div className="flex items-end justify-end">
            <Title className="text-2xl">${parseFloat(amount) / 100}</Title>
            <Subtitle className="text-lg">{currency_type}</Subtitle>
          </div>
        </Title>
      </div>
    </Card>
  );
};

export default TransactionsCard;
