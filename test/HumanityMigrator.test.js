const { expect } = require('chai');
const { ethers } = require('hardhat');
const { constants } = require('@openzeppelin/test-helpers');

describe('MigratorAndFeeDistributor', function () {
    let owner, swapTrigger, purchaseTax, salesTax, token1, token2, other;
    let migratorAndFeeDistributorInstance;
    let routerInstance;
    let humanityCoinInstance;
    let humanityOldCoinInstance;
    const WETH = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";

    beforeEach(async function () {
        [owner, swapTrigger, purchaseTax, salesTax, token1, token2, other] = await ethers.getSigners();

        const HumanityRouter = await ethers.getContractFactory('HumanityRouter');
        const MigratorAndFeeDistributor = await ethers.getContractFactory('MigratorAndFeeDistributor');
        const HumanityCoin = await ethers.getContractFactory('HumanityCoin');
        const OldHumanityCoin = await ethers.getContractFactory('HumanityOldCoin');

        humanityCoinInstance = await HumanityCoin.deploy(owner.address);
        humanityOldCoinInstance = await OldHumanityCoin.deploy(owner.address);
        routerInstance = await HumanityRouter.deploy("0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D");
        migratorAndFeeDistributorInstance = await MigratorAndFeeDistributor.deploy(routerInstance.address);

        // Set fee distributor in router contract
        await routerInstance.setFeeDistributor(migratorAndFeeDistributorInstance.address);
        
        // Set router in HumanityCoin contract to bypass HMN01 restriction
        await humanityCoinInstance.setRouter(routerInstance.address);
        await humanityOldCoinInstance.setRouter(routerInstance.address);
    });

    describe('Configuration', function () {
        it('should configure tax and swap percentages', async function () {
            await migratorAndFeeDistributorInstance.connect(owner).configureTaxAndSwap(500, 300, 200);
            const swapTriggerPercentage = await migratorAndFeeDistributorInstance.swapTriggerPercentage();
            const purchaseTaxPercentage = await migratorAndFeeDistributorInstance.purchaseTaxPercentage();
            const salesTaxPercentage = await migratorAndFeeDistributorInstance.salesTaxPercentage();
            expect(swapTriggerPercentage).to.equal(500);
            expect(purchaseTaxPercentage).to.equal(300);
            expect(salesTaxPercentage).to.equal(200);
        });

        it('should not configure tax and swap percentages if greater than 10000', async function () {
            await expect(
                migratorAndFeeDistributorInstance.connect(owner).configureTaxAndSwap(10000, 0, 1)
            ).to.be.revertedWith('Invalid values');
        });

        it('should not configure tax and swap percentages if not called by the owner', async function () {
            await expect(
                migratorAndFeeDistributorInstance.connect(other).configureTaxAndSwap(1000, 10, 1)
            ).to.be.revertedWith('Ownable: caller is not the owner');
        });

        it('should configure addresses', async function () {
            await migratorAndFeeDistributorInstance.connect(owner).configureAddresses(swapTrigger.address, purchaseTax.address, salesTax.address);
            const swapTriggerAddress = await migratorAndFeeDistributorInstance.swapTrigger();
            const purchaseTaxAddress = await migratorAndFeeDistributorInstance.purchaseTax();
            const salesTaxAddress = await migratorAndFeeDistributorInstance.salesTax();
            expect(swapTriggerAddress).to.equal(swapTrigger.address);
            expect(purchaseTaxAddress).to.equal(purchaseTax.address);
            expect(salesTaxAddress).to.equal(salesTax.address);
        });

        it('should not configure addresses if zero address is passed', async function () {
            await expect(
                migratorAndFeeDistributorInstance.connect(owner).configureAddresses(constants.ZERO_ADDRESS, purchaseTax.address, salesTax.address)
            ).to.be.revertedWith('Addresses cannot be zero');

            await expect(
                migratorAndFeeDistributorInstance.connect(owner).configureAddresses(swapTrigger.address, constants.ZERO_ADDRESS, salesTax.address)
            ).to.be.revertedWith('Addresses cannot be zero');

            await expect(
                migratorAndFeeDistributorInstance.connect(owner).configureAddresses(swapTrigger.address, purchaseTax.address, constants.ZERO_ADDRESS)
            ).to.be.revertedWith('Addresses cannot be zero');
        });
    });

    describe('Set HMN token addresses', function () {
        it('should set HMN token addresses', async function () {
            await migratorAndFeeDistributorInstance.connect(owner).setHMNTokensAddresses(token1.address, token2.address);

            const newHMNToken = await migratorAndFeeDistributorInstance.newHMNToken();
            expect(newHMNToken).to.equal(token1.address);

            const oldHMNToken = await migratorAndFeeDistributorInstance.oldHMNToken();
            expect(oldHMNToken).to.equal(token2.address);
        });

        it('should not set HMN token addresses if not called by the owner', async function () {
            await expect(
                migratorAndFeeDistributorInstance.connect(other).setHMNTokensAddresses(token1.address, token2.address)
            ).to.be.revertedWith('Ownable: caller is not the owner');
        });

        it('should not set HMN token addresses if one of the addresses is a zero address', async function () {
            await expect(
                migratorAndFeeDistributorInstance.connect(owner).setHMNTokensAddresses(constants.ZERO_ADDRESS, token2.address)
            ).to.be.revertedWith('Invalid token addresses');

            await expect(
                migratorAndFeeDistributorInstance.connect(owner).setHMNTokensAddresses(token1.address, constants.ZERO_ADDRESS)
            ).to.be.revertedWith('Invalid token addresses');
        });
    });

    describe('Add tokens for migration', function () {
        it('should add tokens for migration', async function () {
            await migratorAndFeeDistributorInstance.connect(owner).setHMNTokensAddresses(humanityCoinInstance.address, token2.address);

            const balance = ethers.utils.parseUnits('9', 18);
            await humanityCoinInstance.approve(migratorAndFeeDistributorInstance.address, balance);
            await migratorAndFeeDistributorInstance.connect(owner).addTokensToMigrationReserve(balance);

            const migrationReserve = await migratorAndFeeDistributorInstance.migrationReserve();
            expect(migrationReserve).to.equal(balance);
        });

        it('should not add tokens for migration if amount is 0', async function () {
            await expect(
                migratorAndFeeDistributorInstance.connect(owner).addTokensToMigrationReserve(0)
            ).to.be.revertedWith('Invalid amount');
        });

        it('should not add tokens for migration if not called by the owner', async function () {
            await expect(
                migratorAndFeeDistributorInstance.connect(other).addTokensToMigrationReserve(ethers.utils.parseUnits('10', 18))
            ).to.be.revertedWith('Ownable: caller is not the owner');
        });
    });

    describe('Fee Distribution', function () {
        it('should distribute fees', async function () {
            // Mint some tokens to the contract
            const amount = ethers.utils.parseUnits('1000', 18);
            await humanityCoinInstance.connect(owner).transfer(migratorAndFeeDistributorInstance.address, amount);
            await migratorAndFeeDistributorInstance.connect(owner).configureAddresses(swapTrigger.address, purchaseTax.address, salesTax.address);
            await migratorAndFeeDistributorInstance.connect(owner).configureTaxAndSwap(500, 300, 200);

            // Call feeDistributor function
            await migratorAndFeeDistributorInstance.connect(owner).feeDistributor([humanityCoinInstance.address]);

            const swapTriggerFee = ethers.utils.parseUnits('500', 18); // 50% of amount
            const purchaseTaxFee = ethers.utils.parseUnits('300', 18); // 30% of amount
            const salesTaxFee = ethers.utils.parseUnits('200', 18); // 20% of amount

            // Check if fees are distributed correctly
            let balance = await humanityCoinInstance.balanceOf(swapTrigger.address);
            expect(balance).to.equal(swapTriggerFee);

            balance = await humanityCoinInstance.balanceOf(purchaseTax.address);
            expect(balance).to.equal(purchaseTaxFee);

            balance = await humanityCoinInstance.balanceOf(salesTax.address);
            expect(balance).to.equal(salesTaxFee);
        });

        it('should distribute fees excluding migration reserve balance', async function () {
            await migratorAndFeeDistributorInstance.connect(owner).setHMNTokensAddresses(humanityCoinInstance.address, humanityOldCoinInstance.address);
        
            const migrationReserveBalance = ethers.utils.parseUnits('9', 18);
            await humanityCoinInstance.approve(migratorAndFeeDistributorInstance.address, migrationReserveBalance);
            await migratorAndFeeDistributorInstance.connect(owner).addTokensToMigrationReserve(migrationReserveBalance);
        
            // Mint some tokens to the contract
            const amount = ethers.utils.parseUnits('1', 18);
            await humanityCoinInstance.connect(owner).transfer(migratorAndFeeDistributorInstance.address, amount);
            await migratorAndFeeDistributorInstance.connect(owner).configureAddresses(swapTrigger.address, purchaseTax.address, salesTax.address);
            await migratorAndFeeDistributorInstance.connect(owner).configureTaxAndSwap(500, 300, 200);
        
            // Call feeDistributor function
            await migratorAndFeeDistributorInstance.connect(owner).feeDistributor([humanityCoinInstance.address]);
        
            const totalFee = ethers.utils.parseUnits('1', 18); // 1 HMN for distribution
            const swapTriggerFee = totalFee.mul(500).div(1000); // 50% of 1 HMN
            const purchaseTaxFee = totalFee.mul(300).div(1000); // 30% of 1 HMN
            const salesTaxFee = totalFee.mul(200).div(1000); // 20% of 1 HMN
        
            // Check if fees are distributed correctly
            const swapTriggerBalance = await humanityCoinInstance.balanceOf(swapTrigger.address);
            expect(swapTriggerBalance).to.equal(swapTriggerFee);
        
            const purchaseTaxBalance = await humanityCoinInstance.balanceOf(purchaseTax.address);
            expect(purchaseTaxBalance).to.equal(purchaseTaxFee);
        
            const salesTaxBalance = await humanityCoinInstance.balanceOf(salesTax.address);
            expect(salesTaxBalance).to.equal(salesTaxFee);
        });
        
    });

    describe('Token Migration', function () {
        beforeEach(async function () {
            await humanityOldCoinInstance.setRouter(migratorAndFeeDistributorInstance.address);
    
            // Transfer old tokens to the other address
            await humanityOldCoinInstance.connect(owner).transfer(other.address, ethers.utils.parseUnits('10000', 18));
    
            // Set HMN token addresses
            await migratorAndFeeDistributorInstance.connect(owner).setHMNTokensAddresses(humanityCoinInstance.address, humanityOldCoinInstance.address);
            
            // Approve migration amount
            await humanityOldCoinInstance.connect(other).approve(migratorAndFeeDistributorInstance.address, ethers.utils.parseUnits('10000', 18));
    
            // Add new tokens to migration reserve
            const reserveBalance = ethers.utils.parseUnits('900', 18); // Adjust to be sufficient for the test
            await humanityCoinInstance.approve(migratorAndFeeDistributorInstance.address, reserveBalance);
            await migratorAndFeeDistributorInstance.connect(owner).addTokensToMigrationReserve(reserveBalance);
        });
    
        it('should migrate tokens', async function () {
            await migratorAndFeeDistributorInstance.connect(other).migrate(ethers.utils.parseUnits('10000', 18));
    
            // Expected migration amount: 10,000 * 0.0009 = 9 new tokens
            const balance = await humanityCoinInstance.balanceOf(other.address);
            expect(balance).to.equal(ethers.utils.parseUnits('9', 18));
        });
    
        it('should not migrate tokens if amount is 0', async function () {
            await expect(
                migratorAndFeeDistributorInstance.connect(other).migrate(0)
            ).to.be.revertedWith('Invalid amount');
        });
    });
    
});
