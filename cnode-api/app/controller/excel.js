


const dlXlsx = require('../excel/index');
const fs = require('fs');
const path =require('path');
const Controller = require('egg').Controller;
class Excel extends Controller {
    async getExcel() {
        const { ctx } = this;
        //生成xlsx文件
        await dlXlsx();
        //类型
        ctx.type = '.xlsx';
        //请求返回，生成的xlsx文件
        ctx.body = fs.readFileSync('output.xlsx');
        //请求返回后，删除生成的xlsx文件，不删除也行，下次请求回覆盖
        fs.unlink('output.xlsx', function(err) {
            if (err) {
                return console.error(err);
            }
            console.log("文件删除成功！");
         });
    }
}

module.exports = Excel;