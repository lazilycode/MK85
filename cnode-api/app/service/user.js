const Service = require('egg').Service;
class User extends Service {
    async info() {
        let arr=[]
        const { ctx } = this;
        const user = await this.app.mysql.query("select * from data where start>'2012-01-20 00:00:00' and start<'2012-02-7 00:00:00';");
        arr.push(user)
        return arr;
    }
}
module.exports = User;