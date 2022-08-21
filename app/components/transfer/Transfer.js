const Transfer = ({ contract }) => {
  const initiateTransfer = async (event, contract) => {
    event.preventDefault();
    const { tokenId, tokenReceiver, transferAmount } = event.target;

    const data = {
      tokenId: tokenId.value,
      tokenReceiver: [tokenReceiver.value.split(",")],
      transferAmount: transferAmount.value,
    };

    // console.log(data);

    await contractTransaction(contract, data);
  };

  const contractTransaction = async (_hepierContract, data) => {
    const hepierContract = await contract;
    const { tokenId, tokenReceiver, transferAmount } = data;

    // initiate transfer
    const transfer = await hepierContract.multiTransfer(
      tokenReceiver[0],
      tokenId,
      transferAmount
    );
    await transfer.wait();

    // return something
    console.log("Done: ", transfer);
  };

  return (
    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <h3>Transfer</h3>
      <form
        onSubmit={(e) => initiateTransfer(e, contract)}
        className="w-full max-w-sm pt-2 pb-4"
      >
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="inline-token-id"
            >
              Token ID
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-token-id"
              name="tokenId"
              type="text"
              placeholder="Token ID"
              required
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="inline-token-receiver"
            >
              Recepient(s)
              <p> </p>
            </label>
          </div>
          <div className="md:w-2/3">
            <textarea
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-token-receiver"
              name="tokenReceiver"
              type="text"
              placeholder="Single address or Multiple addresses separated by a comma"
              required
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="inline-transfer-amount"
            >
              Amount
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-transfer-amount"
              name="transferAmount"
              type="number"
              placeholder="How many to transfer to each address"
              required
            />
          </div>
        </div>
        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <button
              className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Transfer
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Transfer;
