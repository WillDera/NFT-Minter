import styles from "../styles/Home.module.css";
import { Web3Storage, File } from "web3.storage";
import abi from "./abi/Hepier.json";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import Nav from "./components/Nav";

export default function Home() {
  const getContract = async () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();

    const contractAddress = process.env.NEXT_PUBLIC_HEPIER_CONTRACT;
    const contractAbi = abi.abi;

    const contract = new ethers.Contract(contractAddress, contractAbi, signer);

    return contract;
  };

  const getAccessToken = () => {
    return process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN;
  };

  const makeStorageClient = () => {
    return new Web3Storage({ token: getAccessToken() });
  };

  const getImageLink = async () => {
    // get file
    const file = document.querySelector('input[type="file"]');

    // upload file
    const client = makeStorageClient();
    const cid = await client.put(file.files);

    // construct file url and return
    const imageUri = `https://${cid}.ipfs.dweb.link/${file.files[0].name}`;

    return imageUri;
  };

  const generateData = async (data) => {
    if (!data.shortDescription)
      data.shortDescription = `Desc: ${data.tokenName}`;

    const imageUri = await getImageLink();

    const metadata = {
      name: data.tokenName,
      description: data.shortDescription,
      image: imageUri,
      attributes: [{ trait_type: "Token Value", value: data.tokenValue }],
    };

    return metadata;
  };

  const makeFile = async (data) => {
    const obj = await generateData(data);
    const blob = Buffer.from(JSON.stringify(obj));

    const file = [new File([blob], "metadata.json")];

    return file;
  };

  const storeData = async (data) => {
    const client = makeStorageClient();
    const file = await makeFile(data);

    const cid = await client.put(file);

    const cidLink = `https://${cid}.ipfs.dweb.link/metadata.json`;

    return cidLink;
  };

  const mintAndSetURI = async (amount, uri) => {
    const contract = await getContract();

    const mintTokens = await contract.mint(amount);
    await mint.wait();

    const setUri = await contract.setUri(uri);
    await setUri.wait();

    console.log("Head to opensea");
  };

  const submit = async (event) => {
    event.preventDefault();
    const { tokenName, shortDescription, amountToMint, tokenValue } =
      event.target;

    const data = {
      tokenName: tokenName.value,
      shortDescription: shortDescription.value,
      amountToMint: amountToMint.value,
      tokenValue: tokenValue.value,
    };
    // const owner = await getContract();
    // console.log(owner);

    // // mint token and set uri
    // await mintAndSetURI(data)

    // mint the token
    const hepierContract = await getContract();
    const mintToken = await hepierContract.mint(data.amountToMint);
    await mintToken.wait();

    // store data on ipfs
    const uri = await storeData(data);

    // set uri to token which was just minted
    const seturi = await hepierContract.setURI(uri);
    await seturi.wait();

    // console.log(data);
    // console.log(await owner.owner());
    // console.log(process.env.NEXT_PUBLIC_HEPIER_CONTRACT);

    //     const web3 = new Web3(window.ethereum);

    // const contract = web3.eth.Contract(abi,Contractaddress);

    // const data = contract.methods.randomFunction.send({from: `${account[0]}`});

    // await storeData(data);
    // console.log(amount.value);
  };

  return (
    <div className={styles.container}>
      <Nav />
      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <h3>Mint</h3>
        <form onSubmit={submit} className="w-full max-w-sm pt-2 pb-4">
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-token-name"
              >
                Token Name
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-token-name"
                name="tokenName"
                type="text"
                placeholder="Token name"
                required
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="file_input"
              >
                Upload file
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="file_input"
                name="file"
                type="file"
              />
              <p
                className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                id="file_input_help"
              >
                SVG, PNG, JPG or GIF (MAX. 800x400px).
              </p>
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-short-description"
              >
                Short Description
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-short-description"
                name="shortDescription"
                type="text"
                placeholder="Short description for token"
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-token-value"
              >
                Token Value
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-token-value"
                name="tokenValue"
                type="number"
                placeholder="Token value"
                required
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-token-amount"
              >
                Amount To Mint
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-token-amount"
                name="amountToMint"
                type="number"
                placeholder="Amount of token to be minted"
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
                Mint
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="flex flex-wrap mx-3 mb-2 pt-4">
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <h3 className="pb-3">Balances</h3>
          <table className="table-auto w-full max-w-sm">
            <thead>
              <tr>
                <th>Token ID</th>
                <th>Token Name</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Dummy ID</td>
                <td>Dummy ID</td>
                <td>Dummy ID</td>
              </tr>
              <tr>
                <td>Dummy Name</td>
                <td>Dummy Name</td>
                <td>Dummy Name</td>
              </tr>
              <tr>
                <td>Dummy Amount</td>
                <td>Dummy Amount</td>
                <td>Dummy Amount</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <h3>Transfer</h3>
          <form className="w-full max-w-sm pt-2 pb-4">
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
                  name="tokenDd"
                  type="text"
                  placeholder="Token ID"
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-token-receiver"
                >
                  Recepient
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-token-receiver"
                  name="tokenReceiver"
                  type="text"
                  placeholder="Address(es)"
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
                  type="text"
                  placeholder="How many to transfer"
                />
              </div>
            </div>
            <div className="md:flex md:items-center">
              <div className="md:w-1/3"></div>
              <div className="md:w-2/3">
                {/* <button
                  className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                  type="submit"
                >
                  Transfer
                </button> */}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
