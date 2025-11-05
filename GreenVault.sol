// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC4626/ERC4626.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GreenVault is ERC4626, Ownable {
    // 10% of yield goes to donation wallet
    address public donationWallet;
    uint256 public donationRate = 10; // %

    constructor(IERC20 _asset, address _donationWallet)
        ERC20("GreenVault Token", "gGTN")
        ERC4626(_asset)
    {
        donationWallet = _donationWallet;
    }

    function setDonationWallet(address _wallet) external onlyOwner {
        donationWallet = _wallet;
    }

    // Hook: skim yield and send a portion to donation wallet
    function donateYield(uint256 amount) external onlyOwner {
        IERC20(asset()).transfer(donationWallet, amount);
    }
}
