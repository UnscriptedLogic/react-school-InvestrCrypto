export const getPrices = (bitcoin, ethereum, doge, mana) => {
  //fetching data
  const bitcoinJson = bitcoin;
  const ethereumJson = ethereum;
  const dogeJson = doge;
  const manaJson = mana;

  //result
  const marketPrices = [];

  //Adding bitcoin
  for (const price of bitcoinJson.prices) {
    const priceObject = {
      time: toSingaporeDate(price[0]),
      BTC: price[1],
      ETH: 0,
      DOGE: 0,
      MANA: 0,
    };

    marketPrices.push(priceObject);
  }

  //Adding ethereum
  for (const price of ethereumJson.prices) {
    const marketPrice = marketPrices.find(
      (p) => p.time === toSingaporeDate(price[0])
    );
    marketPrice.ETH = price[1];
  }

  //Adding doge
  for (const price of dogeJson.prices) {
    const marketPrice = marketPrices.find(
      (p) => p.time === toSingaporeDate(price[0])
    );
    marketPrice.DOGE = price[1];
  }

  //Adding mana
  for (const price of manaJson.prices) {
    const marketPrice = marketPrices.find(
      (p) => p.time === toSingaporeDate(price[0])
    );
    marketPrice.MANA = price[1];
  }

  //Error clean up
  for (let i = 0; i < marketPrices.length; i++) {
    if (i == 0) continue;

    if (marketPrices[i].BTC == 0) {
      marketPrices[i].BTC = marketPrices[i - 1].BTC;
    }

    if (marketPrices[i].ETH == 0) {
      marketPrices[i].ETH = marketPrices[i - 1].ETH;
    }

    if (marketPrices[i].DOGE == 0) {
      marketPrices[i].DOGE = marketPrices[i - 1].DOGE;
    }

    if (marketPrices[i].MANA == 0) {
      marketPrices[i].MANA = marketPrices[i - 1].MANA;
    }
  }

  return marketPrices;
};

const toSingaporeDate = (timestamp) => {
  // Convert timestamp to Date object
  const date = new Date(timestamp);

  // Get the Singapore time zone
  const timeZone = "Asia/Singapore";

  // Format the Date object to Singapore date
  const singaporeDate = date.toLocaleDateString("en-SG", {
    timeZone: timeZone,
    month: "long",
    day: "numeric",
  });

  // Return the Singapore date
  return singaporeDate;
};

export const getDayAndDate = (dateString) => {
  // Split the date string into an array of parts.
  const parts = dateString.split(" ");

  // Get the day of the week.
  const dayOfWeek = parts[0];

  // Get the date.
  const date = parts[1];

  // Return the day and date as a string.
  return `${dayOfWeek} ${date}`;
};

export const formatCryptoPrices = (json) => {
  const formattedPrices = [];

  for (const [currency, price] of Object.entries(json)) {
    const name =
      currency === "bitcoin"
        ? "BTC"
        : currency === "ethereum"
        ? "ETH"
        : currency === "dogecoin"
        ? "DOGE"
        : "MANA";

    const sgdPrice = price.sgd;
    const usdPrice = price.usd;

    const formattedPrice = {
      name,
      SGD: sgdPrice,
      USD: usdPrice,
    };

    formattedPrices.push(formattedPrice);
  }

  return formattedPrices;
};

export const formatMarketCaps = (bitcoin, ethereum, doge, mana) => {
  //fetching data
  const bitcoinJson = bitcoin;
  const ethereumJson = ethereum;
  const dogeJson = doge;
  const manaJson = mana;

  const dataReduce = 0;

  //result
  const marketCaps = [];

  //Adding bitcoin
  for (const caps of bitcoinJson["market_caps"]) {
    const coinCaps = {
      time: toSingaporeDate(caps[0]),
      BTC: caps[1],
      ETH: 0,
      DOGE: 0,
      MANA: 0,
    };

    marketCaps.push(coinCaps);
  }

  //Adding ethereum
  for (const coinCap of ethereumJson["market_caps"]) {
    const marketPrice = marketCaps.find(
      (p) => p.time === toSingaporeDate(coinCap[0])
    );
    marketPrice.ETH = coinCap[1];
  }

  //Adding doge
  for (const price of dogeJson["market_caps"]) {
    const marketPrice = marketCaps.find(
      (p) => p.time === toSingaporeDate(price[0])
    );
    marketPrice.DOGE = price[1];
  }

  //Adding mana
  for (const price of manaJson["market_caps"]) {
    const marketPrice = marketCaps.find(
      (p) => p.time === toSingaporeDate(price[0])
    );
    marketPrice.MANA = price[1];
  }

  //Error clean up
  for (let i = 0; i < marketCaps.length; i++) {
    if (i == 0) continue;

    if (marketCaps[i].BTC == 0) {
      marketCaps[i].BTC = marketCaps[i - 1].BTC;
    }

    if (marketCaps[i].ETH == 0) {
      marketCaps[i].ETH = marketCaps[i - 1].ETH;
    }

    if (marketCaps[i].DOGE == 0) {
      marketCaps[i].DOGE = marketCaps[i - 1].DOGE;
    }

    if (marketCaps[i].MANA == 0) {
      marketCaps[i].MANA = marketCaps[i - 1].MANA;
    }
  }

  return marketCaps;
};

export const formatVolumes = (bitcoin, ethereum, doge, mana) => {
  //fetching data
  const bitcoinJson = bitcoin;
  const ethereumJson = ethereum;
  const dogeJson = doge;
  const manaJson = mana;

  //result
  const totalVolumes = [];

  //Adding bitcoin
  for (const volume of bitcoinJson["total_volumes"]) {
    const coinVolumes = {
      time: toSingaporeDate(volume[0]),
      BTC: volume[1],
      ETH: 0,
      DOGE: 0,
      MANA: 0,
    };

    totalVolumes.push(coinVolumes);
  }

  //Adding ethereum
  for (const coinVolume of ethereumJson["total_volumes"]) {
    const currCoinVolume = totalVolumes.find(
      (p) => p.time === toSingaporeDate(coinVolume[0])
    );
    currCoinVolume.ETH = coinVolume[1];
  }

  //Adding doge
  for (const coinVolume of dogeJson["total_volumes"]) {
    const currCoinVolume = totalVolumes.find(
      (p) => p.time === toSingaporeDate(coinVolume[0])
    );
    currCoinVolume.DOGE = coinVolume[1];
  }

  //Adding mana
  for (const coinVolume of manaJson["total_volumes"]) {
    const currCoinVolume = totalVolumes.find(
      (p) => p.time === toSingaporeDate(coinVolume[0])
    );
    currCoinVolume.MANA = coinVolume[1];
  }

  //Error clean up
  for (let i = 0; i < totalVolumes.length; i++) {
    if (i == 0) continue;

    if (totalVolumes[i].BTC == 0) {
      totalVolumes[i].BTC = totalVolumes[i - 1].BTC;
    }

    if (totalVolumes[i].ETH == 0) {
      totalVolumes[i].ETH = totalVolumes[i - 1].ETH;
    }

    if (totalVolumes[i].DOGE == 0) {
      totalVolumes[i].DOGE = totalVolumes[i - 1].DOGE;
    }

    if (totalVolumes[i].MANA == 0) {
      totalVolumes[i].MANA = totalVolumes[i - 1].MANA;
    }
  }

  return totalVolumes;
};
