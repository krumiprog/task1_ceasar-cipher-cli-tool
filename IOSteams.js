const fs = require('fs');

exports.createReadSteam = fileName => {
  if (fileName) {
    if (fs.existsSync(fileName)) {
      return fs.createReadStream(fileName, 'utf-8');
    } else {
      throw new Error(`Input file ${fileName} does not exist.`);
    }
  } else {
    return process.stdin;
  }
};

exports.createWriteStream = fileName => {
  if (fileName) {
    if (fs.existsSync(fileName)) {
      return fs.createWriteStream(fileName, { flags: 'a' });
    } else {
      throw new Error(`Output file ${fileName} does not exist.`);
    }
  } else {
    return process.stdout;
  }
};
