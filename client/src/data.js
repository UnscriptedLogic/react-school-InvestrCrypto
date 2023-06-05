//#region Imports

import axios from "axios";

const rooturl = "http://localhost:5000";

export const ACCESS_TOKEN_STRING = "access_token";
export const REFRESH_TOKEN_STRING = "refresh_token";
export const TOKEN_TYPE_STRING = "token_type";

export const USEREMAIL_STRING = "user_email";
export const USERID_STRING = "user_id";
export const USERAFFILIATEID_STRING = "user_affiliate_id";

export const USERBANKDATA_STRING = "userbankdata";

//#endregion

//#region CoinGecko
export const GetAllCoinValues = () => {
  return axios.get(`${rooturl}/allCoins`);
};

export const GetExchangeValues = () => {
  return axios.get(`${rooturl}/exchangeValues`);
};

export const GetMarketCaps = () => {
  return axios.get(`${rooturl}/allCoinsMarketCap`);
};

export const GetTotalVolumes = () => {
  return axios.get(`${rooturl}/allCoinsVolume`);
};
//#endregion

//#region CryptoNews
export const GetNewsData = () => {
  return axios.get(`${rooturl}/news`);
};
//#endregion

//#region FIDOR

export const performOAuth = () => {
  window.location = `${rooturl}/performOAuth`;
};

export const requestToken = (code) => {
  axios
    .post(`${rooturl}/requestToken?code=${code}`, {
      code: code,
    })
    .then((response) => {
      console.log(response.data);
      const access_token = response.data[ACCESS_TOKEN_STRING];
      const refresh_token = response.data[REFRESH_TOKEN_STRING];
      const token_type = response.data[TOKEN_TYPE_STRING];

      sessionStorage.setItem(ACCESS_TOKEN_STRING, access_token);
      sessionStorage.setItem(REFRESH_TOKEN_STRING, refresh_token);
      sessionStorage.setItem(TOKEN_TYPE_STRING, token_type);

      getUserData(access_token, token_type);
    });
};

const getUserData = (access_token, token_type) => {
  axios
    .get(
      `${rooturl}/getuserdata?access_token=${access_token}&token_type=${token_type}`
    )
    .then((response) => {
      console.log(response.data);
      sessionStorage.setItem(USEREMAIL_STRING, response.data["email"]);
      sessionStorage.setItem(USERID_STRING, response.data["id"]);
      sessionStorage.setItem(
        USERAFFILIATEID_STRING,
        response.data["affiliate_uid"]
      );
      window.location.replace("http://localhost:5173");
    });
};

export const GetUserTransactions = (access_token, token_type) => {
  return axios.get(
    `${rooturl}/getusertransactions?access_token=${access_token}&token_type=${token_type}`
  );
};

export const GetUserBankData = (access_token, token_type) => {
  return axios.get(
    `${rooturl}/getuserbankdata?access_token=${access_token}&token_type=${token_type}`
  );
};

export const TransactToUser = (
  access_token,
  token_type,
  account_id,
  recipient,
  amount,
  subject
) => {
  return axios.post(
    `${rooturl}/transacttouser?access_token=${access_token}&token_type=${token_type}&account_id=${account_id}&recipient=${recipient}&amount=${amount}&subject=${subject}`
  );
};
//#endregion

//#region client related

export const SignOut = () => {
  sessionStorage.clear();
};

//#endregion

export const CapitalizeFirst = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};
