import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HashLoader from "react-spinners/HashLoader";
import { useAppDispatch, useAppSelector } from "./hook.ts";

// const isLoading =  useAppSelector((state) => state. )

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
                <ToastContainer
                    position="top-center"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
                <div className="relative">loading</div>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
