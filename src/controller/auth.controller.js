/**
 *  验证通过，用户登录成功的相关操作
 */
const jwt = require('jsonwebtoken')
const { PRIVATE_KEY } = require("../app/config")


class AuthController {
    async login(ctx, next) {
        const { id, name } = ctx.user;
        //用 jwt 返回一个token
        const token = jwt.sign({ id, name }, PRIVATE_KEY, {
            expiresIn: 60 * 60 * 24,
            algorithm: 'RS256'
        })
        ctx.body = { id, name, token }
    }

    async success(ctx, next) {
        ctx.body = "用户授权成功"
    }
}

module.exports = new AuthController()