import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navbar } from "../components/index.js";
import {
  ACCESS_TOKEN_STRING,
  CapitalizeFirst,
  GetUserBankData,
  SignOut,
  TOKEN_TYPE_STRING,
  TransactToUser,
  USERBANKDATA_STRING,
} from "../data.js";
import { useNavigate } from "react-router-dom";
import { ExclamationIcon } from "@heroicons/react/solid";
import {
  Card,
  Title,
  Subtitle,
  TabList,
  Tab,
  Text,
  Button,
  Callout,
  Divider,
  TextInput,
} from "@tremor/react";
import {
  USERAFFILIATEID_STRING,
  USEREMAIL_STRING,
  USERID_STRING,
} from "../data.js";

const AccountPage = () => {
  const navigate = useNavigate();
  const [showTab, setShowTab] = useState("details");
  const [email, setEmail] = useState("Loading Account...");
  const [ID, setID] = useState("Loading Account...");
  const [affiliateID, setAffiliateID] = useState("Loading Account...");
  const [bankData, setBankData] = useState();
  const [transactionMade, setTransactionMade] = useState(false);

  let sender = "";
  let amount = 0;
  let subject = "";

  useEffect(() => {
    if (sessionStorage.getItem(USEREMAIL_STRING) !== null) {
      setEmail(sessionStorage.getItem(USEREMAIL_STRING));
    }

    if (sessionStorage.getItem(USERID_STRING) !== null) {
      setID(sessionStorage.getItem(USERID_STRING));
    }

    if (sessionStorage.getItem(USERAFFILIATEID_STRING) !== null) {
      setAffiliateID(sessionStorage.getItem(USERAFFILIATEID_STRING));
    }

    if (sessionStorage.getItem(ACCESS_TOKEN_STRING) !== null) {
      RetrieveUserData();
    }
  }, []);

  const RetrieveUserData = () => {
    GetUserBankData(
      sessionStorage.getItem(ACCESS_TOKEN_STRING),
      sessionStorage.getItem(TOKEN_TYPE_STRING)
    ).then((response) => {
      sessionStorage.setItem(
        USERBANKDATA_STRING,
        JSON.stringify(response.data.data[0])
      );
      setBankData(response.data.data[0]);
    });
  };

  const handleLogOut = () => {
    SignOut();
    navigate("/");
  };

  const handleReturnMainScreen = () => {
    navigate("/");
  };

  const performTransaction = () => {
    if (sessionStorage.getItem(ACCESS_TOKEN_STRING) === null) return;

    TransactToUser(
      sessionStorage.getItem(ACCESS_TOKEN_STRING),
      sessionStorage.getItem(TOKEN_TYPE_STRING),
      ID,
      sender,
      amount,
      subject
    ).then((response) => {
      RetrieveUserData();

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
      <div className="container mx-auto w-3/5">
        <div className="items-top flex flex-col justify-center gap-4 p-14">
          <Card>
            <Title className="text-xl">Accounts and Transactions</Title>
            <Subtitle>Brought to you by FIDOR sandbox services</Subtitle>
            <TabList
              defaultValue="combined"
              value={showTab}
              onValueChange={setShowTab}
              className="mt-2"
            >
              <Tab value="details" text="Details" className="font-semibold" />
              <Tab value="transfer" text="Transfer" className="font-semibold" />
            </TabList>
            <div>
              {showTab == "details" ? (
                <div className="flex flex-col gap-6">
                  <div className="mt-4 flex flex-col gap-1">
                    <Text>ID: {ID}</Text>
                    <Text>Email: {email}</Text>
                    <Text>Affiliate ID: {affiliateID}</Text>
                  </div>
                  <Callout
                    title="Account Modification Disabled"
                    icon={ExclamationIcon}
                    color="yellow"
                  >
                    Changes to your account and it's details are to be made at
                    FIDOR's website. We do not contain rights to modify your
                    account over here at Investr.
                  </Callout>
                  <div className="flex justify-between gap-4">
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
                      color="yellow"
                      onClick={() => {
                        handleLogOut();
                      }}
                    >
                      Log Out
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="mt-4 flex justify-between">
                    <div className="flex flex-col gap-1">
                      <Text>Nick: {bankData["nick"]}</Text>
                      <Text>Account No.: {bankData["account_number"]}</Text>
                      <Text>Account ID: {bankData["id"]}</Text>
                      <Text>Creation Time: {bankData["created_at"]}</Text>
                      <Text>BIC: {bankData["bic"]}</Text>
                    </div>
                    <div className="flex flex-col items-end justify-end">
                      <Text>Balance:</Text>
                      <Title>
                        {bankData["currency"]} $
                        {parseFloat(bankData["balance"]) / 100}
                      </Title>
                    </div>
                  </div>
                  <Divider className="mb-4 mt-4" />
                  <Title>FIDOR Internal Transfer</Title>
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
                        <Text className="mt-2 underline">
                          Return to main screen
                        </Text>
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
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
