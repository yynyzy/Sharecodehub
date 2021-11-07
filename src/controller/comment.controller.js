/**
 *  用户评论相关
 */
const commentService = require('../service/comment.service')
class CommentController {
    async create(ctx, next) {
        const { id } = ctx.user
        const { momentId, content } = ctx.request.body
        const result = await commentService.create(id, content, momentId)
        ctx.body = result
    }

    async reply(ctx, next) {
        const { momentId, content } = ctx.request.body
        const { commentId } = ctx.params
        const { id } = ctx.user
        const result = await commentService.reply(id, content, momentId, commentId)
        ctx.body = result
    }
    async update(ctx, next) {
        const { content } = ctx.request.body
        const { commentId } = ctx.params
        const result = await commentService.update(content, commentId)
        ctx.body = result
    }

    async remove(ctx, next) {
        const { commentId } = ctx.params
        const result = await commentService.remove(commentId)
        ctx.body = result
    }
}

module.exports = new CommentController();