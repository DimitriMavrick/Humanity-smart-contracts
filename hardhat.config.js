/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
require('@nomiclabs/hardhat-waffle');
require('hardhat-tracer');
require('solidity-coverage');

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: '0.8.4',
    settings: {
      metadata: {
        bytecodeHash: 'none',
      },
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      forking: {
        url: "https://mainnet.infura.io/v3/ad9a322ec8a34980b9f0c73a707aacf6",
      },
      accounts: {
        mnemonic: 'caught answer clump also artefact shell cool any grant wise twenty shed',
      },
   
      chainId: 1,
    },
    
  },
  paths: {
    artifacts: './artifacts',
    cache: './cache',
    sources: './contracts',
    tests: './test',
  },
  mocha: {
    useColors: true,
    timeout: 1000000,
  },
};
