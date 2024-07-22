// require("@nomiclabs/hardhat-etherscan");
// require("@nomiclabs/hardhat-waffle");
async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
    const WPIXEL_SUPPLY = '10000000000000'; 
    const WPixel = await ethers.getContractFactory('PixelToken');
    wPixelConInstance = await WPixel.deploy(WPIXEL_SUPPLY);
  
    console.log("Token address:", await wPixelConInstance.address);
    await run(`verify:verify`, {
      address: wPixelConInstance.address,
      constructorArguments: [10000000000000],
    });
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });