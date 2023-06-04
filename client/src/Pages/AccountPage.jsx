import React, { useState, useEffect } from "react";
import { Navbar } from "../components/index.js";
import { SignOut } from "../data.js";
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
  }, []);

  const handleLogOut = () => {
    SignOut();
    navigate("/");
  };

  const handleReturnMainScreen = () => {
    navigate("/");
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto w-3/5">
        <div className="items-top flex justify-center gap-4 p-14">
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
                <div></div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
