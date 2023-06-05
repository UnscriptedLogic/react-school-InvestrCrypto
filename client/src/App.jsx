import { Routes, Route } from "react-router-dom";
import * as Pages from "./Pages/index.js";
import { Navbar } from "./components/index.js";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Pages.LandingPage />} />
        <Route path="/callback" element={<Pages.RegistrationPage />} />
        <Route path="/account" element={<Pages.AccountPage />} />
        <Route path="/news" element={<Pages.NewsPage />} />
        <Route path="/trade/:coin" element={<Pages.TradingPage />} />
      </Routes>
    </div>
  );
};

export default App;
