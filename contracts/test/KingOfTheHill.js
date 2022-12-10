const KingOfTheHill = artifacts.require("../contracts/KingOfTheHill.sol");
const utils = require("./utils");
const { time } = require("@openzeppelin/test-helpers");
const expect = require("chai").expect;


contract(KingOfTheHill, (accounts) => {
    const toEther = (wei) =>  wei / 10**18

    let [alice, bob, chad] = accounts;
    let contractInstance;

    beforeEach(async () => {
        contractInstance = await KingOfTheHill.new();
    });

    it("test comissionRateToWithdraw", async () => {
        let comissionRateToWithdraw = await contractInstance.comissionRateToWithdraw.call();
        comissionRateToWithdraw = toEther(comissionRateToWithdraw.toNumber());
        expect(comissionRateToWithdraw).to.equal(0.001);
    });

    it("test highestCallerAddress", async () => {
        await contractInstance.deposit({ from: alice, value: 1 });
        let highestCallerAddress = await contractInstance.highestCallerAddress.call();
        expect(highestCallerAddress).to.equal(alice);

        await contractInstance.deposit({ from: bob, value: 2 });
        highestCallerAddress = await contractInstance.highestCallerAddress.call();
        expect(highestCallerAddress).to.equal(bob);

        await contractInstance.deposit({ from: chad, value: 3 });
        highestCallerAddress = await contractInstance.highestCallerAddress.call();
        expect(highestCallerAddress).to.equal(chad);
    });

    it("test highestDeposit", async () => {
        let highestDeposit = await contractInstance.highestDeposit.call();
        expect(highestDeposit.toNumber()).to.equal(0);

        await contractInstance.deposit({ from: alice, value: 1 });
        highestDeposit = await contractInstance.highestDeposit.call();
        expect(highestDeposit.toNumber()).to.equal(1);

        await contractInstance.deposit({ from: bob, value: 2 });
        highestDeposit = await contractInstance.highestDeposit.call();
        expect(highestDeposit.toNumber()).to.equal(2);
    });

    it("test prizePool", async () => {
        let prizePool = await contractInstance.prizePool.call();
        expect(prizePool.toNumber()).to.equal(0);

        await contractInstance.deposit({ from: alice, value: 1 });
        prizePool = await contractInstance.prizePool.call();
        expect(prizePool.toNumber()).to.equal(1);

        await contractInstance.deposit({ from: bob, value: 2 });
        prizePool = await contractInstance.prizePool.call();
        expect(prizePool.toNumber()).to.equal(3);
    });

    it("deposit allright", async () => {
        await contractInstance.deposit({ from: alice, value: 1 });
        await time.increase(time.duration.seconds(15));
        await contractInstance.deposit({ from: bob, value: 2 });

        const prizePool = await contractInstance.prizePool.call();
        expect(prizePool.toNumber()).to.equal(3);
    });

    it("deposit can't be used if round has been ended", async () => {
        await contractInstance.deposit({ from: alice, value: 1 });
        await time.increase(time.duration.seconds(120));

        await utils.shouldThrowError(
            contractInstance.deposit({ from: bob, value: 2 })
        );
    });

    it("deposit can't be used by the highest caller again", async () => {
        await contractInstance.deposit({ from: alice, value: 1 });
        await utils.shouldThrowError(
            contractInstance.deposit({ from: alice, value: 2 })
        );
    });

    it("deposit should be greater then highest deposit", async () => {
        await contractInstance.deposit({ from: alice, value: 1 });
        await utils.shouldThrowError(
            contractInstance.deposit({ from: bob, value: 1 })
        );

        await contractInstance.deposit({ from: bob, value: 2 });
        await contractInstance.deposit({ from: chad, value: 3 });
    });

    it("test roundTime", async () => {
        const newRoundTimeGreater = 135;
        const newRoundTimeLess = 125;
        const newRoundTimeEqual = 125;

        let roundTime = await contractInstance.roundTime.call();
        expect(roundTime.toNumber()).to.equal(120);

        await contractInstance.setRoundTime(newRoundTimeGreater);
        roundTime = await contractInstance.roundTime.call();
        expect(roundTime.toNumber()).to.equal(newRoundTimeGreater);

        await contractInstance.setRoundTime(newRoundTimeLess);
        roundTime = await contractInstance.roundTime.call();
        expect(roundTime.toNumber()).to.equal(newRoundTimeLess);
        
        await utils.shouldThrowError(
            contractInstance.setRoundTime(newRoundTimeEqual)
        );
    });
})
