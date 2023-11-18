declare namespace NodeJS {
    interface ProcessEnv {
        PRIVATE_KEY: string,
        OPTIMISM_GOERLI_RPC_URL: string,
        ARBITRUM_TESTNET_RPC_URL: string,
        POLYGON_MUMBAI_RPC_URL: string,
        BASE_GOERLI_RPC_URL: string
    }
  }