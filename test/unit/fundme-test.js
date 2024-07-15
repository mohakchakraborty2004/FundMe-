
const { assert } = require("chai");
const {deployments, ethers, getNamedAccounts} = require("hardhat");

// describe("FundMe", async ()=>{

// let fundMe
// let mockV3Aggregator
// let deployer
// beforeEach (async function(){

//   deployer = (await getNamedAccounts()).deployer
  
//   await deployments.fixture(["all"])



//   fundMe = await ethers.getContractAt(
//     "FundMe",  
//     deployer
// )



//   mockV3Aggregator = await ethers.getContractAt(
//     "MockV3Aggregator",
//     deployer
//   )
// })

// describe("constructor",  ()=>{
//     it("sets the aggregator address correctly", async ()=> {
//         const response = await fundMe.pricefeed()
//         assert.equal(response , await mockV3Aggregator.getAddress() )
//     })
// })

// })


describe("FundMe", async () => {
    let FundMe
    let signer
    let MockV3Aggregator
    beforeEach(async () => {
       // don't use (await getNamedAccounts()).deployer, as a parameter to the getContractAt function, it will report an error !!!
      const accounts = await ethers.getSigners()
      signer = accounts[0]   
      await deployments.fixture(["all"])
     
      // there is no getContract function in ethers, so using getContractAt
      const FundMeDeployment = await deployments.get("FundMe")
      FundMe = await ethers.getContractAt(
        FundMeDeployment.abi,
        FundMeDeployment.address,
        signer,
      )
      const MockV3AggregatorDeployment = await deployments.get(
        "MockV3Aggregator",
      )
      MockV3Aggregator = await ethers.getContractAt(
        MockV3AggregatorDeployment.abi,
        MockV3AggregatorDeployment.address,
        signer,
      )
    })
  
    describe("constructor", async () => {
      it("sets the aggregator address correctly", async () => {
        const response = await FundMe.pricefeed()
        assert.equal(response, MockV3Aggregator.target) // get address using target instead of address property
      })
    })
  })