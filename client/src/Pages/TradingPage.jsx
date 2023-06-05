import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ValueChart, Navbar, ExchangeRatesCard } from "../components/index";
import {
  Card,
  Title,
  Subtitle,
  Callout,
  Text,
  Divider,
  Button,
  TextInput,
} from "@tremor/react";

const TradingPage = () => {
  const { coin } = useParams();

  const handleReturnMainScreen = () => {};

  const performTransaction = () => {};

  let sender = "";
  let amount = 0;
  let subject = "";

  const setSender = (e) => {
    sender = e.target.value;
  };

  const setAmount = (e) => {
    amount = e.target.value;
  };

  const setSubject = (e) => {
    subject = e.target.value;
  };

  return (
    <div>
      <Navbar />
      <div className="mx-auto mt-10 w-2/5">
        <div className="mb-10 flex flex-grow flex-col gap-6">
          <div className="flex gap-4">
            <ValueChart />
            <ExchangeRatesCard />
          </div>
          <Card>
            <Title className="text-2xl">Trading {coin}</Title>
            <Divider className="m-2" />
            <div className="mt-4 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Text className="w-20">Reciever: </Text>
                <TextInput
                  onChange={setSender}
                  type="email"
                  placeholder="Account Email"
                />
              </div>
              <div className="flex items-center gap-2">
                <Text className="w-20">Amount: </Text>
                <TextInput
                  onChange={setAmount}
                  type="number"
                  placeholder="SGD in cents"
                />
              </div>
              <div className="flex items-center gap-2">
                <Text className="w-20">Note: </Text>
                <TextInput
                  onChange={setSubject}
                  placeholder="e.g. Thanks for the movie!"
                />
              </div>
              <div className="flex justify-between">
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    handleReturnMainScreen();
                  }}
                >
                  <Text className="mt-2 underline">Return to main screen</Text>
                </div>
                <Button
                  onClick={() => {
                    performTransaction();
                  }}
                >
                  Send
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TradingPage;
