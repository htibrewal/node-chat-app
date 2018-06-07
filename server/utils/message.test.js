var expect = require('expect');

//ES6 destructuring
var {generateMessage, generateLocationMessage} = require('./message.js');

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

describe('generateLocationMessage', () => {

  it('should generate correct location object', () => {
    var locationMessage = generateLocationMessage('Andrew', 10, 20);
    var url = 'https://www.google.com/maps?q=10,20';

    expect(locationMessage.createdAt).toBeA('number');
    expect(locationMessage).toInclude({from: 'Andrew', url});
  });
});
