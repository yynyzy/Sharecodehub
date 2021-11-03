const Koa = require('koa')
const bodyparser = require('koa-bodyparser')

const userRouter = require('../route/user.router')

const app = new Koa()

//用于解析 json 格式数据
app.use(bodyparser())
app.use(userRouter.routes())
app.use(userRouter.allowedMethods())

module.exports = app