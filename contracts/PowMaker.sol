// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity >=0.8.0;

import "./WethMaker.sol";
import "./uniswapv2/interfaces/IERC20.sol";

/// @notice Contract for selling weth to pow. Deploy on mainnet.
contract PowMaker is WethMaker {

    event Serve(uint256 amount);

    address public immutable pow;
    address public immutable sPow;

    constructor(
        address owner,
        address user,
        address factory,
        address weth,
        address _pow,
        address _sPow
    ) WethMaker(owner, user, factory, weth) {
        pow = _pow;
        sPow = _sPow;
    }

    function buyPow(uint256 amountIn, uint256 minOutAmount) external onlyTrusted returns (uint256 amountOut) {
        amountOut = _swap(weth, pow, amountIn, sPow);
        if (amountOut < minOutAmount) revert SlippageProtection();
        emit Serve(amountOut);
    }

    function sweep(uint256 amount) external onlyTrusted {
        IERC20Uniswap(pow).transfer(sPow, amount);
        emit Serve(amount);
    }

    // In case we receive any unwrapped ethereum we can call this.
    function wrapEth() external {
        weth.call{value: address(this).balance}("");
    }

}
