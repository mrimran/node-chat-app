var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = "Admin";
        var text = "This is test to check if it generates the message";
        var msgRes = generateMessage(from, text)
        expect(msgRes.createdAt).toBeGreaterThan(0);
        expect(msgRes).toMatchObject({from,text});
    });
});