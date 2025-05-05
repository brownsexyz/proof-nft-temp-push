const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MintAndNotarize", function () {
  it("should mint and emit Notarized", async function () {
    const [owner] = await ethers.getSigners();
    const Contract = await ethers.getContractFactory("MintAndNotarize");
    const contract = await Contract.deploy();
    await contract.deployed();

    const cid = "bafy...xyz";
    const sha = ethers.utils.formatBytes32String("testsha256");
    const tokenURI = "ipfs://bafy...xyz";

    const tx = await contract.mintWithProof(owner.address, cid, sha, tokenURI);
    await expect(tx).to.emit(contract, "Notarized");
  });
});
