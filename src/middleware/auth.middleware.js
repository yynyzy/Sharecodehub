/*
*   验证登录账号是否合法
*/
const errType = require("../constants/error-types")
const service = require("../service/user.service")
const MD5password = require("../utils/MD5.utils")


const verifyLogin = async (ctx, next) => {
    const { name, password } = ctx.request.body
    //1.判断 是否为空
    if (!name || !password) {
        const error = new Error(errType.NAME_OR_PASSWORD_IS_REQUIRED)
        return ctx.app.emit('error', error, ctx)
    }
    //2.判断用户是否存在
    const result = await service.getUserByName(name)
    //取result数组中的第一个是否存在，不存在表示数据库中没有这个用户
    const user = result[0]
    if (!user) {
        const error = new Error(errType.USER_DOES_NOT_EXISTS)
        return ctx.app.emit('error', error, ctx)
    }
    console.log(user);
    // 3.检查密码是否错误，使用加密后的hash值进行比对
    const _password = MD5password(password)
    if (_password !== user.password) {
        const error = new Error(errType.PASSWORD_IS_INCORRECT)
        return ctx.app.emit('error', error, ctx)
    }
    await next()
}
module.exports = {
    verifyLogin
}