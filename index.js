const fs = require('fs');
const { pipeline } = require('stream');

const argv = require('minimist')(process.argv.slice(2));

console.log(argv);

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

let transformStream = null;

pipeline(readStream, writeStream, err => {
  if (err) {
    process.stderr.write('Pipeline failed.', err);
  } else {
    process.stdout.write('Pipeline succeeded.');
  }
});
