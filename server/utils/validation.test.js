var expect = require('expect');

var {isRealString} = require('./validation');

describe('isRealString', () => {

  it('should reject non-string values', () => {
    var bool = isRealString(123456);

    expect(bool).toBe(false);
  });

  it('should reject strings with only spaces', () => {
    var res = isRealString("     ");
    expect(res).toBe(false);
  });

  it('should allow string with non-space characters', () => {
    var res = isRealString("hello there");
    expect(res).toBe(true);
  });
});
