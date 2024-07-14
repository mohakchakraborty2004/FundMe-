// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;
import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

contract FundMe {

   uint256 public constant minUSD = 50 * 1e18;

   address[] public funders;
   mapping(address => uint256) public addressToAmount;

   address public immutable i_owner;

    AggregatorV3Interface public pricefeed ;

   constructor(address pricefeedAddress){
     i_owner = msg.sender ;
     pricefeed =  AggregatorV3Interface(pricefeedAddress);
   }

   function fund() public payable {
    //i want to recieve at least 1 ether lets say 
    require(getConversionRate(msg.value, pricefeed) > minUSD, "not enough fund");
    funders.push(msg.sender);
    addressToAmount[msg.sender] = msg.value;
   }

   function getPrice(AggregatorV3Interface apricefeed ) public view returns (uint256) {
      //abi and address of the contract through which we gonna get the price 
      // 0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419

     // AggregatorV3Interface pricefeed = AggregatorV3Interface( _pricefeedAddress );

       ( /* uint80 roundID */,
            int answer,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/) = apricefeed.latestRoundData();
       return uint256(answer * 1e10);
       
   }

   function getConversionRate(uint256 ethAmount,  AggregatorV3Interface _pricefeed ) public view returns (uint256){
      uint256 ethPrice = getPrice(_pricefeed);
      uint256 ethAmountInUsd = (ethPrice * ethAmount) / 1e18;
      return ethAmountInUsd;
   }

   function withdraw() public OnlyOwner {
     //call

     (bool callSuccess,) = payable(msg.sender).call{value : address(this).balance}("");
     require(callSuccess , "failed call");

   }


   modifier OnlyOwner{
        require(msg.sender == i_owner, "not owner");
        _;
   }
 
   receive() external payable {
      fund();
    }

   fallback() external payable {
      fund();
    } 
  



}