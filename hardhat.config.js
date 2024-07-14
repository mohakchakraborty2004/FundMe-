
require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");
require("@nomicfoundation/hardhat-verify")

const pvtKey = process.env.PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  defaultNetwork : "hardhat",
  networks : {
    Sepolia : {
      url: SEPOLIA_RPC_URL,
      accounts: [pvtKey],
      chainId: 11155111,
    }
  },
  namedAccounts: {
    deployer : {
      default : 0,
    },
    user : {
      default : 0,
    }
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: ETHERSCAN_API_KEY
  },
  sourcify: {
    // Disabled by default
    // Doesn't need an API key
    enabled: true
  }
};
