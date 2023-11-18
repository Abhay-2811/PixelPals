// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import {CCIPReceiver} from "@chainlink/contracts-ccip/src/v0.8/ccip/applications/CCIPReceiver.sol";
import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import {IERC20} from "@chainlink/contracts-ccip/src/v0.8/vendor/openzeppelin-solidity/v4.8.0/token/ERC20/IERC20.sol";


//entire contract on base

contract MyNFT is ERC721URIStorage, Ownable{
    string constant TOKEN_URI =
        "https://ipfs.io/ipfs/QmYuKY45Aq87LeL1R5dhb1hqHLp6ZFbJaCP8jxqKM1MX6y/babe_ruth_1.json";
    uint256 internal tokenId;
    event nftMinted(address to, uint256 _tokenid);

    constructor() ERC721("MyNFT", "MNFT") Ownable(msg.sender){
        for (uint x = 0; x<3; x++) 
        {
            mint(msg.sender);
            emit nftMinted(msg.sender,tokenId);
        }
    }

    function mint(address to) public onlyOwner {
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, TOKEN_URI);
        unchecked {
            tokenId++;
        }
    }
}

contract Pixels_contract is CCIPReceiver {
    MyNFT public nft;
    struct listing{
        address seller;
        uint256 _tokenId;
        bool sold;
        uint price;
    }
    //tokenID -> listing
    mapping(uint256 => listing) public listings;

    event listing_added(address indexed owner, uint indexed token_id, uint indexed price_in_usdt);
    event listing_sold(address indexed seller, address indexed buyer, uint indexed timestamp);

    constructor(address router)CCIPReceiver(router){
        nft = new MyNFT();
    }

    address bnm_token = 0xbf9036529123DE264bFA0FC7362fE25B650D4B16;

    // price is of format 10**18, usdt 
    function list_pixel(uint256 _tokenId, uint price) public {
        require(nft.getApproved(_tokenId) == address(this), "The contract hasnt been approved yet");
        require(nft.ownerOf(_tokenId) == msg.sender, "Sender doesn't own the NFT");
        listings[_tokenId] = listing(msg.sender, _tokenId, false, price);
        emit listing_added(msg.sender, _tokenId, price);
    }

    //change visibility
    function sale_complete(uint256 _tokenId, address buyer) public {
        require(listings[_tokenId].sold == false, "Pixel already sold");
        require(IERC20(bnm_token).balanceOf(address(this)) >= listings[_tokenId].price, "Tokens didnt reach base contract");
        nft.transferFrom(listings[_tokenId].seller, buyer, _tokenId);
        listings[_tokenId].sold = true;
        emit listing_sold(listings[_tokenId].seller, buyer, block.timestamp);
    }

    // function ccip_recieve()
     function _ccipReceive(
        Client.Any2EVMMessage memory message
    ) 
        internal 
        override 
    {
        (bool success, ) = address(this).call(message.data);
        require(success);
    }
    //this will be minitng function, has to be onlyowner just a dummy fn for now
    function getNFT(uint tokenID) public {
        nft.transferFrom(address(this), msg.sender, tokenID);
    }
     
    //get functions
    function nft_address() public view returns(address){
        return address(nft);
    }

    function get_price(uint256 _tokenID) public view returns(uint){
        return listings[_tokenID].price;
    }

    function test_message() public {
        bytes memory message;
        message = abi.encodeWithSignature("sale_complete(uint256,address)", 0, msg.sender);

        (bool success, ) = address(this).call(message);
        require(success);
    }

}