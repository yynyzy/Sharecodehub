const momentService = require('../service/moment.service')

class MomentCroller {
    //创建一条心情
    async create(ctx, next) {
        const UserId = ctx.user.id
        const content = ctx.request.body.content
        const result = await momentService.create(UserId, content)
        ctx.body = result
    }
    //用于获取一条发表的心情的相关信息
    async detail(ctx, next) {
        const { momentId } = ctx.params
        const result = await momentService.getMomentById(momentId)
        ctx.body = result
    }
    //用于分页请求 用户的心情文章
    async list(ctx, next) {
        const { offset, size } = ctx.query
        const result = await momentService.getMomentList(offset, size)
        ctx.body = result
    }
    //用于修改用户的心情文章
    async update(ctx, next) {
        const { momentId } = ctx.params
        const { content } = ctx.request.body
        const result = await momentService.update(content, momentId)
        ctx.body = result
    }
    //用于删除用户的心情文章
    async remove(ctx, next) {
        const { momentId } = ctx.params
        const result = await momentService.remove(momentId)
        ctx.body = result
    }
    async addLabels(ctx, next) {

        // const result = await momentService.addLabels(labels)
        // ctx.body = result
    }
}

module.exports = new MomentCroller()