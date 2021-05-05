const ACTIONS = ['a', 'action'];
const SHIFTS = ['s', 'shift'];

exports.getAction = argv => {
  const argvKeys = Object.keys(argv);

  if (!argvKeys.some(key => ACTIONS.includes(key))) {
    throw new Error('Action argument required.');
  }

  const action = argv['a'] || argv['action'];

  if (action !== 'encode' && action !== 'decode') {
    throw new Error("Action value must be 'encode' or 'decode'.");
  }

  return action;
};

exports.getShift = argv => {
  const argvKeys = Object.keys(argv);

  if (!argvKeys.some(key => SHIFTS.includes(key))) {
    throw new Error('Shift argument required.');
  }

  const shift = Number.parseInt(argv['s'] || argv['shift']);

  if (isNaN(shift)) {
    throw new Error('Shift value must be a number.');
  }

  return shift;
};
