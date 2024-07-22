// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.0;

import {IUniswapV2Router02} from "./interfaces/IUniswapV2Router02.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface IERC20 {
    function balanceOf(address owner) external view returns (uint);
    function transfer(address to, uint value) external returns (bool);
    function transferFrom(address from, address to, uint value) external returns (bool);
}

contract MigratorAndFeeDistributor is Ownable {
    // upto two decimal places so 10000 = 100%
    uint public swapTriggerPercentage = 1000;
    uint public purchaseTaxPercentage = 800;
    uint public salesTaxPercentage = 900;

    address public swapTrigger;
    address public purchaseTax;
    address public salesTax;
    uint256 public migrationReserve;
    IERC20 public newHMNToken;
    IERC20 public oldHMNToken;

    IUniswapV2Router02 public router;

    // Event to log changes in tax and swap configuration
    event TaxAndSwapConfigChanged(uint swapTrigger, uint purchaseTax, uint salesTax);
    event EthFeeDistributed(uint256 swapTriggerEthAmount, uint256 purchaseTaxEthAmount, uint256 salesTaxEthAmount);
    event FeeDistributed(address indexed feeToken, uint256 swapTriggerAmount, uint256 purchaseTaxAmount, uint256 salesTaxAmount);
    event AddressesConfigured(address swapTrigger, address purchaseTax, address salesTax);

    constructor(IUniswapV2Router02 _router) {
        router = _router;
    }

    // Function to configure all three values at once
    function configureTaxAndSwap(uint _swapTrigger, uint _purchaseTax, uint _salesTax) external onlyOwner {
        require(_swapTrigger + _purchaseTax + _salesTax <= 10000, "Invalid values");

        swapTriggerPercentage = _swapTrigger;
        purchaseTaxPercentage = _purchaseTax;
        salesTaxPercentage = _salesTax;

        emit TaxAndSwapConfigChanged(swapTriggerPercentage, purchaseTaxPercentage, salesTaxPercentage);
    }
    
    // Function to configure addresses for swapTrigger, purchaseTax, and salesTax
    function configureAddresses(address _swapTrigger, address _purchaseTax, address _salesTax) external onlyOwner {
        require(_swapTrigger != address(0) && _purchaseTax != address(0) && _salesTax != address(0), "Addresses cannot be zero");
        
        swapTrigger = _swapTrigger;
        purchaseTax = _purchaseTax;
        salesTax = _salesTax;

        emit AddressesConfigured(swapTrigger, purchaseTax, salesTax);
    }

    function feeDistributor(address[] calldata _feeTokens) external onlyOwner {
        uint256 feeTokenLength = _feeTokens.length;
        uint256 totalFee = swapTriggerPercentage + purchaseTaxPercentage + salesTaxPercentage;

        // Check contract's ETH balance
        uint256 ethBalance = address(this).balance;
        if(ethBalance > 0){
            
            // Distribute ETH if present
            uint256 swapTriggerEthAmount = (ethBalance * swapTriggerPercentage) / totalFee;
            uint256 purchaseTaxEthAmount = (ethBalance * purchaseTaxPercentage) / totalFee;
            uint256 salesTaxEthAmount = (ethBalance * salesTaxPercentage) / totalFee;

            // Transfer ETH to respective addresses
            payable(swapTrigger).transfer(swapTriggerEthAmount);
            payable(purchaseTax).transfer(purchaseTaxEthAmount);
            payable(salesTax).transfer(salesTaxEthAmount);
        }
        address feeToken;
        uint256 balance ;
        uint256 swapTriggerAmount;
        uint256 purchaseTaxAmount ;
        uint256 salesTaxAmount ;

        // Distribute ERC20 tokens
        for (uint256 i = 0; i < feeTokenLength; i++) {
            feeToken = _feeTokens[i];
            balance = (feeToken == address(newHMNToken))
                ? newHMNToken.balanceOf(address(this)) - migrationReserve
                : IERC20(feeToken).balanceOf(address(this));

            // Ensure token balance is greater than zero before transferring
            if(balance > 0){
                swapTriggerAmount = (balance * swapTriggerPercentage) / totalFee;
                purchaseTaxAmount = (balance * purchaseTaxPercentage) / totalFee;
                salesTaxAmount = (balance * salesTaxPercentage) / totalFee;

                // Transfer ERC20 tokens to respective addresses
                require(IERC20(feeToken).transfer(swapTrigger, swapTriggerAmount), "Transfer to swapTrigger failed");
                require(IERC20(feeToken).transfer(purchaseTax, purchaseTaxAmount), "Transfer to purchaseTax failed");
                require(IERC20(feeToken).transfer(salesTax, salesTaxAmount), "Transfer to salesTax failed");
            }
            // Emit events for transparency
            emit FeeDistributed(feeToken, swapTriggerAmount, purchaseTaxAmount, salesTaxAmount);
        }
    }

    function setHMNTokensAddresses(IERC20 _newHMNToken, IERC20 _oldHMNToken) external onlyOwner {
        require(address(_newHMNToken) != address(0) && address(_oldHMNToken) != address(0), "Invalid token addresses");
        newHMNToken = _newHMNToken;
        oldHMNToken = _oldHMNToken;
    }

    // (900,000,000 * number of old tokens) / 1,000,000,000,000
    function migrate(uint256 _amount) external {
        require(_amount > 0, "Invalid amount");
        oldHMNToken.transferFrom(msg.sender, address(this), _amount);
        uint256 migrationAmount = (9e8 * _amount) / 1e12;
        newHMNToken.transfer(msg.sender, migrationAmount);
        migrationReserve = migrationReserve - migrationAmount;
    }

    function addTokensToMigrationReserve(uint256 _amount) external onlyOwner {
        require(_amount > 0, "Invalid amount");
        newHMNToken.transferFrom(msg.sender, address(this), _amount);
        migrationReserve += _amount;
    }

    receive() external payable {
        // Handle ETH transfers to the contract
    }

    fallback() external payable {
        // Handle unexpected function calls
    }
}
