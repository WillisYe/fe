var Crawler = require("crawler");
const csv = require('csvtojson');
var mysql = require('mysql');

var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'DRsXT5ZJ6Oi55LPQ',
    database: 'war3'
});
let $sql = `CREATE TABLE hero_table( 
hero_id INT NOT NULL AUTO_INCREMENT, 
hero_nation VARCHAR(10) NOT NULL, 
hero_name VARCHAR(10) NOT NULL, 
hero_name_en VARCHAR(20) NOT NULL, 
hero_img VARCHAR(40) NOT NULL, 
hero_introduction VARCHAR(400) NOT NULL, 
hero_level VARCHAR(400) NOT NULL, 
hero_params VARCHAR(1000) NOT NULL, 
hero_skill VARCHAR(4000) NOT NULL, 
hero_rate FLOAT NOT NULL, 
hero_scope VARCHAR(10) NOT NULL,
hero_main VARCHAR(10) NOT NULL,
hero_hp VARCHAR(10) NOT NULL,
hero_mp FLOAT NOT NULL, 
hero_ll FLOAT NOT NULL, 
hero_zl FLOAT NOT NULL, 
hero_mj FLOAT NOT NULL, 
hero_day INT NOT NULL, 
hero_night VARCHAR(10) NOT NULL,
hero_speed INT NOT NULL, 
PRIMARY KEY(hero_id, hero_name)) ENGINE = InnoDB DEFAULT CHARSET = utf8;
`;
pool.query($sql, function(err, results, fields) {
    if (err) {
        console.log("数据库创建失败", err)
    }
})

var itemCrawler = new Crawler({
    // 在每个请求处理完毕后将调用此回调函数
    callback: function(error, res, done) {
        if (error) {
            console.log(error);
        } else {
            var $ = res.$;
            // $ 默认为 Cheerio 解析器http://game.17173.com/zt/pc/war3/1/5.shtml
            // 它是核心jQuery的精简实现，可以按照jQuery选择器语法快速提取DOM元素 http://images.17173.com/game/2006/08/17/20060817134616099.gif
            $("br,p:empty").remove();
            let $wrap = $("strong").parent().parent().parent().next("tr").find("td>span");
            let $tableInfo = $wrap.find("table").eq(0);
            let name = $tableInfo.find("tr").eq(1).text().trim();
            if (!name) {
                name = "不死：死亡骑士";
            }
            let index = name.indexOf("：");
            let nation = name.slice(0, index).trim();
            if (nation === "人类") {
                nation = "人族"
            }
            let hero_nation = nation;
            let hero_name = name.slice(index + 1).trim();
            let hero_name_en = name.slice(index + 1).trim();
            let hero_img = $tableInfo.find("img").attr("src");
            let hero_introduction = $tableInfo.find("td").eq(1).text();

            let hero_level = {
                "攻击力[平均值]": [],
                "护甲": [],
                "力量": [],
                "敏捷": [],
                "智力": [],
                "生命": [],
                "魔法": []
            };
            let $trsLevel = $wrap.find("table").eq(2).find("tr");
            $trsLevel.each((tri, tr) => {
                if (tri) {
                    let $tds = $trsLevel.eq(tri).find("td");
                    hero_level["攻击力[平均值]"].push($tds.eq(1).text().trim());
                    hero_level["护甲"].push($tds.eq(2).text().trim());
                    hero_level["力量"].push($tds.eq(3).text().trim());
                    hero_level["敏捷"].push($tds.eq(4).text().trim());
                    hero_level["智力"].push($tds.eq(5).text().trim());
                    hero_level["生命"].push($tds.eq(6).text().trim());
                    hero_level["魔法"].push($tds.eq(7).text().trim());
                }
            })
            hero_level = JSON.stringify(hero_level);

            let hero_params = {};
            let $trs = $wrap.find("table").eq(1).find("tr");
            $trs.each((index, tr) => {
                if ($trs.eq(index).find("td").length === 1) {
                    $trs.eq(index).remove();
                }
            })
            let $tds = $wrap.find("table").eq(1).find("td");
            $tds.each((tdi, td) => {
                let text = $tds.eq(tdi).text().trim();
                let textn = $tds.eq(tdi + 1).text().trim();
                if (tdi % 2 === 0 && text) {
                    hero_params[text] = textn;
                }
            })
            hero_params = JSON.stringify(hero_params);
            let hero_rate = $tds.eq(9).text().trim();
            let hero_scope = $tds.eq(11).text().trim();
            let hero_main = $tds.eq(13).text().trim();
            let hero_hp = $tds.eq(15).text().trim();
            let hero_mp = $tds.eq(17).text().trim();
            let hero_ll = $tds.eq(19).text().trim();
            let hero_zl = $tds.eq(23).text().trim();
            let hero_mj = $tds.eq(21).text().trim();
            let hero_day = $tds.eq(25).text().trim();
            let hero_night = $tds.eq(27).text().trim();
            let hero_speed = $tds.eq(29).text().trim().slice(-4, -1);

            let $prevs = $wrap.find("table").eq(2).nextAll();
            let hero_skill = "";
            $prevs.each(function(i, ele) {
                let html = $prevs.eq(i).html().trim();
                if (html.startsWith("<tbody")) {
                    hero_skill += `<table>` + html + `</table>`;
                } else {
                    hero_skill += html;
                }
            });

            let sql = `INSERT INTO hero_table (hero_nation, hero_name, hero_name_en, hero_img, hero_introduction, hero_level, hero_params, hero_skill, hero_rate, hero_scope, hero_main, hero_hp, hero_mp, hero_ll, hero_zl, hero_mj, hero_day, hero_night, hero_speed) VALUES('${hero_nation}', '${hero_name}', '${hero_name_en}', '${hero_img}', '${hero_introduction}', '${hero_level}', '${hero_params}', '${hero_skill}', ${hero_rate}, '${hero_scope}', '${hero_main}', '${hero_hp}', ${hero_mp}, ${hero_ll}, ${hero_zl}, ${hero_mj}, ${hero_day}, '${hero_night}', ${hero_speed}) `
            pool.query(sql, function(err, results, fields) {
                if (err) {
                    console.log(hero_name, "插入失败", err)
                }
            })
        }
        done();
    }
});

function dataType(data) {
    return ({}).toString.call(data).slice(8, -1)
}

var listCrawler = new Crawler({
    // 在每个请求处理完毕后将调用此回调函数
    callback: function(error, res, done) {
        if (error) {
            console.log(error);
        } else {
            var $ = res.$;
            let $tr = $("tr:contains('《魔兽争霸3》—英雄详解')").next("tr");
            let $a = $tr.find("a");
            let arr = [];
            $a.each((index, a) => {
                arr.push(a.attribs.href);
            });
            itemCrawler.queue(arr);
        }
        done();
    }
});

listCrawler.queue(["http://game.17173.com/zt/pc/war3/1/5.shtml"])