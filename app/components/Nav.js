import Link from "next/link";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { useContext } from "react";
import axios from "axios";
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
        console.log(account);
        console.log("Logging in..");
        const provider = new ethers.providers.Web3Provider(ethereum);
        const Id = await provider.getNetwork();
        console.log(Id.chainId);
        // const provider = new ethers.providers.getDefaultProvider(ethereum);
        // const { chainId } = provider.
        // console.log(chainId);
        if (Id.chainId !== 80001) {
          console.log("connect to mumbai testnet");
          alert("Connect to mumbai network");
          throw new error("Connect to mumbai network");
        }
        if (Id.chainId === 80001) {
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

  const headers = (access_token) => {
    const header = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    };

    value.setAccessToken(header);
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
                  {currentAccount.slice(0, 4)}....{currentAccount.slice(-4)}
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
