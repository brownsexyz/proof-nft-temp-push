// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MintAndNotarize is ERC721URIStorage {
    event Notarized(uint256 indexed tokenId, string cid, bytes32 sha, uint256 ts);

    uint256 private _tokenId;

    constructor() ERC721("ProofNFT", "PNFT") {}

    function mintWithProof(
        address to,
        string calldata cid,
        bytes32 sha256hex,
        string calldata tokenURI
    ) external payable {
        uint256 id = ++_tokenId;
        _mint(to, id);
        _setTokenURI(id, tokenURI);
        emit Notarized(id, cid, sha256hex, block.timestamp);
    }
}
