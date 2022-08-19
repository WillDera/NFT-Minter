import { Network, Alchemy } from "alchemy-sdk";

const settings = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY,
  network: Network.MATIC_MUMBAI,
};

export const alchemy = new Alchemy(settings);
