import { useContext, useState, useEffect } from "react";
import { alchemy } from "../Alchemy";
import AppContext from "../AppContext";

const Balances = () => {
  const value = useContext(AppContext);
  const [balanceData, setBalanceData] = useState([]);
  const [count, setCount] = useState(0);
  const { isConnected, currentAccount } = value.state;

  const getNFTs = async () => {
    const nfts = await alchemy.nft.getNftsForOwner(currentAccount);

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
    <div className="w-full md:w-1/3 px-3 pt-6 pb-6 mb-6 md:mb-0">
      <h3 className="pb-3">Balances</h3>
      {currentAccount ? (
        <table className="table-auto w-full max-w-sm">
          <thead>
            <tr>
              <th>Token ID</th>
              <th>Token Name</th>
              <th>Amount In Wallet</th>
              <th>Token Value</th>
            </tr>
          </thead>
          <tbody>
            {balanceData[0] &&
              balanceData[0].map((token) => {
                return (
                  <tr>
                    {token.contract.address ==
                      "0xec2ebecd4dedfc223a19a367032e0e557544888d" && (
                      <>
                        <td>{token.tokenId}</td>
                        <td>{token.title}</td>
                        <td>{token.balance}</td>
                        {token.rawMetadata.attributes.length > 0 ? (
                          <td>{token.rawMetadata.attributes[0].value}</td>
                        ) : (
                          <td>no value</td>
                        )}
                      </>
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
