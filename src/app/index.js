const Koa = require('koa')
const bodyparser = require('koa-bodyparser')

const userRouter = require('../route/user.router')
const authRouter = require('../route/auth.router')

const errorHandler = require('../app/error-Handler')
const app = new Koa()

//用于解析 json 格式数据
app.use(bodyparser())

app.use(userRouter.routes())
app.use(userRouter.allowedMethods())

app.use(authRouter.routes())
app.use(authRouter.allowedMethods())



//暴露错误信息
app.on('error', errorHandler)

module.exports = app