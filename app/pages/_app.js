import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import "bootstrap/dist/css/bootstrap.css";
import AppContext from "../components/AppContext";
import { useState } from "react";

function MyApp({ Component, pageProps }) {
  const [isConnected, setIsConnected] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");
  return (
    <AppContext.Provider
      value={{
        state: {
          isConnected,
          currentAccount,
        },
        setIsConnected,
        setCurrentAccount,
      }}
    >
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}

export default MyApp;
