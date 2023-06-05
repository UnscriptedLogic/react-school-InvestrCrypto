//#region Imports and Initializers
import { v4 as uuidv4 } from "uuid";

import * as backend from "./functions.js";

//API aligned mock data
import bitcoin from "./bitcoinMarket.json" assert { type: "json" };
import ethereum from "./ethereumMarket.json" assert { type: "json" };
import dogecoin from "./dogecoinMarket.json" assert { type: "json" };
import manaCoin from "./manaMarket.json" assert { type: "json" };
import news from "./cryptoNews.json" assert { type: "json" };
import exchangeValue from "./exchangeValue.json" assert { type: "json" };

//Connection
import express from "express";
import cors from "cors";
const app = express();

const newsKey = "zv4cfqvscx5z00orcra7nkgwoqzr3uumqjb5fyuj";
const fidorURL = "https://api.tp.sandbox.fidorfzco.com";

app.use(
  cors({
    origin: "*",
  })
);

app.listen(5000, () => {
  console.log("Server started on port 5000");
});

//#endregion

//#region CoinGecko(2): https://www.coingecko.com/en/api/documentation

app.get("/allCoins", function (req, res) {
  let bitcoinData = bitcoin;
  let ethereumData = ethereum;
  let dogeData = dogecoin;
  let manaData = manaCoin;

  //Comment here to switch from mock to api
  const data = backend.getPrices(bitcoinData, ethereumData, dogeData, manaData);
  res.send(data);

  const days = 30;
  const interval = "daily";

  // fetch(
  //   `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=sgd&days=${days}&interval=${interval}`
  // )
  //   .then((response) => response.json())
  //   .then((json) => {
  //     bitcoinData = json;

  //     fetch(
  //       `https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=sgd&days=${days}&interval=${interval}`
  //     )
  //       .then((response) => response.json())
  //       .then((json) => {
  //         ethereumData = json;

  //         fetch(
  //           `https://api.coingecko.com/api/v3/coins/dogecoin/market_chart?vs_currency=sgd&days=${days}&interval=${interval}`
  //         )
  //           .then((response) => response.json())
  //           .then((json) => {
  //             dogeData = json;

  //             fetch(
  //               `https://api.coingecko.com/api/v3/coins/decentraland/market_chart?vs_currency=sgd&days=${days}&interval=${interval}`
  //             )
  //               .then((response) => response.json())
  //               .then((json) => {
  //                 manaData = json;

  //                 const data = backend.getPrices(
  //                   bitcoinData,
  //                   ethereumData,
  //                   dogeData,
  //                   manaData
  //                 );
  //                 res.send(data);
  //               });
  //           });
  //       });
  //   });
});

app.get("/allCoinsMarketCap", (req, res) => {
  let bitcoinData = bitcoin;
  let ethereumData = ethereum;
  let dogeData = dogecoin;
  let manaData = manaCoin;

  const data = backend.formatMarketCaps(
    bitcoinData,
    ethereumData,
    dogeData,
    manaData
  );
  res.send(data);

  const days = 30;
  const interval = "daily";

  // fetch(
  //   `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=sgd&days=${days}&interval=${interval}`
  // )
  //   .then((response) => response.json())
  //   .then((json) => {
  //     bitcoinData = json;

  //     fetch(
  //       `https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=sgd&days=${days}&interval=${interval}`
  //     )
  //       .then((response) => response.json())
  //       .then((json) => {
  //         ethereumData = json;

  //         fetch(
  //           `https://api.coingecko.com/api/v3/coins/dogecoin/market_chart?vs_currency=sgd&days=${days}&interval=${interval}`
  //         )
  //           .then((response) => response.json())
  //           .then((json) => {
  //             dogeData = json;

  //             fetch(
  //               `https://api.coingecko.com/api/v3/coins/decentraland/market_chart?vs_currency=sgd&days=${days}&interval=${interval}`
  //             )
  //               .then((response) => response.json())
  //               .then((json) => {
  //                 manaData = json;

  //                 const data = backend.formatMarketCaps(
  //                   bitcoinData,
  //                   ethereumData,
  //                   dogeData,
  //                   manaData
  //                 );
  //                 res.send(data);
  //               });
  //           });
  //       });
  //   });
});

app.get("/exchangeValues", (req, res) => {
  const data = backend.formatCryptoPrices(exchangeValue);
  res.send(data);
});

app.get("/allCoinsVolume", (req, res) => {
  let bitcoinData = bitcoin;
  let ethereumData = ethereum;
  let dogeData = dogecoin;
  let manaData = manaCoin;

  const data = backend.formatVolumes(
    bitcoinData,
    ethereumData,
    dogeData,
    manaData
  );
  res.send(data);

  const days = 30;
  const interval = "daily";

  // fetch(
  //   `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=sgd&days=${days}&interval=${interval}`
  // )
  //   .then((response) => response.json())
  //   .then((json) => {
  //     bitcoinData = json;

  //     fetch(
  //       `https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=sgd&days=${days}&interval=${interval}`
  //     )
  //       .then((response) => response.json())
  //       .then((json) => {
  //         ethereumData = json;

  //         fetch(
  //           `https://api.coingecko.com/api/v3/coins/dogecoin/market_chart?vs_currency=sgd&days=${days}&interval=${interval}`
  //         )
  //           .then((response) => response.json())
  //           .then((json) => {
  //             dogeData = json;

  //             fetch(
  //               `https://api.coingecko.com/api/v3/coins/decentraland/market_chart?vs_currency=sgd&days=${days}&interval=${interval}`
  //             )
  //               .then((response) => response.json())
  //               .then((json) => {
  //                 manaData = json;

  //                 const data = backend.formatVolumes(
  //                   bitcoinData,
  //                   ethereumData,
  //                   dogeData,
  //                   manaData
  //                 );
  //                 res.send(data);
  //               });
  //           });
  //       });
  //   });
});

//#endregion

//#region CryptoNewsAPI(1): https://cryptonews-api.com

app.get("/news", function (req, res) {
  let data = news;
  // fetch(
  //   `https://cryptonews-api.com/api/v1/category?section=general&items=3&page=1&token=${newsKey}`
  // )
  //   .then((response) => response.json())
  //   .then((json) => {
  //     data = json;

  //     for (const article of data.data) {
  //       article.date = backend.getDayAndDate(article.date);
  //     }

  //     res.send(data);
  //   });

  for (const article of data.data) {
    article.date = backend.getDayAndDate(article.date);
  }

  res.send(data);
});

//#endregion

//#region FIDOR

app.post("/transacttouser", (req, res) => {
  const access_token = req.query.access_token;
  const token_type = req.query.token_type;

  const accountID = req.query.account_id;
  const recieverEmail = req.query.recipient;
  const amount = req.query.amount;
  const subject = req.query.subject;

  console.log(amount);
  console.log(parseInt(amount));

  const params = {
    account_id: accountID,
    receiver: recieverEmail,
    external_uid: uuidv4().toString(),
    amount: parseInt(amount),
    subject: subject,
  };

  const url = `${fidorURL}/internal_transfers?${new URLSearchParams(params)}`;

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token_type} ${access_token}`,
      Accept: "application/vnd.fidor.de; version=1,text/json",
    },
  })
    .then((response) => response.json())
    .then((json) => res.send(json));
});

//User data
app.get("/getuserbankdata", (req, res) => {
  const access_token = req.query.access_token;
  const token_type = req.query.token_type;

  var url = `${fidorURL}/accounts`;

  fetch(url, {
    method: "GET",
    headers: {
      Authorization: `${token_type} ${access_token}`,
      Accept: "application/vnd.fidor.de; version=1,text/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((json) => res.send(json));
});

app.get("/getuserdata", (req, res) => {
  const access_token = req.query.access_token;
  const token_type = req.query.token_type;

  var url = `${fidorURL}/users/current`;

  fetch(url, {
    method: "GET",
    headers: {
      Authorization: `${token_type} ${access_token}`,
      Accept: "application/vnd.fidor.de; version=1,text/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((json) => res.send(json));
});

app.get("/getusertransactions", (req, res) => {
  const access_token = req.query.access_token;
  const token_type = req.query.token_type;

  const params = {
    per_page: "5",
  };

  var url = `${fidorURL}/transactions?${new URLSearchParams(
    params
  ).toString()}`;

  fetch(url, {
    method: "GET",
    headers: {
      Authorization: `${token_type} ${access_token}`,
      Accept: "application/vnd.fidor.de; version=1,text/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((json) => res.send(json));
});

//Token code request
app.get("/performOAuth", function (req, res) {
  const params = {
    client_id: "665a425af652c6e5",
    redirect_uri: "http://localhost:5173/callback",
    state: "",
    response_type: "code",
  };

  var url = `https://apm.tp.sandbox.fidorfzco.com/oauth/authorize?${new URLSearchParams(
    params
  ).toString()}`;
  res.header("Location", url);
  res.header("Access-Control-Allow-Headers", "*");
  res.send(302);
});

//Access token request
app.post("/requestToken", function (req, res) {
  const params = {
    grant_type: "authorization_code",
    code: req.query.code,
    redirect_uri: "http://localhost:5173/callback",
    client_id: "665a425af652c6e5",
  };

  var url = `https://apm.tp.sandbox.fidorfzco.com/oauth/token?${new URLSearchParams(
    params
  ).toString()}`;

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        "665a425af652c6e5:b8c625749684cd4226654003fba55a89"
      ).toString("base64")}`,
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((json) => res.send(json));
});
//#endregion
