import bitcoinImg from "/bitcoin.png";
import ethereumImg from "/ethereum.png";
import dogecoinImg from "/dogecoin.png";
import decentralandImg from "/decentraland.png";

class Coin {
  constructor(name, short, color, desc, coinImage) {
    this.name = name;
    this.short = short;
    this.color = color;
    this.desc = desc;
    this.coinImage = coinImage;
  }
}

const Bitcoin = new Coin(
  "Bitcoin",
  "BTC",
  "amber",
  "The first cryptocurrency on the blockchain. Created by an unknown person by the alias of Nakamoto Satoshi",
  bitcoinImg
);

const Ethereum = new Coin(
  "Ethereum",
  "ETH",
  "gray",
  "A cryptocurrency used for smart contracts. The 2nd most popular cryptocurrency right after bitcoin",
  ethereumImg
);

const Dogecoin = new Coin(
  "Dogecoin",
  "DOGE",
  "amber",
  "A meme coin created by Elon Musk.",
  dogecoinImg
);

const Mana = new Coin(
  "Decentraland",
  "MANA",
  "blue",
  "A cryptocurrency used by the metaverse application Decentraland.",
  decentralandImg
);

export const Coins = {
  BTC: Bitcoin,
  ETH: Ethereum,
  DOGE: Dogecoin,
  MANA: Mana,
};
