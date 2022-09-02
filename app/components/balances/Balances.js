import { useContext, useState, useEffect } from "react";
import { alchemy } from "../Alchemy";
import AppContext from "../AppContext";

const Balances = () => {
  const value = useContext(AppContext);
  const [balanceData, setBalanceData] = useState([]);
  const [count, setCount] = useState(0);
  const { isConnected, currentAccount } = value.state;

  const getNFTs = async () => {
    const nfts = await alchemy.nft.getNftsForOwner(currentAccount, {
      contractAddresses: [process.env.NEXT_PUBLIC_MAINNET_HEPIER_CONTRACT],
    });

    const _nftBalances = [];

    Object.keys(nfts).forEach((key, index) => {
      _nftBalances.push(nfts[key]);
    });

    setBalanceData(await _nftBalances);
  };

  if (currentAccount && count < 2) {
    getNFTs();
    setCount(count + 1);
    console.log(balanceData[0]);
  }

  console.log(balanceData);

  return (
    <div className="w-full md:w-1/2 px-3 pt-6 pb-6 mb-6 md:mb-0">
      <h3 className="pb-3">Balances</h3>
      {currentAccount ? (
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                Token ID
              </th>
              <th scope="col" className="py-3 px-6">
                Token Name
              </th>
              <th scope="col" className="py-3 px-6">
                Amount In Wallet
              </th>
              <th scope="col" className="py-3 px-6">
                Token Value
              </th>
            </tr>
          </thead>
          <tbody className="text-center">
            {balanceData[0] &&
              balanceData[0].map((token) => {
                return (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td scope="py-4 px-6 text-gray-900 dark:text-white">
                      {token.tokenId}
                    </td>
                    <td scope="py-4 px-6">{token.title}</td>
                    <td scope="py-4 px-6">{token.balance}</td>
                    {token.rawMetadata.attributes.length > 0 ? (
                      <td scope="py-4 px-6">
                        {token.rawMetadata.attributes[0].value}
                      </td>
                    ) : (
                      <td scope="py-4 px-6">no value</td>
                    )}
                  </tr>
                );
              })}
          </tbody>
        </table>
      ) : (
        <p>Connect wallet to fetch balance.</p>
      )}
    </div>
  );
};

export default Balances;
