const Koa = require('Koa')

const app = new Koa()

app.listen(8080, () => {
    console.log("服务器已启动~");
})