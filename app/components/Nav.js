import { ethers } from "ethers";
import { useState, useEffect, useContext } from "react";
import AppContext from "./AppContext";

const Nav = () => {
  const value = useContext(AppContext);
  const { isConnected, currentAccount } = value.state;

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Install metamask");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Logging in..");

        const provider = new ethers.providers.Web3Provider(ethereum);
        value.setProvider(provider);

        const Id = await provider.getNetwork();

        if (Id.chainId !== 137) {
          console.log("connect to polygon mainnet");
          alert("Connect to polygon mainnet");
          throw new error("Connect to polygon mainnet");
        }
        if (Id.chainId === 137) {
          value.setCurrentAccount(account);
          value.setIsConnected(true);
        }
      } else {
        console.log("No account found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // TODO: Comment this out later, and modify to implement disconnect feature.
  // const disconnectWallet = async () => {
  //   try {
  //     if (!ethereum) {
  //       console.log("Install metamask");
  //     }

  //     const account = await ethereum.request({
  //       method: "eth_requestAccounts",
  //       params: [{ eth_accounts: {} }],
  //     });

  //     setCurrentAccount(account);
  //     setIsConnected(false);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   isWalletConnect();
  // }, []);
  return (
    <>
      <nav className="w-full md:block md:w-auto">
        <div className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          {!isConnected && (
            <button
              className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              onClick={connectWallet}
            >
              Wallet login
            </button>
          )}
          {isConnected && (
            <div>
              <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                Logged in (
                <span>
                  {currentAccount.slice(0, 4)}....{currentAccount.slice(-4)}{" "}
                  <span className="text-sm-end">(mainnet)</span>
                </span>
                )
              </button>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};
export default Nav;
