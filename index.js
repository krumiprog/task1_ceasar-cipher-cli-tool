const { getAction, getShift } = require('./checkArgs');
const { createReadSteam, createWriteStream } = require('./IOSteams');
const TransformStream = require('./TransformStream');
const { pipeline } = require('stream');
const argv = require('minimist')(process.argv.slice(2));

const ABC_LENGTH = 26;

let action;
let shift;
let readStream;
let writeStream;
let transformStream;

try {
  action = getAction(argv);
  shift = getShift(argv);
  readStream = createReadSteam(argv);
  writeStream = createWriteStream(argv);

  shift %= ABC_LENGTH;
  if (action === 'decode') {
    shift = -shift;
  }

  transformStream = new TransformStream(shift);
} catch (err) {
  process.stderr.write(`ERROR: ${err.message}`);
  process.exit(1);
}

pipeline(readStream, transformStream, writeStream, err => {
  if (err) {
    process.stderr.write(`ERROR: Action ${action} failed.`);
    process.stderr.write(err);
    process.exit(1);
  } else {
    process.stdout.write(`Action ${action} succeeded.`);
  }
});
