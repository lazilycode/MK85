const Controller = require('egg').Controller;
class User extends Controller {
    async info() {
        const { ctx } = this;
        const userInfo = await ctx.service.user.info();
         ctx.body = userInfo;
    }
}
module.exports = User;