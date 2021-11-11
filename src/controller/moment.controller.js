const fs = require('fs');

const momentService = require('../service/moment.service')
const fileService = require('../service/file.service')
const { PICTURE_PATH } = require('../constants/file-path')

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
        //给动态添加标签时进行判断，已经添加过的就不需要在添加
        const { labels } = ctx
        const { momentId } = ctx.params
        for (const label of labels) {
            const isExist = await momentService.hasLabel(momentId, label.id)
            if (!isExist) {
                await momentService.addLabels(momentId, label.id)
            }
        }
        ctx.body = "标签添加成功"
    }

    async fileInfo(ctx, next) {
        let { filename } = ctx.params
        console.log(filename);
        const fileInfo = await fileService.getFileByFilename(filename)
        const { type } = ctx.query
        const types = ["small", "middle", "large"]
        if (types.some(item => item === type)) {
            filename = filename + '-' + type
        }
        ctx.response.set('Content-Type', fileInfo.mimetype)
        ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}
        `)
    }
}

module.exports = new MomentCroller()