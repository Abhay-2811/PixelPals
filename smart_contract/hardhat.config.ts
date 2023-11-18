import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import * as dotenv from 'dotenv'
import './tasks'
dotenv.config();

const private_key = process.env.PRIVATE_KEY;
const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks:{
    hardhat: {
      chainId: 31337
    },
    baseGoerli: {
      chainId: 84531,
      url: process.env.BASE_GOERLI_RPC_URL,
      accounts: [private_key]
    },
    optimismGoerli: {
      chainId: 420,
      url: process.env.OPTIMISM_GOERLI_RPC_URL,
      accounts: [private_key]
    },
    arbitrumTestnet: {
      chainId: 421613,
      url: process.env.ARBITRUM_TESTNET_RPC_URL,
      accounts: [private_key]
    },
    polygonMumbai: {
      chainId: 80001,
      url: process.env.POLYGON_MUMBAI_RPC_URL,
      accounts: [private_key]
    },
    avalancheFuji: {
      chainId: 43113,
      url: `https://api.avax-test.network/ext/bc/C/rpc`,
      accounts: [private_key]
    }
  }
};

export default config;

