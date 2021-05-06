const fs = require('fs');

exports.createReadSteam = argv => {
  const inputFile = argv['i'] || argv['input'];

  if (inputFile) {
    if (fs.existsSync(inputFile)) {
      return fs.createReadStream(inputFile, 'utf-8');
    } else {
      throw new Error(`Input file ${inputFile} does not exist.`);
    }
  } else {
    return process.stdin;
  }
};

exports.createWriteStream = argv => {
  const outputFile = argv['o'] || argv['output'];

  if (outputFile) {
    if (fs.existsSync(outputFile)) {
      return fs.createWriteStream(outputFile, { flags: 'a' });
    } else {
      throw new Error(`Output file ${outputFile} does not exist.`);
    }
  } else {
    return process.stdout;
  }
};
