const app = require('./app/index')
const config = require('./app/config')
require('./app/database')


app.listen(config.APP_PORT, () => {
    console.log(`服务器在端口${config.APP_PORT}已启动~`);
})