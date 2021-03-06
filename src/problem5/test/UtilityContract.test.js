const UtilityContract = artifacts.require('UtilityContract');

contract('UtilityContract', (accounts) => {
  before(async () => {
    this.uc = await UtilityContract.deployed();
  });

  it('deploys successfully', async () => {
    const address = await this.uc.address;
    assert.notEqual(address, 0x0);
    assert.notEqual(address, '');
    assert.notEqual(address, null);
    assert.notEqual(address, undefined);
  });

  it('lists accounts', async () => {
    const w1 = await this.uc.wallets(0);
    assert.equal(w1.walletAddress, '0x123456789');
    assert.equal(w1.balance, 6969);
  });

  it('adds new wallet and emits event', async () => {
    const testAddress = 0xc3fa9717a9ef69c824600e1f3feb9c6fc7250080;
    const testToken = 0x3a92f92018c7fe9a9d6a6d9e83a73da4d4af197f;
    const testBalance = 100000;
    const testEvent = await this.uc.createWallet(testAddress, testBalance, testToken);
    const w2 = await this.uc.wallets;

    console.log(w2);

    // assert.equal(walletCount, 2);
    // assert.equal(w2.walletAddress, testAddress);
    // assert.equal(w2.balance, testBalance);

    // const event = testEvent.logs[0].args;
    // assert.equal(event.id.toNumber(), 1);
    // assert.equal(event.walletAddress, testAddress);
    // assert.equal(event.balance.toNumber(), testBalance);
  });
});
