const { network } = require("hardhat")
const { devChains, DECIMALS, INITIAL_ANSWER } = require("../helper-hardhat-config")

module.exports = async ({getNamedAccounts , deployments}) => {
const {deploy , log} = deployments
const {deployer} = await getNamedAccounts();
const chainId = network.config.chainId

if(devChains.includes(network.name)){
    log("------------local network---------")
    await deploy("MockV3Aggregator", {
     from : deployer, 
     args : [DECIMALS, INITIAL_ANSWER],
     log : true,
     waitConfirmations : network.config.blockConfirmations || 1,
    })

    log("mocks deployed")
    log("-----------------------------------")
}
}

module.exports.tags = ["mocks", "all"]