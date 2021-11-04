//用于加密用户登录密码
const crypto = require('crypto');

const MD5password = (password) => {
    const MD5 = crypto.createHash('md5');
    const result = MD5.update(password).digest("hex")
    return result
}

module.exports = MD5password;