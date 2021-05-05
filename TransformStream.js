const { Transform } = require('stream');

class TransformStream extends Transform {
  constructor(shift) {
    super();
    this.shift = shift;
  }

  _transform(chunk, encoding, callback) {
    try {
      callback(null, this._codeData(chunk));
    } catch (err) {
      callback(err);
    }
  }

  _codeData(chunk) {
    const res = chunk
      .toString('utf8')
      .split('')
      .map(ch => {
        let code = ch.charCodeAt(0);

        if (code >= 65 && code <= 90) {
          code += this.shift;
          if (code > 90) {
            code -= 26;
          } else if (code < 65) {
            code += 26;
          }
        } else if (code >= 97 && code <= 122) {
          code += this.shift;
          if (code > 122) {
            code -= 26;
          } else if (code < 97) {
            code += 26;
          }
        } else {
          return ch;
        }

        return String.fromCharCode(code);
      })
      .join('');

    return res;
  }
}

module.exports = TransformStream;
