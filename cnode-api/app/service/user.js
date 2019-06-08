const Service = require('egg').Service;
class User extends Service {
    async info() {
        const { ctx } = this;
        return  'oooofcdc'
    }
}
module.exports = User;