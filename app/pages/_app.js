import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import "bootstrap/dist/css/bootstrap.css";
import AppContext from "../components/AppContext";
import { useState } from "react";

function MyApp({ Component, pageProps }) {
  const [isConnected, setIsConnected] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");
  const [provider, setProvider] = useState(undefined);

  return (
    <AppContext.Provider
      value={{
        state: {
          isConnected,
          currentAccount,
          provider,
        },
        setIsConnected,
        setCurrentAccount,
        setProvider,
      }}
    >
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}

export default MyApp;
