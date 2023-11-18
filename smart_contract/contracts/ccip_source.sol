// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {OwnerIsCreator} from "@chainlink/contracts-ccip/src/v0.8/shared/access/OwnerIsCreator.sol";
import {IRouterClient} from "@chainlink/contracts-ccip/src/v0.8/ccip/interfaces/IRouterClient.sol";
import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import {IERC20} from "@chainlink/contracts-ccip/src/v0.8/vendor/openzeppelin-solidity/v4.8.0/token/ERC20/IERC20.sol";
import {LinkTokenInterface} from "@chainlink/contracts/src/v0.8/shared/interfaces/LinkTokenInterface.sol";
import {Pixels_contract} from "./pixels.sol";

contract CCIPTokenSender is OwnerIsCreator {
    IRouterClient router;
    LinkTokenInterface linkToken;
    address bnm_token = 0xD21341536c5cF5EB1bcb58f6723cE26e8D8E90e4;
    address pixels_contract_address;

    //confirm this
    uint64 base_chainselector = 5790810961207155433;

    error NotEnoughBalance(uint256 currentBalance, uint256 calculatedFees); 

    constructor(address _router, address _link, address _pixels) {
        router = IRouterClient(_router);
        linkToken = LinkTokenInterface(_link);
        pixels_contract_address = _pixels;
    }

    function transferTokens(
        uint256 _tokenID,
        uint _amount
    ) 
        external
        returns (bytes32 messageId) 
    {
        Client.EVMTokenAmount[] memory tokenAmounts = new Client.EVMTokenAmount[](1);
        Client.EVMTokenAmount memory tokenAmount = Client.EVMTokenAmount({
            token: bnm_token,
            amount: _amount
        });
        tokenAmounts[0] = tokenAmount;
        
        // Building the CCIP Message
        Client.EVM2AnyMessage memory message = _buildCCIPMessage(pixels_contract_address, _tokenID, bnm_token, _amount, address(linkToken));

        // CCIP Fees Management
        uint256 fees = router.getFee(base_chainselector, message);

        if (fees > linkToken.balanceOf(address(this)))
            revert NotEnoughBalance(linkToken.balanceOf(address(this)), fees);

        linkToken.approve(address(router), type(uint256).max);
        
        // Approve Router to spend CCIP-BnM tokens we send
        IERC20(bnm_token).approve(address(router), type(uint256).max);
        
        // Send CCIP Message
        messageId = router.ccipSend(base_chainselector, message); 
    }

    function withdrawToken(
        address _beneficiary,
        address _tokenAdd
    ) public onlyOwner {
        uint256 amount = IERC20(_tokenAdd).balanceOf(address(this));
        
        IERC20(_tokenAdd).transfer(_beneficiary, amount);
    }

    function _buildCCIPMessage(
        address _receiver,
        uint256 _tokenID,
        address _token,
        uint256 _amount,
        address _feeTokenAddress
    ) internal view returns (Client.EVM2AnyMessage memory) {
        // Set the token amounts
        Client.EVMTokenAmount[]
            memory tokenAmounts = new Client.EVMTokenAmount[](1);
        tokenAmounts[0] = Client.EVMTokenAmount({
            token: _token,
            amount: _amount
        });
        // Create an EVM2AnyMessage struct in memory with necessary information for sending a cross-chain message
        return
            Client.EVM2AnyMessage({
                receiver: abi.encode(_receiver), // ABI-encoded receiver address
                data: abi.encodeWithSignature("sale_complete(uint256,address)",_tokenID,msg.sender), // ABI-encoded string
                tokenAmounts: tokenAmounts, // The amount and type of token being transferred
                extraArgs: Client._argsToBytes(
                    // Additional arguments, setting gas limit and non-strict sequencing mode
                    Client.EVMExtraArgsV1({gasLimit: 900_000, strict: false})
                ),
                // Set the feeToken to a feeTokenAddress, indicating specific asset will be used for fees
                feeToken: _feeTokenAddress
            });
    }
}