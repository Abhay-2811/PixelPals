// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import {CCIPReceiver} from "@chainlink/contracts-ccip/src/v0.8/ccip/applications/CCIPReceiver.sol";
import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import {IERC20} from "@chainlink/contracts-ccip/src/v0.8/vendor/openzeppelin-solidity/v4.8.0/token/ERC20/IERC20.sol";


//entire contract on base

contract MyNFT is ERC721, Ownable {

  string public baseURI;


  constructor() ERC721("MyNFT", "MFT") Ownable(msg.sender){
    mintAllNFTs();
  }

 function mintNFT(uint256 _tokenId) public {
  _safeMint(msg.sender, _tokenId); 
}
  function _baseURI() internal view virtual override returns (string memory) {
    return baseURI;
  }

  function setBaseURI(string memory uri) public {
    baseURI = uri;
  }

  function mintAllNFTs() public {

    // S1
    mintNFT(0);
    mintNFT(1);

    // S2
    mintNFT(2);
    mintNFT(3);

    // S3
    mintNFT(4);
    mintNFT(5);

    // S4
    mintNFT(6);
    mintNFT(7);

    // S5 
    mintNFT(8);
    mintNFT(9);

    // A1
    for(uint i=0; i < 10; i++) {
      mintNFT(i + 10); 
    }

    // A2
    for(uint i=0; i < 10; i++) {
      mintNFT(i + 20);
    }

    // A3
    for(uint i=0; i < 10; i++) {
      mintNFT(i + 30);
    }

    // A4
    for(uint i=0; i < 10; i++) {
      mintNFT(i + 40);
    }

    // A5
    for(uint i=0; i < 10; i++) {
      mintNFT(i + 50);
    }

    // B1
    for(uint i=0; i < 20; i++) {
      mintNFT(i + 60);
    }

    // B2
    for(uint i=0; i < 20; i++) {
      mintNFT(i + 80); 
    }

    // B3
    for(uint i=0; i < 20; i++) {
      mintNFT(i + 100);
    }

    // B4
    for(uint i=0; i < 20; i++) {
      mintNFT(i + 120);
    }

    // B5
    for(uint i=0; i < 20; i++) {
      mintNFT(i + 140);
    }

  }

}

contract Pixels_contract is CCIPReceiver, Ownable {
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

    constructor(address router)CCIPReceiver(router)Ownable(msg.sender){
        nft = new MyNFT();
        nft.setBaseURI("https://bafybeidoaplxrc5j77r5crihddffvm2uagomhjlbvft6mcil7jiaai3auu.ipfs.nftstorage.link/");
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
    function mintNFT(uint tokenID, address _to) public onlyOwner{
        nft.transferFrom(address(this), _to, tokenID);
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