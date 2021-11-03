const app = require('./app/index')
const config = require('./app/config')


app.listen(config.APP_PORT, () => {
    console.log(`服务器在端口${APP_PORT}已启动~`);
})