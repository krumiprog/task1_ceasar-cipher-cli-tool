const { pipeline } = require('stream');
const { getOptions } = require('./getOptions');
const { createReadSteam, createWriteStream } = require('./IOSteams');
const TransformStream = require('./TransformStream');

const ABC_LENGTH = 26;

const options = getOptions();
const shift =
  (options.action === 'decode' ? -options.shift : options.shift) % ABC_LENGTH;

let readStream;
let writeStream;
let transformStream;

try {
  readStream = createReadSteam(options.input);
  writeStream = createWriteStream(options.output);
  transformStream = new TransformStream(shift);
} catch (err) {
  process.stderr.write(`ERROR: ${err.message}`);
  process.exit(1);
}

pipeline(readStream, transformStream, writeStream, err => {
  if (err) {
    process.stderr.write(`ERROR: Action ${options.action} failed.`);
    process.exit(1);
  }
});
