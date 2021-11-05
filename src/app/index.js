/**
 *  koa入口
 */
const Koa = require('koa')
const bodyparser = require('koa-bodyparser')

const useRoutes = require('../route')
const errorHandler = require('../app/error-Handler')

const app = new Koa()
//用于解析 json 格式数据
app.use(bodyparser())
// 用于统一注册所有的 router
useRoutes(app)

//暴露错误信息
app.on('error', errorHandler)

module.exports = app