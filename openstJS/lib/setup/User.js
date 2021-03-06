'use strict';

const AbiBinProvider = require('./../AbiBinProvider');
const AbiBinOpt = require('../AbiBinOpt');
const Deployer = require('./../../utils/DeployContract');
const Utils = require('../../utils/Utils');

const MultiSigMasterCopyContractName = 'GnosisSafe';
const THMasterCopyContractName = 'TokenHolder';
const UserWalletFactoryContractName = 'UserWalletFactory';
const ProxyFactoryContractName = 'ProxyFactory';
const CreateAndAddModulesContractName = 'CreateAndAddModules';
const DelayedRecoveryModuleMasterCopyContractName = 'DelayedRecoveryModule';
const OptimalWalletCreatorContractName = 'OptimalWalletCreator';

/**
 * Performs setup and deployment tasks for user.
 */
class User {
  /**
   * @param auxiliaryWeb3 - Auxiliary chain Web3 object.
   */
  constructor(auxiliaryWeb3) {
    Utils.deprecationNotice('setup.User', 'Please use ContractInteract!!!');
    const oThis = this;
    oThis.auxiliaryWeb3 = auxiliaryWeb3;
    oThis.abiBinProvider = new AbiBinProvider();
    oThis.abiBinOpt = new AbiBinOpt();
  }

  /**
   * Deploys DelayedRecoveryModule master copy.
   *
   * @param {Object} txOptions Transaction's options used for deploying.
   *
   * @returns {Object} Transaction receipt of the deployment.
   */
  async deployDelayedRecoveryModuleMasterCopy(txOptions) {
    const oThis = this;

    const txObject = oThis._deployDelayedRecoveryModuleMasterCopyRawTx();

    const txReceipt = await new Deployer(
      DelayedRecoveryModuleMasterCopyContractName,
      txObject,
      oThis.auxiliaryWeb3,
      txOptions
    ).deploy();

    return txReceipt;
  }

  /**
   * Deploys Gnosis CreateAndAddModules contract.
   *
   * @param {Object} txOptions Transaction's options used for deploying.
   *
   * @returns {Object} Transaction receipt of the deployment.
   */
  async deployCreateAndAddModules(txOptions) {
    const oThis = this;

    const txObject = oThis._deployCreateAndAddModulesRawTx();

    const txReceipt = await new Deployer(
      CreateAndAddModulesContractName,
      txObject,
      oThis.auxiliaryWeb3,
      txOptions
    ).deploy();

    return txReceipt;
  }

  /**
   * Deploys gnosis MultiSig master copy contract.
   *
   * @param txOptions Tx options.
   *
   * @returns {Object} - Transaction receipt.
   */
  async deployMultiSigMasterCopy(txOptions) {
    const oThis = this;

    const txObject = oThis._deployMultiSigMasterCopyRawTx();

    const txReceipt = await new Deployer(
      MultiSigMasterCopyContractName,
      txObject,
      oThis.auxiliaryWeb3,
      txOptions
    ).deploy();

    return txReceipt;
  }

  /**
   * Deploys TokenHolder master copy contract.
   *
   * @param txOptions Tx options.
   *
   * @returns {Object} - Transaction receipt.
   */
  async deployTokenHolderMasterCopy(txOptions) {
    const oThis = this;

    const txObject = oThis._deployTokenHolderMasterCopyRawTx();

    const txReceipt = await new Deployer(THMasterCopyContractName, txObject, oThis.auxiliaryWeb3, txOptions).deploy();

    return txReceipt;
  }

  /**
   * Deploys UserWalletFactory contract.
   *
   * @param txOptions Tx options.
   *
   * @returns {Object} - Transaction receipt.
   */
  async deployUserWalletFactory(txOptions) {
    const oThis = this;

    const txObject = oThis._deployUserWalletFactoryRawTx();

    const txReceipt = await new Deployer(
      UserWalletFactoryContractName,
      txObject,
      oThis.auxiliaryWeb3,
      txOptions
    ).deploy();

    return txReceipt;
  }

  /**
   * Deploys OptimalWalletCreator contract.
   *
   * @param txOptions Tx options.
   * @param {address} ubtContractAddr UtilityBrandedToken Contract address
   * @param {address} userWalletFactoryContractAddr UserWalletFactory Contract address
   * @param {address} organizationAddr Organization Contract address
   *
   * @returns {Object} - Transaction receipt.
   */
  async deployOptimalWalletCreator(txOptions, ubtContractAddr, userWalletFactoryContractAddr, organizationAddr) {
    const oThis = this;

    const txObject = oThis._deployOptimalWalletCreatorRawTx(ubtContractAddr, userWalletFactoryContractAddr, organizationAddr);

    const txReceipt = await new Deployer(
      OptimalWalletCreatorContractName,
      txObject,
      oThis.auxiliaryWeb3,
      txOptions
    ).deploy();

    return txReceipt;
  }

  /**
   * Deploys ProxyFactory contract.
   *
   * @param txOptions Tx options.
   *
   * @returns {Object} - Transaction receipt.
   */
  async deployProxyFactory(txOptions) {
    const oThis = this;

    const txObject = oThis._deployProxyFactoryRawTx();

    const txReceipt = await new Deployer(ProxyFactoryContractName, txObject, oThis.auxiliaryWeb3, txOptions).deploy();

    return txReceipt;
  }

  /**
   * Creates and returns a transaction object to deploy DelayedRecoveryModule
   * master copy.
   *
   * @returns {Object} Transaction object to deploy.
   */
  _deployDelayedRecoveryModuleMasterCopyRawTx() {
    const oThis = this;

    const { abiBinProvider } = oThis;
    const jsonInterface = abiBinProvider.getABI(DelayedRecoveryModuleMasterCopyContractName);
    const bin = abiBinProvider.getBIN(DelayedRecoveryModuleMasterCopyContractName);

    const contract = new oThis.auxiliaryWeb3.eth.Contract(jsonInterface, null);

    return contract.deploy({
      data: bin,
      arguments: []
    });
  }

  /**
   * Creates and returns a transaction object to deploy CreateAndAddModules.
   *
   * @returns {Object} Transaction object to deploy.
   */
  _deployCreateAndAddModulesRawTx() {
    const oThis = this;

    const { abiBinProvider } = oThis;
    const jsonInterface = abiBinProvider.getABI(CreateAndAddModulesContractName);
    const bin = abiBinProvider.getBIN(CreateAndAddModulesContractName);

    const contract = new oThis.auxiliaryWeb3.eth.Contract(jsonInterface, null);

    return contract.deploy({
      data: bin,
      arguments: []
    });
  }

  /**
   * Private method which Deploys gnosis MultiSig master copy contract.
   *
   * @returns {txObject} - Transaction object.
   * @private
   */
  _deployMultiSigMasterCopyRawTx() {
    const oThis = this;

    const abiBinProvider = oThis.abiBinProvider;
    const jsonInterface = abiBinProvider.getABI(MultiSigMasterCopyContractName);
    const bin = abiBinProvider.getBIN(MultiSigMasterCopyContractName);

    const contract = new oThis.auxiliaryWeb3.eth.Contract(jsonInterface, null);

    return contract.deploy({
      data: bin,
      arguments: []
    });
  }

  /**
   * Private method which returns Tx object to deploy TokenHolder master copy contract.
   *
   * @returns {txObject} - Transaction object.
   * @private
   */
  _deployTokenHolderMasterCopyRawTx() {
    const oThis = this;

    const abiBinProvider = oThis.abiBinProvider;
    const jsonInterface = abiBinProvider.getABI(THMasterCopyContractName);
    const bin = abiBinProvider.getBIN(THMasterCopyContractName);

    const contract = new oThis.auxiliaryWeb3.eth.Contract(jsonInterface, null);

    return contract.deploy({
      data: bin,
      arguments: []
    });
  }

  /**
   * Private method which deploys UserWalletFactory contract.
   *
   * @returns {txObject} Transaction object.
   * @private
   */
  _deployUserWalletFactoryRawTx() {
    const oThis = this;

    const abiBinProvider = oThis.abiBinProvider;
    const jsonInterface = abiBinProvider.getABI(UserWalletFactoryContractName);
    const bin = abiBinProvider.getBIN(UserWalletFactoryContractName);

    console.log("_deployUserWalletFactoryRawTx :: bin", bin);
    const contract = new oThis.auxiliaryWeb3.eth.Contract(jsonInterface, null);

    return contract.deploy({
      data: bin,
      arguments: []
    });
  }

    /**
   * Private method which deploys OptimalWalletCreator contract.
   *
   * @param {address} ubtContractAddr UtilityBrandedToken Contract address
   * @param {address} userWalletFactoryContractAddr UserWalletFactory Contract address
   * @param {address} organizationAddr Organization Contract address
   *
   * @returns {txObject} Transaction object.
   * @private
   */
  _deployOptimalWalletCreatorRawTx(ubtContractAddr, userWalletFactoryContractAddr, organizationAddr) {
    const oThis = this;

    const abiBinOpt = oThis.abiBinOpt;
    const jsonInterface = abiBinOpt.getABI(OptimalWalletCreatorContractName);
    const bin = abiBinOpt.getBIN(OptimalWalletCreatorContractName);

    console.log("|| _deployOptimalWalletCreatorRawTx :: jsonInterface", JSON.stringify(jsonInterface, null, 2 ));
    console.log("|| _deployOptimalWalletCreatorRawTx :: bin", bin);
    console.log("|| ubtContractAddr", ubtContractAddr);
    console.log("|| userWalletFactoryContractAddr", userWalletFactoryContractAddr);
    console.log("|| organizationAddr", organizationAddr);

    const contract = new oThis.auxiliaryWeb3.eth.Contract(jsonInterface, null);

    return contract.deploy({
      data: bin,
      arguments: [ubtContractAddr, userWalletFactoryContractAddr, organizationAddr]
    });
  }


  /**
   * Private method which deploys ProxyFactory contract.
   *
   * @returns {txObject} Transaction object.
   * @private
   */
  _deployProxyFactoryRawTx() {
    const oThis = this;

    const abiBinProvider = oThis.abiBinProvider;
    const jsonInterface = abiBinProvider.getABI(ProxyFactoryContractName);
    const bin = abiBinProvider.getBIN(ProxyFactoryContractName);

    const contract = new oThis.auxiliaryWeb3.eth.Contract(jsonInterface, null);

    return contract.deploy({
      data: bin,
      arguments: []
    });
  }
}

module.exports = User;
