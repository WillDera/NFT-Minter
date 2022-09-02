import { Network, Alchemy } from "alchemy-sdk";

const settings = {
  apiKey: process.env.NEXT_PUBLIC_MAINNET_ALCHEMY_KEY,
  network: Network.MATIC_MAINNET,
};

export const alchemy = new Alchemy(settings);
