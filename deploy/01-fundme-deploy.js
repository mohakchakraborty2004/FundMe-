// function deployFunc(){
//     console.log("hello")
// }

const { network } = require("hardhat");
require("dotenv").config();

const {networkConfig, devChains} = require("../helper-hardhat-config.js");
const verify = require("../utils/verify.js");

// module.exports = deployFunc;

module.exports =  async ({getNamedAccounts, deployments}) => {
    const {deploy , log} = deployments;
    const {deployer} = await getNamedAccounts();
    const chainId = network.config.chainId ;

    let ethUsdPriceFeedAddress 

    if(devChains.includes(network.name)){
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address

    }else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethAdd"]
    }
    const args = [ethUsdPriceFeedAddress];

    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: [ethUsdPriceFeedAddress],
        log: true
    })

    log("---------------------------------------")

    log("verification process")

    if(!devChains.includes(network.name) && process.env.ETHERSCAN_API_KEY){
     
     await verify(fundMe.address , args)
     
    }

  //  log(process.env.ETHERSCAN_API_KEY)

    log("-----verified successfully---------")
} 