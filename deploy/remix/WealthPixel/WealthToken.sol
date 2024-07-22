// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./IERC20.sol";
import "./ERC20.sol";
import "./SafeERC20.sol";
import "./Context.sol";
import "./SafeMath.sol";
import { IPriceProvider } from "./IPriceProvider.sol";
import { IWealth } from "./IWealth.sol";


/// @title WToken Wealth token implementation
/// @notice Main contract that forms TokenY
contract WealthToken is Context {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    // components -> Tokens X,y
    IERC20[] public components;
    uint256 public checkbalance;
    // componentsProportions 50%,50%
    uint256[] public componentsProportions;

    // solhint-disable-next-line var-name-mixedcase
    IERC20 public wealthPixelToken;
    IERC20 public inputTokenAddress;
    address public priceProvider;

    // TODO REPLACE BELOW WITH INTENDED WALLET ADDRESS
    address payable public constant PLATFORM_WALLET =
        payable(0x5ab9e56e59815EdB7be66BdE1C25C86E9815AA26);

    string public name;
    string public symbol;

      /**
     * @dev Struct representing investor details
     * @param isPresent Boolean indicating whether an investor exists
     * @param ethDeposits Investor's deposited ETH
     * @param depositedAt Timestamp of when the deposit was made
     * @param ethWithdrawn Investor's withdrawn ETH
     * @param withdrawnAt Deposit withdrawn timestamp
     * @param uTokenDepositPrice Prices of underlying tokens at the time of deposit
     * @param uTokenWithdrawnPrice Prices of underlying tokens at the time of withdrawal
     * @param underlyingTokenBalances Investor underlying token balance
     */
    struct Investor {
        bool isPresent;
        uint256 ethDeposits;
        uint256 depositedAt;
        uint256 ethWithdrawn;
        uint256 withdrawnAt;
        uint256 tokensIssued;
    }

    mapping(address => Investor) public investorInfo;

    // List of Investors, helpful when fetching investors report
    address[] public investors;

    error ComponentsBalanceNotAvailable();

     modifier onlyPlatformWallet() {
        // solhint-disable-next-line reason-string
        require(
            msg.sender == PLATFORM_WALLET,
            "onlyPlatformWallet: Caller is not platform wallet"
        );
        _;
    }


    /**
     * @dev Sets values for {wealthPixelContract}
     *
     * All three of these values are immutable: they can only be set during construction
     */
    constructor(
        // IERC20 _wealthPixelToken,
        IERC20 _inputTokenAddress,
        IERC20[] memory _componentsTokens,
        uint256[] memory _componentsProportions,
        address _priceProvider,
        string memory _name,
        string memory _symbol
    ){  
        uint256 sumOfProportions = 0;
        uint256 componentsLength = _componentsTokens.length;
       //solhint-disable-next-line reason-string
        require(
            address(_inputTokenAddress) != address(0),
            "inputToken cannot be zero addr"
        );
        name = _name;
        symbol = _symbol;
        inputTokenAddress = _inputTokenAddress;
        priceProvider = _priceProvider;
        for (uint256 i = 0; i < componentsLength; i++) {
            require(_componentsTokens[i] != IERC20(address(0)),"Component address zero");
            require(_componentsProportions[i] != 0, "Component proportion zero");
            sumOfProportions = sumOfProportions.add(
                _componentsProportions[i]
            );
            components.push(_componentsTokens[i]);
            componentsProportions.push(_componentsProportions[i]);
        }
        require(sumOfProportions == 100, "Invalid proportions");
    }

    
    /**
     * @dev Contract might receive/hold ETH as part of the maintenance process.
     * The receive function is executed on a call to the contract with empty calldata.
     */
    // solhint-disable-next-line no-empty-blocks
    receive() external payable {}

    /**
     * @dev The fallback function is executed on a call to the contract if
     * none of the other functions match the given function signature.
     */
    fallback() external payable {}

     /**
     * @dev To transfer all ETHs stored in the contract to the caller
     *
     * Requirements:
     * - invocation can be done, only by the contract owner.
     */
    function withdrawAll() external payable onlyPlatformWallet {
        require(
            payable(msg.sender).send(address(this).balance),
            "ETH Withdraw failed"
        );
    }

     /**
     * @dev To transfer ERC20 tokens from the contract
     *
     * Requirements:
     * - invocation can be done, only by the contract owner.
     */
    function withdrawERC20Tokens(
        IERC20 token,
        address receiver,
        uint256 amount
    ) external payable onlyPlatformWallet {
        token.transfer(receiver, amount);
    }


    /**
     * @dev User gets WToken in exchange of TokenY
     */
    function depositToken(IERC20 _inputToken,uint256 _amount) external{
        require(_amount > 0, "Amount should be > 0");
        require(_inputToken == inputTokenAddress, "input token address not matched");
        _inputToken.safeTransferFrom(msg.sender,address(this),_amount);

        Investor memory invInfo = Investor({
            isPresent: false,
            ethDeposits: 0,
            depositedAt: 0,
            ethWithdrawn: 0,
            withdrawnAt: 0,
            tokensIssued: 0
        });

        if (!invInfo.isPresent) {
            invInfo.isPresent = true;
            investors.push(msg.sender);
        }
        
        invInfo.depositedAt = block.timestamp;
        invInfo.tokensIssued = invInfo.tokensIssued.add(_amount);

        // Store investor info to contract storage
        investorInfo[msg.sender] = invInfo;

        uint256 price;
        uint256 decimals;
        
        (,uint256 stablePrice, uint256 stableDecimals) = IPriceProvider(priceProvider).getAggregatorPrice(address(_inputToken));
        for(uint256 i = 0; i < components.length; i++){
        (, price, decimals) = IPriceProvider(priceProvider).getAggregatorPrice(address(components[i]));
          
            uint256 componentBalance = (_amount * componentsProportions[i] * stablePrice * 10 ** stableDecimals * 100).div(price * 10 ** stableDecimals * 10 ** 20);
            checkbalance = componentBalance;
            components[i].safeTransfer(
                msg.sender,
                componentBalance.mul(10** IERC20(components[i]).decimals())
            );
        
        }
        
    }

    /**
     * @dev Returns the lenght of total investors
     */
    function getInvestorsLength() external view returns (uint256) {
        return investors.length;
    }

    function getInputTokenBalance() external view returns(uint256){
        return inputTokenAddress.balanceOf(address(this));
    }

    function getComponents() external view returns(IERC20[] memory Components){
        return components;
    }

    function getComponentsProportions() external view returns(uint256[] memory defaultComponentsProportions){
        return componentsProportions;
    }
    
    function setComponentsProportions(uint256[] memory _componentsProportions) external {
        require(msg.sender == priceProvider, "WT01");
        require(_componentsProportions.length == componentsProportions.length, "WT01");
        componentsProportions = _componentsProportions;
    }

    function getComponentTokenBalance(address componentToken) external view returns(uint256){
        return IERC20(componentToken).balanceOf(address(this));
    }
 
    function getInvestorDetails(address investor)
    external
    view
    returns (Investor memory)
    {
        return investorInfo[investor];
    }

}