// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract HumanityOldCoin is ERC20, ERC20Pausable, Ownable {

    address public router;

    constructor(address initialOwner)
        ERC20("Humanity Coin", "HMN")
        public
    {
        _mint(initialOwner,900000000 * 1e18);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function setRouter(address _router) external onlyOwner {
        router = _router;
    }

    function transferFrom(address _from, address _to, uint256 _amount) public override(ERC20) returns(bool) {
        _beforeTokenTransfer(_from, _to,  _amount);
        if(msg.sender != router){
            require(_amount <= (totalSupply()/100),"HMN01");
        }
        super.transferFrom(_from, _to, _amount);
        return true;
    }

    function transfer(address _to, uint256 _amount) public override(ERC20) returns(bool) {
        _beforeTokenTransfer(msg.sender, _to,  _amount);
        require(_amount <= (totalSupply()/100),"HMN01");
        super.transfer(_to, _amount);
        return true;
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount) internal override(ERC20,ERC20Pausable) { ERC20Pausable._beforeTokenTransfer(from, to, amount); }

}
