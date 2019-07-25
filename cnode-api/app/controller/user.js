const Controller = require('egg').Controller;
class User extends Controller {
    async info() {
        const { ctx } = this;
        const userInfo = await ctx.service.user.info(ctx.query);
        ctx.body = userInfo;
    }  
    async allData() {
        const { ctx } = this;
        console.log(ctx.query.id)
        const userInfo = await ctx.service.user.allData(ctx.query);
        ctx.body = userInfo;
    } 
    async test() {
        const { ctx } = this;
        console.log(ctx.query.id)
        const userInfo = await ctx.service.user.test(ctx.query);
        ctx.body = userInfo;
    }
}
module.exports = User;