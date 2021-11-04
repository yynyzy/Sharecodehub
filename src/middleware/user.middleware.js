//用于在插入数据库前检查 用户的 账号和密码是否符合条件
const errType = require("../constants/error-types")
const service = require("../service/user.service")
const MD5password = require("../utils/password-handle")

const vertifyUser = async (ctx, next) => {
    //1.获取 user，password
    const { name, password } = ctx.request.body;

    //2.判断 是否为空
    if (!name || !password) {
        const error = new Error(errType.NAME_OR_PASSWORD_IS_REQUIRED)
        return ctx.app.emit('error', error, ctx)
    }
    //判断是否有相同的名字，有就无法注册
    const result = await service.getUserByName(name)
    if (result.length) {
        console.log(result);
        const error = new Error(errType.USER_ALREADY_EXISTS)
        return ctx.app.emit('error', error, ctx)
    }
    await next()
}

const passwordHandle = async (ctx, next) => {

    let { password } = ctx.request.body;
    ctx.request.body.password = MD5password(password);
    await next()
}

module.exports = {
    vertifyUser,
    passwordHandle
}