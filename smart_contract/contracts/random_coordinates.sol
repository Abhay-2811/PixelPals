// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;
import "@api3/airnode-protocol/contracts/rrp/requesters/RrpRequesterV0.sol";

contract RandomCoordinates is RrpRequesterV0 {
    event RequestedUint256Array(bytes32 indexed requestId);
    event ReceivedUint256Array(bytes32 indexed requestId, uint256[] response);

    address public airnode;
    bytes32 public endpointIdUint256Array;
    address public sponsorWallet;
    uint256[] public generatedArray;
    uint256 public generatedNumber;
    uint256 public requestCount; // To keep track of the number of requests made

    mapping(bytes32 => bool) public expectingRequestWithIdToBeFulfilled;

    constructor(address _airnodeRrp) RrpRequesterV0(_airnodeRrp) {}

    function setRequestParameters(
        address _airnode,
        bytes32 _endpointIdUint256Array,
        address _sponsorWallet
    ) external {
        airnode = _airnode;
        endpointIdUint256Array = _endpointIdUint256Array;
        sponsorWallet = _sponsorWallet;
    }

    function makeRequestUint256Array() external {
        bytes32 requestId = airnodeRrp.makeFullRequest(
            airnode,
            endpointIdUint256Array,
            address(this),
            sponsorWallet,
            address(this),
            this.fulfillUint256Array.selector,
            abi.encode(bytes32("1u"), bytes32("size"), 10) // Request an array of size 10
        );
        expectingRequestWithIdToBeFulfilled[requestId] = true;
        emit RequestedUint256Array(requestId);
        requestCount++;
    }

    function fulfillUint256Array(bytes32 requestId, bytes calldata data)
        external
        onlyAirnodeRrp
    {
        require(
            expectingRequestWithIdToBeFulfilled[requestId],
            "Request ID not known"
        );
        expectingRequestWithIdToBeFulfilled[requestId] = false;
        generatedArray = abi.decode(data, (uint256[]));

        // Ensure each odd-indexed number is between 4104739 and 4106400
        for (uint256 i = 1; i < generatedArray.length; i += 2) {
           generatedArray[i] = (generatedArray[i] % 160) + 2898814; 
        }

        // Ensure each even-indexed number is between 2898814 and 2898973
        for (uint256 i = 0; i < generatedArray.length; i += 2) {
            generatedArray[i] = (generatedArray[i] % 361) + 4104739;
        }

        emit ReceivedUint256Array(requestId, generatedArray);
    }

    function getGeneratedData() external view returns (uint256[] memory, uint256) {
        return (generatedArray, generatedNumber);
    }
}
