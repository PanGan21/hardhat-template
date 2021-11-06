import { expect } from "chai";
import type {
  BasicControlContract,
  BasicControlContract__factory,
} from "../types";
import { ethers } from "hardhat";

describe("BasicControlContract", () => {
  let basicControlContract: BasicControlContract;

  it("should create a new contract with admin the first account", async () => {
    const [owner, addr1, addr2] = await ethers.getSigners();
    const BasicControlContract = (await ethers.getContractFactory(
      "BasicControlContract",
      owner
    )) as BasicControlContract__factory;

    basicControlContract = await BasicControlContract.deploy();
    await basicControlContract.deployed();

    const admin = await basicControlContract.admin();

    expect(admin).to.equals(owner.address);
  });

  it("should revert when accessing not allowed function", async () => {
    const signers = await ethers.getSigners();
    await expect(
      basicControlContract.connect(signers[1]).privateFunction1()
    ).to.be.revertedWith("Only admin");
  });
});
