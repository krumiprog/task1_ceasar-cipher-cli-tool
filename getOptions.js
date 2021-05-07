const { Command, InvalidOptionArgumentError } = require('commander');

const ACTIONS = ['encode', 'decode']

exports.getOptions = () => {
  const program = new Command();

  program
    .requiredOption('-a, --action <type>', 'action encode or decode', value => {
      if (ACTIONS.includes(value)) {
        return value;
      } else {
        throw new InvalidOptionArgumentError(
          'Action value must be "encode" or "decode"'
        );
      }
    })
    .requiredOption(
      '-s, --shift <number>',
      'negative or positive integer number',
      value => {
        if (Number.isInteger(+value)) {
          return Number.parseInt(value);
        } else {
          throw new InvalidOptionArgumentError('Not an integer number.');
        }
      }
    )
    .option('-i, --input <file>', 'input file')
    .option('-o, --output <file>', 'output file')
    .parse();

  return program.opts();
};
