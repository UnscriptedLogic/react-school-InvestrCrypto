import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import {
  ACCESS_TOKEN_STRING,
  GetNewsData,
  GetUserTransactions,
  TOKEN_TYPE_STRING,
} from "../data";
import {
  Card,
  Title,
  Subtitle,
  Callout,
  Text,
  Divider,
  Button,
} from "@tremor/react";
import { Navbar } from "../components/index.js";
import elonMusk from "/elon-musk.jpg";
import profile from "/profile.png";
import { ExclamationIcon } from "@heroicons/react/solid";
import {
  USERAFFILIATEID_STRING,
  USEREMAIL_STRING,
  USERID_STRING,
} from "../data.js";
import {
  ValueChart,
  CurrencyCard,
  TransactionsCard,
} from "../components/index.js";
import { GetExchangeValues } from "../data";

const LandingPage = () => {
  const navigate = useNavigate();
  const [newsData, setNewsData] = useState();
  const [username, setUsername] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("Not Logged In");
  const [ID, setID] = useState("Not Logged In");
  const [affiliateID, setAffiliateID] = useState("Not Logged In");
  const [data, setData] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const handleClick = () => {
    if (!loggedIn) {
      performOAuth();
    } else {
      navigate("/account");
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem(USEREMAIL_STRING) !== null) {
      let email = sessionStorage.getItem(USEREMAIL_STRING);
      let firstCapital = email.charAt(0).toUpperCase();
      let name = email.slice(1);
      setUsername((firstCapital + name).split("@")[0]);
      setLoggedIn(true);
    }

    if (sessionStorage.getItem(USEREMAIL_STRING) !== null) {
      setEmail(sessionStorage.getItem(USEREMAIL_STRING));
    }

    if (sessionStorage.getItem(USERID_STRING) !== null) {
      setID(sessionStorage.getItem(USERID_STRING));
    }

    if (sessionStorage.getItem(USERAFFILIATEID_STRING) !== null) {
      setAffiliateID(sessionStorage.getItem(USERAFFILIATEID_STRING));
    }

    GetNewsData().then((response) => setNewsData(response.data));

    GetExchangeValues().then((response) => {
      setData(response.data);
    });

    if (sessionStorage.getItem(ACCESS_TOKEN_STRING) !== null) {
      GetUserTransactions(
        sessionStorage.getItem(ACCESS_TOKEN_STRING),
        sessionStorage.getItem(TOKEN_TYPE_STRING)
      ).then((response) => {
        console.log(response.data);
        setTransactions(response.data.data);
      });
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div className="mx-auto mt-20 w-2/3">
        <div className="mb-10 flex flex-grow gap-6">
          <div className="h-fit w-4/12">
            <img
              src={loggedIn ? elonMusk : profile}
              className="mb-6 rounded-full"
            />
            <Title className="text-2xl">{username}</Title>
            <Subtitle className="text-lg">{email}</Subtitle>
            <Button
              className="w-full"
              color="amber"
              onClick={() => {
                handleClick();
              }}
            >
              Profile
            </Button>
            <div className="flex flex-col gap-6">
              <div className="mt-4 flex flex-col gap-1">
                <Text>ID: {ID}</Text>
                <Text>Affiliate ID: {affiliateID}</Text>
              </div>
              <Callout
                title="Strict API Times"
                icon={ExclamationIcon}
                color="neutral"
              >
                Due to the nature of sandbox APIs, Investr is unable to provide
                you your account information past midnight to 6am. We apologies
                for any inconvenience caused.
              </Callout>
            </div>
          </div>
          <div className="flex h-fit w-full flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              {data.map((item, i) => (
                <CurrencyCard
                  key={i}
                  name={item.name}
                  sgdExchange={item.SGD}
                  usdExchange={item.USD}
                />
              ))}
            </div>
            <Divider className="mb-2 mt-2" />
            <div>
              <ValueChart />
            </div>
            <Divider className="mb-2 mt-2" />
            <div>
              <div className="flex flex-col gap-2">
                {transactions.map((item, i) => (
                  <TransactionsCard
                    key={i}
                    date={item["created_at"]}
                    id={item["id"]}
                    details={item["subject"]}
                    amount={item["amount"]}
                    currency_type={item["currency"]}
                    transac_type={item["transaction_type"]}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
