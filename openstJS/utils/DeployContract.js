'use strict';

/**
 * It is used for deploying a contract.
 */
class DeployContract {
  /**
   * DeployContract constructor.
   *
   * @param contractName Contract name.
   * @param txObject Transaction object.
   * @param web3 Web3 object.
   * @param txOptions Tx options.
   * @constructor
   */
  constructor(contractName, txObject, web3, txOptions) {
    const oThis = this;

    oThis.contractName = contractName;
    oThis.txObject = txObject;
    oThis.txOptions = txOptions;
    oThis.web3 = web3;
  }

  /**
   * It deploys the contract.
   *
   * @returns Promise object.
   */
  async deploy() {
    const oThis = this;

    let receipt = null,
      transactionHash = null;

    console.log("Deploying ", oThis.contractName);
    let instance = await oThis.txObject
      .send(oThis.txOptions)
      .on('receipt', function(value) {
        console.log("receipt of deployed contract");
        console.log( JSON.stringify(value));
        receipt = value;
      })
      .on('transactionHash', function(value) {
        transactionHash = value;
      })
      .on('error', function(error) {
        console.log("error deploying contract");
        console.log( JSON.stringify(error));
        return Promise.reject(error);
      });

    let contractAddress = null;

    contractAddress = instance.options.address;

    // checking if the contract was deployed at all.
    const code = await oThis.web3.eth.getCode(contractAddress);

    if (code.length <= 2) {
      return Promise.reject('Contract deployment failed. oThis.web3.eth.getCode returned empty code.');
    }

    return Promise.resolve({
      receipt: receipt,
      instance: instance
    });
  }
}

module.exports = DeployContract;
