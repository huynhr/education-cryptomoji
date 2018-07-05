const { createHash } = require('crypto');

const toBytes = hex => Buffer.from(hex, 'hex');
const toHex = bytes => bytes.toString('hex');
const sha256 = msg => createHash('sha256').update(msg).digest();
const bufferFrom = string => Buffer.from(string);

module.exports = {
  toBytes,
  toHex,
  sha256,
  bufferFrom
}
