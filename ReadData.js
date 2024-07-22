const { ethers } = require("hardhat");

const {
    // eslint-disable-next-line max-len
    ONEINCHEXCHANGE_ABI, ONEINCHEXCHANGE_ADDRESS, DAI_ABI, DAI_ADDRESS, SAI_ABI, SAI_ADDRESS, USDT_ABI, USDT_ADDRESS,
  } = require('./utils/constants');

//Step - 1
// Use getDefaultProvider() function to get a provider for the mainnet
ethers.getDefaultProvider('https://mainnet.infura.io/v3/ad9a322ec8a34980b9f0c73a707aacf6');

//Step -2 Instance of contract to read the data and over here are read the balance of a whale(user)
async function init(){

    const daiConInstance = await ethers.getContractAt(DAI_ABI, DAI_ADDRESS);
    console.log("daibalance",await daiConInstance.balanceOf("0xBc761ee2Bb6eA585d2C400751b1670D46B4A3417"));
}

init();