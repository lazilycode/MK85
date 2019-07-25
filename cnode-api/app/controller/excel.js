

let nodeExcel = require('excel-export');
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
        // fs.rmdirSync('out.xlsx');
        // deleteFolder('./')

    }

     deleteFolder(path) {
        var files = [];
        if (fs.existsSync(path)) {
            if (fs.statSync(path).isDirectory()) {
                files = fs.readdirSync(path);
                files.forEach(function (file, index) {
                    var curPath = path + "/" + file;
                    if (fs.statSync(curPath).isDirectory()) {
                        deleteFolder(curPath);
                    } else {
                        fs.unlinkSync(curPath);
                    }
                });
                fs.rmdirSync(path);
            } else {
                fs.unlinkSync(path);
            }
        }
    }


}

module.exports = Excel;