var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = "Admin";
        var text = "This is test to check if it generates the message";
        var msgRes = generateMessage(from, text)
        expect(msgRes.createdAt).toBeGreaterThan(0);
        expect(msgRes).toMatchObject({from,text});
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        var from = "Admin";
        var lat = "33.7000537";
        var long = "73.0076562";
        var url = `https://www.google.com/maps?q=${lat},${long}`;
        var msgRes = generateLocationMessage(from, lat, long);
        expect(msgRes.createdAt).toBeGreaterThan(0);
        expect(msgRes).toHaveProperty("url", url);
        expect(msgRes).toHaveProperty("from", from);
    });
});