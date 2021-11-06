/**
 *  用户发表表情相关功能
 */
const Router = require('koa-router')

const { vertifyAuth, vertifyPermission } = require('../middleware/auth.middleware')
const { create, detail, list, update } = require('../controller/moment.controller')

const momentRouter = new Router({ prefix: '/moment' })

momentRouter.post('/', vertifyAuth, create)
//分页查询
momentRouter.get('/', list)
momentRouter.get('/:momentId', detail)
//修改用户发表的心情的路由
momentRouter.patch('/:momentId', vertifyAuth, vertifyPermission, update)


module.exports = momentRouter