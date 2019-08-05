var Crawler = require("crawler");
const csv = require('csvtojson');
var mysql = require('mysql');

var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'DRsXT5ZJ6Oi55LPQ',
    database: 'war3'
});
let $sql = `CREATE TABLE creep_table( 
creep_id INT NOT NULL AUTO_INCREMENT, 
creep_name VARCHAR(10) NOT NULL, 
creep_name_en VARCHAR(20) NOT NULL, 
creep_img VARCHAR(40) NOT NULL, 
creep_introduction VARCHAR(400) NOT NULL, 
creep_profile VARCHAR(400) NOT NULL, 
creep_params VARCHAR(1000) NOT NULL, 
creep_skill VARCHAR(4000) NOT NULL, 
PRIMARY KEY(creep_id, creep_name)) ENGINE = InnoDB DEFAULT CHARSET = utf8;
`;
pool.query($sql, function(err, results, fields) {
    if (err) {
        console.log("数据库创建失败", err)
    }
})

csv()
    .fromFile("../view/public/static/data/nation.csv")
    .then((jsonObj) => {
        if (Array.isArray(jsonObj)) {
            console.log("start", jsonObj.length)
            let data = jsonObj.map(item => {
                return {
                    html: item["字段1"]
                }
            })
            c.queue(data);
            console.log("end", jsonObj.length)
        } else {
            console.log(dataType(jsonObj));
        }

    })

var c = new Crawler({
    // 在每个请求处理完毕后将调用此回调函数
    callback: function(error, res, done) {
        if (error) {
            console.log(error);
        } else {
            var $ = res.$;
            // $ 默认为 Cheerio 解析器
            // 它是核心jQuery的精简实现，可以按照jQuery选择器语法快速提取DOM元素
            $("table").eq(0).remove();
            let $tableInfo = $("table").eq(0);
            let name = $tableInfo.find("tr").eq(1).text().trim();
            if (!name.includes("：")) {
                // 只采集普通单位数据
                let index = name.indexOf("(");
                let creep_name = name.slice(0, index).trim();
                let creep_name_en = name.slice(index + 1, -1).trim();
                let creep_img = $tableInfo.find("img").attr("src");
                let creep_introduction = $tableInfo.find("td").eq(1).text();
                let creep_profile = $("table").eq(3).text().replace("简介", "").trim();
                let creep_params = `<table>` + $("table").eq(2).html() + `</table>`;
                let $prevs = $("table").eq(3).nextAll();
                let creep_skill = "";
                $prevs.each(function(i, ele) {
                    let html = $prevs.eq(i).html().trim();
                    if (html.startsWith("<tbody")) {
                        creep_skill += `<table>` + html + `</table>`;
                    } else {
                        creep_skill += html;
                    }
                });
                let sql = `INSERT INTO creep_table  (creep_name, creep_name_en, creep_img, creep_introduction, creep_profile, creep_params, creep_skill)  VALUES ('${creep_name}', '${creep_name_en}', '${creep_img}', '${creep_introduction}', '${creep_profile}', '${creep_params}', '${creep_skill}')`
                pool.query(sql, function(err, results, fields) {
                    if (err) {
                        console.log(creep_name, "插入失败", err)
                    }
                })
            }
        }
        done();
    }
});

function dataType(data) {
    return ({}).toString.call(data).slice(8, -1)
}