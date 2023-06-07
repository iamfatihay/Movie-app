import React from "react";
import { ToastContainer } from "react-toastify";
import AuthContextProvider from "./context/AuthContextProvider";
import Router from "./router/Router";

const App = () => {
  return (
    <div className="dark:bg-[#23242a]">
      <AuthContextProvider>
        <Router />
        <ToastContainer />
      </AuthContextProvider>
    </div>
  );
};

export default App;
