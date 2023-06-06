import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import {
  ValueChart,
  Navbar,
  ExchangeRatesCard,
  VolumeChart,
  CandleChart,
} from "../components/index";
import {
  ACCESS_TOKEN_STRING,
  CapitalizeFirst,
  TOKEN_TYPE_STRING,
  TransactToUser,
  USERID_STRING,
  GetExchangeValues,
} from "../data.js";
import {
  Card,
  Title,
  Subtitle,
  Callout,
  Text,
  Divider,
  Button,
  TextInput,
  TabList,
  Tab,
} from "@tremor/react";
import { Coins } from "../classes";

const TradingPage = () => {
  const [user, setUser] = useState([]);
  const [ID, setID] = useState("Loading Account...");
  const [chart, setChart] = useState("value");
  const [exchangeRate, setExchangeRate] = useState(0);
  const [data, setData] = useState([]);
  const { coin } = useParams();
  const navigate = useNavigate();
  const usersCollectionRef = collection(db, "users");
  const currentCoin = Coins[coin];

  let sender = "studenta18@email.com";
  let amount = 0;
  let total = amount * exchangeRate;

  useEffect(() => {
    if (sessionStorage.getItem(USERID_STRING) !== null) {
      setID(sessionStorage.getItem(USERID_STRING));
    }

    GetExchangeValues().then((response) => {
      setData(response.data);

      for (let index = 0; index < response.data.length; index++) {
        const element = response.data[index];

        if (element.name == currentCoin.short) {
          setExchangeRate(element.SGD);
        }
      }
    });

    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      const users = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

      setUser();
    };

    getUsers();
  }, []);

  const handleReturnMainScreen = () => {
    navigate("/");
  };

  const setAmount = (e) => {
    amount = e.target.value;
    total = parseFloat(amount) * parseFloat(exchangeRate);
  };

  const performTransaction = () => {
    if (sessionStorage.getItem(ACCESS_TOKEN_STRING) === null) return;
    TransactToUser(
      sessionStorage.getItem(ACCESS_TOKEN_STRING),
      sessionStorage.getItem(TOKEN_TYPE_STRING),
      ID,
      sender,
      amount * exchangeRate,
      `INVESTR Crypto - ${ID} bought ${amount} ${currentCoin.short} for ${
        total / 100
      }`
    ).then((response) => {
      // RetrieveUserData();

      if (response.data["errors"] != undefined) {
        let errors = "";
        for (let index = 0; index < response.data["errors"].length; index++) {
          const error = response.data["errors"][index];
          let newError = `${error["field"]} ${error["message"]}`;

          if (index < response.data["errors"].length - 1) {
            newError += "\n";
          }

          errors += `${index + 1}. ${CapitalizeFirst(newError)}`;
        }

        toast.error(errors, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        toast.success(
          `Transferral of $${parseInt(response.data["amount"]) / 100} to ${
            response.data["receiver"]
          } successful!`,
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          }
        );
      }

      console.log(response);
    });
  };

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Navbar />
      <div className="mx-auto mt-10 w-2/3">
        <div className="mb-10 flex flex-grow flex-col gap-6">
          <TabList defaultValue="value" value={chart} onValueChange={setChart}>
            <Tab value="value" text="Daily Value" className="font-semibold" />
            <Tab value="volume" text="Daily Volume" className="font-semibold" />
            <Tab
              value="exchange"
              text="Exchange Rates"
              className="font-semibold"
            />
            <Tab value="candle" text="OHLC" className="font-semibold" />
          </TabList>
          {chart == "value" ? (
            <ValueChart />
          ) : chart == "volume" ? (
            <VolumeChart />
          ) : chart == "candle" ? (
            <CandleChart coin={currentCoin.short} />
          ) : (
            <ExchangeRatesCard />
          )}

          <div className="flex gap-2">
            <Card>
              <div className="flex gap-1 ">
                <Title className="text-3xl">Buying {currentCoin.short}</Title>
                <Subtitle className="text-xl">{currentCoin.name}</Subtitle>
              </div>
              <Divider className="m-2" />
              <div className="mt-4 flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <Text className="w-20">Amount: </Text>
                  <TextInput
                    onChange={setAmount}
                    type="number"
                    placeholder="BTC"
                  />
                </div>
                <div className="flex justify-between">
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      handleReturnMainScreen();
                    }}
                  >
                    <Text className="mt-2 underline">
                      Return to main screen
                    </Text>
                  </div>
                  <Button
                    onClick={() => {
                      performTransaction();
                    }}
                  >
                    Buy {currentCoin.name}
                  </Button>
                </div>
              </div>
            </Card>
            <Card>
              <div className="flex gap-1 ">
                <Title className="text-3xl">Selling {currentCoin.short}</Title>
                <Subtitle className="text-xl">{currentCoin.name}</Subtitle>
              </div>
              <Divider className="m-2" />
              <div className="mt-4 flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <Text className="w-20">Amount: </Text>
                  <TextInput
                    onChange={setAmount}
                    type="number"
                    placeholder="BTC"
                  />
                </div>
                <div className="flex justify-between">
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      handleReturnMainScreen();
                    }}
                  >
                    <Text className="mt-2 underline">
                      Return to main screen
                    </Text>
                  </div>
                  <Button
                    onClick={() => {
                      performTransaction();
                    }}
                  >
                    Selling {currentCoin.name}
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingPage;
