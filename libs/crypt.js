var crypto = require('crypto');

exports.encrypt = function(str, secret) {
    var cipher = crypto.createCipher('aes-128-cbc', secret);
    var enc = cipher.update(str, 'utf8', 'hex');
    enc += cipher.final('hex');
    return enc;
}

exports.decrypt = function(str, secret) {
    var decipher = crypto.createDecipher('aes-128-cbc', secret);
    decipher.setAutoPadding(auto_padding = true);
    var dec = decipher.update(str, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
}

exports.md5 = function(str) {
    var md5sum = crypto.createHash('md5');
    md5sum.update(str);
    return md5sum.digest('hex');
}
