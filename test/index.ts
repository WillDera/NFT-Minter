import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract } from "ethers";

let Hepier: Contract;

describe("Hepier Token", function () {
  it("Should deploy token", async function () {
    // We get the contract to deploy
    const hepier = await ethers.getContractFactory("Hepier");
    Hepier = await hepier.deploy();
    await Hepier.deployed();
  });

  it("Should revert with error: 'Ownable: caller is not the owner'", async function () {
    const [, user] = await ethers.getSigners();

    await expect(Hepier.connect(user).mint(1)).to.be.revertedWith(
      "Ownable: caller is not the owner"
    );
  });

  it("Should mint a token", async function () {
    const [owner] = await ethers.getSigners();

    const tx = await Hepier.mint(10);
    await tx.wait();

    // get balance of the first minted nft
    const balance = Number(await Hepier.balanceOf(owner.address, 0));

    expect(balance).to.be.equal(10);
  });

  it("Should set token uri", async function () {
    const [owner] = await ethers.getSigners();

    // set token uri
    const setUri = await Hepier.connect(owner).setURI(
      "https://www.mytokenlocation.com"
    );

    await setUri.wait();

    const getUri = await await Hepier.uri(0);

    expect(getUri).to.be.equal("https://www.mytokenlocation.com");
  });

  it("Should transfer from owner to another user", async function () {
    const [owner, user] = await ethers.getSigners();

    // transfer token
    const transfer = await Hepier.connect(owner).transfer(user.address, 2);

    await transfer.wait();

    // get user balance
    const balance = Number(await Hepier.balanceOf(user.address, 0));

    expect(balance).to.be.equal(2);
  });

  it("Should revert with error: 'ERC1155: insufficient balance for transfer' ", async function () {
    const [owner, user] = await ethers.getSigners();

    // transfer token
    await expect(
      Hepier.connect(owner).transfer(user.address, 20)
    ).to.be.revertedWith("ERC1155: insufficient balance for transfer");
  });
});
