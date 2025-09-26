import React from "react";
import { ToastContainer } from "react-toastify";
import AuthContextProvider from "./context/AuthContextProvider";
import Router from "./router/Router";

const App = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <AuthContextProvider>
                <Router />
                <ToastContainer />
            </AuthContextProvider>
        </div>
    );
};

export default App;
