class FileController {
    async saveavatarInfo(ctx, next) {
        console.log(ctx.req.file);
        console.log(ctx.request.file);
    }
}

module.exports = new FileController();