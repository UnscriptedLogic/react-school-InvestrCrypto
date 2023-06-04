import React, { useState, useEffect } from "react";
import logo from "/investr-crypto-logo.svg";
import "./RegistrationPage.css";
import { NewtonsCradle } from "@uiball/loaders";
import { requestToken } from "../data";

const RegistrationPage = () => {
  useEffect(() => {
    const code = window.location.search
      .substring(1)
      .split("&")[0]
      .split("=")[1];

    requestToken(code);
  }, []);

  return (
    <div className="body-tile flex h-screen w-full flex-col items-center justify-center gap-8">
      <div className="flex w-44 items-center justify-center">
        <img src={logo} className="w-full bg-cover" />
      </div>
      <NewtonsCradle size={60} speed={1} lineWeight={4} color="#3f3f3f" />
    </div>
  );
};

export default RegistrationPage;
