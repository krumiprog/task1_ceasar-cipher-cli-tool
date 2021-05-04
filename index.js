const fs = require('fs');
const { pipeline, Transform } = require('stream');

const argv = require('minimist')(process.argv.slice(2));

console.log(argv);

const actionKeys = ['a', 'action'];
const shiftKeys = ['s', 'shift'];
const argvKeys = Object.keys(argv);

//check action argument
if (!argvKeys.some(key => actionKeys.includes(key))) {
  process.stderr.write('Action argument required.');
  process.exit(1);
}

const action = argv['a'] || argv['action'];

if (action !== 'encode' && action !== 'decode') {
  process.stderr.write("Action values must be 'encode' or 'decode'.");
  process.exit(1);
}

// check shift argument
if (!argvKeys.some(key => shiftKeys.includes(key))) {
  process.stderr.write('Shift argument required.');
  process.exit(1);
}

const shift = Number.parseInt(argv['s'] || argv['shift']);

if (isNaN(shift)) {
  process.stderr.write('Shift value must be a number.');
  process.exit(1);
}

// create read stream
let readStream = null;
const inputFile = argv['i'] || argv['input'];

if (inputFile) {
  if (fs.existsSync(inputFile)) {
    readStream = fs.createReadStream(inputFile, 'utf-8');
  } else {
    process.stderr.write(`Input file ${inputFile} does not exist.`);
    process.exit(1);
  }
} else {
  readStream = process.stdin;
}

// create write stream
let writeStream = null;
const outputFile = argv['o'] || argv['output'];

if (outputFile) {
  if (fs.existsSync(outputFile)) {
    writeStream = fs.createWriteStream(outputFile);
  } else {
    process.stderr.write(`Output file ${outputFile} does not exist.`);
    process.exit(1);
  }
} else {
  writeStream = process.stdout;
}

// create transform stream
const transformStream = new Transform({
  transform(chunk, encoding, callback) {
    try {
      const result = `${chunk.toString('utf8')} - TEST`;
      callback(null, result);
    } catch (err) {
      callback(err);
    }
  },
});

pipeline(readStream, transformStream, writeStream, err => {
  if (err) {
    process.stderr.write(`Action ${action} failed.`, err);
  } else {
    process.stdout.write(`Action ${action} succeeded.`);
  }
});
