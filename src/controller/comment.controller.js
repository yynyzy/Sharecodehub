/**
 *  用户评论相关
 */
const commentService = require('../service/comment.service')
class CommentController {
    async create(ctx, next) {
        const { id } = ctx.user
        const { momentId, content } = ctx.request.body
        const result = await commentService.create(id, momentId, content)
        ctx.body = result
    }
}

module.exports = new CommentController();