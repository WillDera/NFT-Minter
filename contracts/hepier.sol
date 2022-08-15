// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Hepier is ERC1155, Ownable, ERC1155Burnable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    string public name = "Hepier Collection";
    address public operatorAddress;

    mapping(uint256 => string) public tokenURI;

    modifier onlyOperator() {
        require(msg.sender == operatorAddress, "Not operator");
        _;
    }

    event NewOperatorAddress(address operator);

    constructor() ERC1155("HEP") {}

    function setURI(string memory newuri) public onlyOperator {
        uint256 tokenId = _tokenIdCounter.current();
        require(bytes(tokenURI[tokenId]).length == 0, "URI already set");
        tokenURI[tokenId] = newuri;
        _tokenIdCounter.increment();
    }

    function mint(uint256 amount) public onlyOperator {
        uint256 tokenId = _tokenIdCounter.current();
        _mint(address(msg.sender), tokenId, amount, "");
    }

    function mintBatch(uint256[] memory ids, uint256[] memory amounts)
        public
        onlyOperator
    {
        _mintBatch(address(msg.sender), ids, amounts, "");
    }

    function uri(uint256 _id) public view override returns (string memory) {
        return tokenURI[_id];
    }

    function transfer(address to, uint256 amount) public onlyOperator {
        address from = address(msg.sender);
        uint256 tokenId = _tokenIdCounter.current();

        safeTransferFrom(from, to, tokenId, amount, "");
    }

    function setOperator(address _operatorAddress) public onlyOwner {
        require(_operatorAddress != address(0), "Cannot be zero address");

        operatorAddress = _operatorAddress;

        emit NewOperatorAddress(_operatorAddress);
    }
}
