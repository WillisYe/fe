var Crawler = require("crawler");
const csv = require('csvtojson');
var mysql = require('mysql');

var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'DRsXT5ZJ6Oi55LPQ',
    database: 'war3'
});
let $sql = `CREATE TABLE prop_table( 
prop_id INT NOT NULL AUTO_INCREMENT, 
prop_name VARCHAR(10) NOT NULL, 
prop_level TINYINT(1) NOT NULL,
prop_img VARCHAR(40) NOT NULL, 
prop_target VARCHAR(40) NOT NULL, 
prop_gold SMALLINT(4),
prop_wood SMALLINT(4),
prop_effect VARCHAR(100) NOT NULL, 
PRIMARY KEY(prop_id, prop_name)) ENGINE = InnoDB DEFAULT CHARSET = utf8;
`;
pool.query($sql, function(err, results, fields) {
    if (err) {
        console.log("数据库创建失败", err)
    }
})

csv()
    .fromFile("../view/public/static/data/prop.csv")
    .then((jsonObj) => {
        if (Array.isArray(jsonObj)) {
            let data = jsonObj.map(item => {
                return {
                    html: item["正文"]
                }
            })
            c.queue(data);
        } else {
            console.log(dataType(jsonObj));
        }

    })

let mark = "0级";

var c = new Crawler({
    // 在每个请求处理完毕后将调用此回调函数
    callback: function(error, res, done) {
        if (error) {
            console.log(error);
        } else {
            var $ = res.$;
            // $ 默认为 Cheerio 解析器
            // 它是核心jQuery的精简实现，可以按照jQuery选择器语法快速提取DOM元素
            $("table table").remove();
            let $trs = $("tr");
            $trs.each(function(i, ele) {
                let text = $trs.eq(i).text().trim()
                let len = text.length;
                if (len === 2) {
                    mark = text || mark;
                } else {
                    let $tr = $trs.eq(i);
                    let content = $tr.find("td").eq(1).text().trim();

                    let prop_img = $trs.eq(i).find("img").attr("src");
                    let prop_name = content.match(/^\S*/)[0];
                    let prop_level = getLevel(/\S级物品/, content, mark);
                    let prop_target = getVal(/使用对象：[^， 黄]*/, content, 5) || getVal(/使对：[^， 黄]*/, content, 3);
                    let prop_gold = getVal(/黄金：[^， 库]*/, content, 3);
                    let prop_wood = null;
                    if (prop_gold && prop_gold.includes("/")) {
                        prop_wood = prop_gold.split("/")[1]
                        prop_gold = prop_gold.split("/")[0]
                    }
                    let prop_effect = getVal(/效果：\S*/, content, 3);
                    if (prop_img) {
                        // console.log("name：", prop_name)
                        // console.log("等级：", prop_level)
                        // console.log("目标：", prop_target)
                        // console.log("价格：", prop_gold)
                        // console.log("效果：", prop_effect)
                        // console.log("图片：", prop_img)
                        // console.log("-----------------------")
                        let sql = `INSERT INTO prop_table  (prop_name, prop_level, prop_img, prop_target, prop_gold, prop_wood, prop_effect)  VALUES ('${prop_name}', ${prop_level}, '${prop_img}', '${prop_target}', ${prop_gold}, ${prop_wood}, '${prop_effect}')`
                        pool.query(sql, function(err, results, fields) {
                            if (err) {
                                console.log(prop_name, "插入失败", err)
                            }
                        })
                    }

                }
            })
        }
        done();
    }
});

function getLevel(reg, content, mark) {
    let arr = content.match(reg);
    if (arr) {
        return arr[0].trim().slice(0, 1)
    } else {
        return mark.trim().slice(0, 1);
    }
}

function getVal(reg, content, start) {
    let arr = content.match(reg);
    if (arr) {
        let r = arr[0].trim().slice(start)
        return r
    } else {
        return null;
    }
}

function dataType(data) {
    return ({}).toString.call(data).slice(8, -1)
}