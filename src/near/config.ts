import * as nearApi from "near-api-js";

export const config: nearApi.ConnectConfig = {
  networkId: "default",
  nodeUrl: "https://rpc.testnet.near.org",
  walletUrl: "https://wallet.testnet.near.org",
  helperUrl: "https://helper.testnet.near.org",
  headers: {

  },
  deps: {
    keyStore: new nearApi.keyStores.BrowserLocalStorageKeyStore(),
  },
};

export const HELLO_WORLD_CONTRACT = process.env.REACT_APP_HELLO_WORLD_CONTRACT || "" 
export const APP_KEY_PREFIX = "hello_world_89hb56ve8c4scty00y9ujythgef7t"
