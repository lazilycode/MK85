const Service = require('egg').Service;
class User extends Service {
    
    async allData(arg) {
        const user= await this.app.mysql.select('data')

        return user;
    }
    
    async test(arg) {
        const row = {
            title: 'demo3ytgytgytfg',
            id: 3,
            start: '17000000',
            end: '180000000',
            className: 'green',
            test: 'abc'
           }
        const user= await this.app.mysql.update('data', row);
        if(  user.affectedRows === 1){
            return {
                code:'0000',
                mes:"成工"
            };
        }
      
       
    }
    async info(arg) {
        let arr=[]
        const { ctx } = this;
        let seventDay= this.AddDays(arg.startTime,7)
        console.log(arg.startTime,seventDay,999)
        //    2019-06-08 2019-06-15 999
        const user= await this.app.mysql.select('data')
        // const user = await this.app.mysql.query("select * from data where start>'"+arg.startTime+"' and start<'"+seventDay+"';")
        return user;
    }

    //addDay
    AddDays(date, days) {
        var nd = new Date(date)
        nd = nd.valueOf()
        nd = nd + days * 24 * 60 * 60 * 1000
        nd = new Date(nd)
        var y = nd.getFullYear()
        var m = nd.getMonth() + 1
        var d = nd.getDate()
        if (m <= 9) m = '0' + m
        if (d <= 9) d = '0' + d
        var cdate = y + '-' + m + '-' + d
        return cdate
      }
}
module.exports = User;