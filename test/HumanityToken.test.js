/* eslint-disable no-underscore-dangle */
const { assert, expect } = require("chai");
const { ethers } = require("hardhat");
const { constants } = require("@openzeppelin/test-helpers");

describe("Humanity Coin", () => {
  let owner, recipient, other;
  let humanityCoinInstance;

  beforeEach(async () => {
    const userAccounts = await ethers.getSigners();
    [owner, recipient, other] = userAccounts;
    const HumanityCoin = await ethers.getContractFactory("HumanityCoin");
    humanityCoinInstance = await HumanityCoin.deploy(owner.address);
  });

  context("Humanity", () => {
    it("name, symbol, decimals, totalSupply, balanceOf", async () => {
      expect(await humanityCoinInstance.name()).to.eq("Humanity Coin");
      expect(await humanityCoinInstance.symbol()).to.eq("HMN");
      expect(await humanityCoinInstance.decimals()).to.eq(18);
      const totalSupply = await humanityCoinInstance.totalSupply();
      expect(await humanityCoinInstance.balanceOf(owner.address)).to.eq(totalSupply);
    });

    it("should pause", async () => {
      await humanityCoinInstance.connect(owner).pause();
      expect(await humanityCoinInstance.paused()).to.eq(true);
    });

    it("should not pause if not called by the owner", async () => {
      await expect(humanityCoinInstance.connect(recipient).pause()).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("should unpause", async () => {
      await humanityCoinInstance.connect(owner).pause();
      expect(await humanityCoinInstance.paused()).to.eq(true);
      await humanityCoinInstance.connect(owner).unpause();
      expect(await humanityCoinInstance.paused()).to.eq(false);
    });

    it("should not unpause if not called by the owner", async () => {
      await humanityCoinInstance.connect(owner).pause();
      expect(await humanityCoinInstance.paused()).to.eq(true);
      await expect(humanityCoinInstance.connect(recipient).unpause()).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("should set router", async () => {
      await humanityCoinInstance.connect(owner).setRouter(recipient.address);
      expect(await humanityCoinInstance.router()).to.eq(recipient.address);
    });

    it("should not set router if not called by the owner", async () => {
      await expect(humanityCoinInstance.connect(recipient).setRouter(owner.address)).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("should transfer", async () => {
      const balance = ethers.BigNumber.from("9000000000000000000000000"); // 1% of total supply
      await humanityCoinInstance.connect(owner).transfer(recipient.address, balance);
      expect(await humanityCoinInstance.balanceOf(recipient.address)).to.eq(balance);
    });

    it("should not transfer more than 1%", async () => {
      const balance = ethers.BigNumber.from("9000000000000000000000001"); // 1% of total supply + 1
      await expect(humanityCoinInstance.connect(owner).transfer(recipient.address, balance)).to.be.revertedWith("HMN01");
    });

    it("should transfer from", async () => {
      const balance = ethers.BigNumber.from("9000000000000000000000000"); // 1% of total supply
      await humanityCoinInstance.approve(recipient.address, balance);
      await humanityCoinInstance.connect(recipient).transferFrom(owner.address, other.address, balance);
      expect(await humanityCoinInstance.balanceOf(other.address)).to.eq(balance);
    });

    it("should not transfer from more than 1%", async () => {
      const balance = ethers.BigNumber.from("9000000000000000000000001"); // 1% of total supply + 1
      await humanityCoinInstance.approve(recipient.address, balance);
      await expect(humanityCoinInstance.connect(recipient).transferFrom(owner.address, other.address, balance)).to.be.revertedWith("HMN01");
    });

    it("should transfer from more than 1% if router", async () => {
      await humanityCoinInstance.connect(owner).setRouter(recipient.address);
      const balance = ethers.BigNumber.from("9000000000000000000000001"); // 1% of total supply + 1
      await humanityCoinInstance.approve(recipient.address, balance);
      await humanityCoinInstance.connect(recipient).transferFrom(owner.address, other.address, balance);
      expect(await humanityCoinInstance.balanceOf(other.address)).to.eq(balance);
    });
  });
});
