import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Button, Title, TextInput } from "@tremor/react";
import { SearchIcon, UserCircleIcon } from "@heroicons/react/outline";
import logo from "/investr-crypto-logo.svg";
import { useNavigate } from "react-router-dom";
import { USEREMAIL_STRING, performOAuth } from "../data";

const Navbar = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("Log In");

  const navigateToHome = () => {
    navigate("/");
  };

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
      setUsername(firstCapital + name);
      setLoggedIn(true);
    }
  }, []);

  return (
    <nav className="mb-5 flex bg-white px-8 py-4 drop-shadow-lg">
      <div className="container mx-auto">
        <div className="flex justify-between">
          <div className="flex space-x-10">
            <img
              className="cursor-pointer"
              src={logo}
              alt="logo"
              width={120}
              height={80}
              onClick={() => {
                navigateToHome();
              }}
            />
            <div className="flex items-center space-x-4">
              <Title>News</Title>
              <Title>Explore</Title>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <TextInput icon={SearchIcon} placeholder="Search..." />
            <Button
              icon={UserCircleIcon}
              onClick={() => {
                handleClick();
              }}
            >
              {username.split("@")[0]}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
