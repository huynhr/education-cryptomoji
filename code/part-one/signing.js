'use strict';

const secp256k1 = require('secp256k1');
const { randomBytes, createHash } = require('crypto');

const toBytes = hex => Buffer.from(hex, 'hex');
const toHex = bytes => bytes.toString('hex');
const sha256 = msg => createHash('sha256').update(msg).digest();
const bufferFrom = string => Buffer.from(string);

/**
 * A function which generates a new random Secp256k1 private key, returning
 * it as a 64 character hexadecimal string.
 *
 * Example:
 *   const privateKey = createPrivateKey();
 *   console.log(privateKey);
 *   // 'e291df3eede7f0c520fddbe5e9e53434ff7ef3c0894ed9d9cbcb6596f1cfe87e'
 */
const createPrivateKey = () => {
  // Enter your solution here
  const buffer = bufferFrom(randomBytes(32));
  return toHex(buffer);
};

/**
 * A function which takes a hexadecimal private key and returns its public pair
 * as a 66 character hexadecimal string.
 *
 * Example:
 *   const publicKey = getPublicKey(privateKey);
 *   console.log(publicKey);
 *   // '0202694593ddc71061e622222ed400f5373cfa7ea607ce106cca3f039b0f9a0123'
 *
 * Hint:
 *   Remember that the secp256k1-node library expects raw bytes (i.e Buffers),
 *   not hex strings! You'll have to convert the private key.
 */
const getPublicKey = privateKey => {
  // Your code here
  const publicKeyBuffer = secp256k1.publicKeyCreate(toBytes(privateKey));

  return toHex(publicKeyBuffer);
};

/**
 * A function which takes a hex private key and a string message, returning
 * a 128 character hexadecimal signature.
 *
 * Example:
 *   const signature = sign(privateKey, 'Hello World!');
 *   console.log(signature);
 *   // '4ae1f0b20382ad628804a5a66e09cc6bdf2c83fa64f8017e98d84cc75a1a71b52...'
 *
 * Hint:
 *   Remember that you need to sign a SHA-256 hash of the message,
 *   not the message itself!
 */
const sign = (privateKey, message) => {
  // Your code here
  const hash = sha256(message);
  const bufferSignature = secp256k1.sign(toBytes(hash), toBytes(privateKey));

  return toHex(bufferSignature.signature);

};

/**
 * A function which takes a hex public key, a string message, and a hex
 * signature, and returns either true or false.
 *
 * Example:
 *   console.log( verify(publicKey, 'Hello World!', signature) );
 *   // true
 *   console.log( verify(publicKey, 'Hello World?', signature) );
 *   // false
 */
const verify = (publicKey, message, signature) => {
  // Your code here
  return secp256k1.verify(bufferFrom(sha256(message)), toBytes(signature), toBytes(publicKey));
};

module.exports = {
  createPrivateKey,
  getPublicKey,
  sign,
  verify
};
