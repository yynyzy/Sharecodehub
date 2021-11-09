class FileController {
    async saveavatarInfo(ctx, next) {
        //获取图片相关信息
        console.log(ctx.req.file);
        const { mimetype, filename, size } = ctx.req.file
    }
}

module.exports = new FileController();