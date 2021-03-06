//用于全局暴露 error 的函数
const errorTypes = require('../constants/error-types')

const errorHandler = (err, ctx) => {
    let status, message
    switch (err.message) {
        case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
            status = 400 //bad request
            message = "用户名和密码不能为空！"
            break;
        case errorTypes.USER_ALREADY_EXISTS:
            status = 409 //conflict
            message = "用户已经存在！"
            break;
        case errorTypes.USER_DOES_NOT_EXISTS:
            status = 400 //conflict
            message = "用户不存在！"
            break;
        case errorTypes.PASSWORD_IS_INCORRECT:
            status = 400 //conflict
            message = "你输入的密码不正确！"
            break;
        case errorTypes.UNAUTHORIZED:
            status = 401
            message = "失效的token！"
            break;
        case errorTypes.UNPERMISSION:
            status = 401
            message = "用户没有操作的权限！"
            break;
        default:
            status = 404
            message = "NOT_FOUND"
    }
    ctx.status = status
    ctx.body = message
}
module.exports = errorHandler