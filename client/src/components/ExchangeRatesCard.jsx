import React, { useState, useEffect } from "react";
import { Waveform } from "@uiball/loaders";
import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
  Title,
  Badge,
} from "@tremor/react";
import { GetExchangeValues } from "../data";

const ExchangeRatesCard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    GetExchangeValues().then((response) => {
      setData(response.data);
      console.log(response.data);
    });
  }, []);

  if (data == undefined) {
    return (
      <Card
        decoration="top"
        decorationColor="green"
        className="flex flex-col items-center justify-center"
      >
        <Title>Today's Exchange Rates</Title>
        <Waveform size={30} speed={1} lineWeight={2.5} color="#dfdfdf" />
      </Card>
    );
  } else {
    return (
      <Card decoration="top" decorationColor="green">
        <Title>Today's Exchange Rates</Title>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Crypto</TableHeaderCell>
              <TableHeaderCell>SGD</TableHeaderCell>
              <TableHeaderCell>USD</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.name}>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  <Text>{item.SGD}</Text>
                </TableCell>
                <TableCell>
                  <Text>{item.USD}</Text>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    );
  }
};

export default ExchangeRatesCard;
