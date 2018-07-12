'use strict';

const { createHash } = require('crypto');
const signing = require('./signing');

/**
 * A simple validation function for transactions. Accepts a transaction
 * and returns true or false. It should reject transactions that:
 *   - have negative amounts
 *   - were improperly signed
 *   - have been modified since signing
 */
const isValidTransaction = transaction => {
  // Enter your solution here
  // OICE
  // output true or false
  // input the transaction
  const { source, amount, recipient, signature } = transaction;
  const combinedMessage = source + recipient + amount;

  if (amount < 0) {
    return false;
  }
  return signing.verify(source, combinedMessage, signature);
};

/**
 * Validation function for blocks. Accepts a block and returns true or false.
 * It should reject blocks if:
 *   - their hash or any other properties were altered
 *   - they contain any invalid transactions
 */
const isValidBlock = block => {
  // Your code here
  // OICE
  // output: true or false if all transactions are valid
  // input: block and it's transactions
  // return block.transactions.reduce(isValid, transaction => {
  // }, false)

  // what is a valid block?
  // a block without it's hash altered
  // what is contained in a hash?
    // previous hash + transactions + nounce
  const { previousHash, transactions, nonce, hash } = block;
  const transactionString = transactions.map(t => t.signature).join('');
  const toHash = previousHash + transactionString + nonce;
  const checkHash = createHash('sha512').update(toHash).digest('hex');

  if ( checkHash !== hash) {
   return false;
  }

  return block.transactions.every(isValidTransaction);

};

/**
 * One more validation function. Accepts a blockchain, and returns true
 * or false. It should reject any blockchain that:
 *   - is a missing genesis block
 *   - has any block besides genesis with a null hash
 *   - has any block besides genesis with a previousHash that does not match
 *     the previous hash
 *   - contains any invalid blocks
 *   - contains any invalid transactions
 */
const isValidChain = blockchain => {
  // Your code here
  let isValid = true;

  // Checks if gensis block has been removed or touched
  const blocks = blockchain.blocks;
  if (blocks[0].previousHash !== null) {
    return false;
  }

  // [hash1, null] ->  -> [hash3, hash2] -> [hash4, hash 3]
  // has any block besdies gensis with a null of null
  // each block should have prevBlock equals to the hash if none then return true;
  const isMissingBlocks = blocks.slice(1).some((block, i) => block.previousHash !== blocks[i].hash);
  if (isMissingBlocks) {
    return false;
  }


  // chceks if all blocks and their transactions are valid
  const isValidBlocks = blocks.every(block => isValidBlock(block));
  if (!isValidBlocks) {
    return false;
  }

  return isValid;

};

/**
 * This last one is just for fun. Become a hacker and tamper with the passed in
 * blockchain, mutating it for your own nefarious purposes. This should
 * (in theory) make the blockchain fail later validation checks;
 */
const breakChain = blockchain => {
  // Your code here
  // given a blockchain break it and see what happens
  blockchain.blocks.splice(0, 1);
  return blockchain;

};

module.exports = {
  isValidTransaction,
  isValidBlock,
  isValidChain,
  breakChain
};
