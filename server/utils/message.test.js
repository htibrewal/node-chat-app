var expect = require('expect');

//ES6 destructuring
var {generateMessage} = require('./message.js');

describe('generateMessage', () => {

  it('should generate correct message object', () => {

    var from = 'Jen';
    var text = 'Some message';
    var message = generateMessage(from, text);

    //createdAt should be a number and message should be equal to from and text defined above
    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from,text});

  });
});
