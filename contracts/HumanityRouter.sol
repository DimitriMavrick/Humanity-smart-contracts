// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { IUniswapV2Router02 } from "./interfaces/IUniswapV2Router02.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract HumanityRouter is Ownable {
    using SafeERC20 for IERC20;

    address public feeDistributor;
    uint256 public totalFeePercentage; // Total fee in basis points (e.g., 100 = 1%)

    event FeeDistributorChanged(address indexed newFeeDistributor);
    event TotalFeeChanged(uint256 newTotalFee);

    IUniswapV2Router02 public immutable uniswapRouter;

    constructor(address _uniswapRouter) {
        uniswapRouter = IUniswapV2Router02(_uniswapRouter);
    }

    function setTotalFee(uint256 _totalFeePercentage) external onlyOwner {
        require(_totalFeePercentage <= 10000, "Fee too high"); // Max fee is 100%
        totalFeePercentage = _totalFeePercentage;
        emit TotalFeeChanged(_totalFeePercentage);
    }

    function setFeeDistributor(address _feeDistributor) external onlyOwner {
        require(_feeDistributor != address(0), "Invalid address");
        feeDistributor = _feeDistributor;
        emit FeeDistributorChanged(_feeDistributor);
    }

    function _deductFee(address token, uint256 amount) internal returns (uint256) {
        if (totalFeePercentage == 0 || feeDistributor == address(0)) {
            return amount;
        }
        uint256 fee = (amount * totalFeePercentage) / 10000;
        IERC20(token).safeTransfer(feeDistributor, fee);
        return amount - fee;
    }

    function _swap(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline,
        bool exactInput
    ) internal returns (uint256[] memory amounts) {
        uint256 amountInAfterFee = _deductFee(path[0], amountIn);
        IERC20(path[0]).safeTransferFrom(msg.sender, address(this), amountInAfterFee);
        IERC20(path[0]).safeApprove(address(uniswapRouter), amountInAfterFee);

        if (exactInput) {
            return uniswapRouter.swapExactTokensForTokens(amountInAfterFee, amountOutMin, path, to, deadline);
        } else {
            return uniswapRouter.swapTokensForExactTokens(amountOutMin, amountInAfterFee, path, to, deadline);
        }
    }

    function swapExactTokensForTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external returns (uint256[] memory amounts) {
        return _swap(amountIn, amountOutMin, path, to, deadline, true);
    }

    function swapTokensForExactTokens(
        uint256 amountOut,
        uint256 amountInMax,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external returns (uint256[] memory amounts) {
        return _swap(amountInMax, amountOut, path, to, deadline, false);
    }

    function swapExactETHForTokens(
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external payable returns (uint256[] memory amounts) {
        uint256 fee = (msg.value * totalFeePercentage) / 10000;
        payable(feeDistributor).transfer(fee);
        uint256 amountInAfterFee = msg.value - fee;
        return uniswapRouter.swapExactETHForTokens{value: amountInAfterFee}(amountOutMin, path, to, deadline);
    }

    function swapTokensForExactETH(
        uint256 amountOut,
        uint256 amountInMax,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external returns (uint256[] memory amounts) {
        uint256 amountInAfterFee = _deductFee(path[0], amountInMax);
        IERC20(path[0]).safeTransferFrom(msg.sender, address(this), amountInAfterFee);
        IERC20(path[0]).safeApprove(address(uniswapRouter), amountInAfterFee);
        return uniswapRouter.swapTokensForExactETH(amountOut, amountInAfterFee, path, to, deadline);
    }

    function swapExactTokensForETH(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external returns (uint256[] memory amounts) {
        uint256 amountInAfterFee = _deductFee(path[0], amountIn);
        IERC20(path[0]).safeTransferFrom(msg.sender, address(this), amountInAfterFee);
        IERC20(path[0]).safeApprove(address(uniswapRouter), amountInAfterFee);
        return uniswapRouter.swapExactTokensForETH(amountInAfterFee, amountOutMin, path, to, deadline);
    }

    function swapETHForExactTokens(
        uint256 amountOut,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external payable returns (uint256[] memory amounts) {
        uint256 fee = (msg.value * totalFeePercentage) / 10000;
        payable(feeDistributor).transfer(fee);
        uint256 amountInAfterFee = msg.value - fee;
        return uniswapRouter.swapETHForExactTokens{value: amountInAfterFee}(amountOut, path, to, deadline);
    }

    function swapExactTokensForTokensSupportingFeeOnTransferTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external {
        uint256 amountInAfterFee = _deductFee(path[0], amountIn);
        IERC20(path[0]).safeTransferFrom(msg.sender, address(this), amountInAfterFee);
        IERC20(path[0]).safeApprove(address(uniswapRouter), amountInAfterFee);
        uniswapRouter.swapExactTokensForTokensSupportingFeeOnTransferTokens(amountInAfterFee, amountOutMin, path, to, deadline);
    }

    function swapExactETHForTokensSupportingFeeOnTransferTokens(
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external payable {
        uint256 fee = (msg.value * totalFeePercentage) / 10000;
        payable(feeDistributor).transfer(fee);
        uint256 amountInAfterFee = msg.value - fee;
        uniswapRouter.swapExactETHForTokensSupportingFeeOnTransferTokens{value: amountInAfterFee}(amountOutMin, path, to, deadline);
    }

    function swapExactTokensForETHSupportingFeeOnTransferTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external {
        uint256 amountInAfterFee = _deductFee(path[0], amountIn);
        IERC20(path[0]).safeTransferFrom(msg.sender, address(this), amountInAfterFee);
        IERC20(path[0]).safeApprove(address(uniswapRouter), amountInAfterFee);
        uniswapRouter.swapExactTokensForETHSupportingFeeOnTransferTokens(amountInAfterFee, amountOutMin, path, to, deadline);
    }

    function quote(uint256 amountA, uint256 reserveA, uint256 reserveB) external view returns (uint256 amountB) {
        return uniswapRouter.quote(amountA, reserveA, reserveB);
    }

    function getAmountOut(uint256 amountIn, uint256 reserveIn, uint256 reserveOut) external view returns (uint256 amountOut) {
        return uniswapRouter.getAmountOut(amountIn, reserveIn, reserveOut);
    }

    function getAmountIn(uint256 amountOut, uint256 reserveIn, uint256 reserveOut) external view returns (uint256 amountIn) {
        return uniswapRouter.getAmountIn(amountOut, reserveIn, reserveOut);
    }

    function getAmountsOut(uint256 amountIn, address[] calldata path) external view returns (uint256[] memory amounts) {
        return uniswapRouter.getAmountsOut(amountIn, path);
    }

    function getAmountsIn(uint256 amountOut, address[] calldata path) external view returns (uint256[] memory amounts) {
        return uniswapRouter.getAmountsIn(amountOut, path);
    }

    receive() external payable {
        // Handle ETH transfers to the contract
    }

    fallback() external payable {
        // Handle unexpected function calls
    }
}
