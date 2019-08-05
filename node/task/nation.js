var Crawler = require("crawler");
var mysql = require('mysql');

var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'DRsXT5ZJ6Oi55LPQ',
    database: 'war3'
});

// 种族信息亦可插入，待完善
let $sql = `CREATE TABLE unit_table( 
unit_id INT NOT NULL AUTO_INCREMENT, 
unit_name VARCHAR(10) NOT NULL, 
unit_name_en VARCHAR(20) NOT NULL, 
unit_nation VARCHAR(20) NOT NULL, 
unit_img VARCHAR(100) NOT NULL, 
unit_introduction VARCHAR(500) NOT NULL, 
unit_profile VARCHAR(500) NOT NULL, 
unit_params VARCHAR(1000) NOT NULL, 
unit_skill VARCHAR(4000) NOT NULL, 
PRIMARY KEY(unit_id, unit_name)) ENGINE = InnoDB DEFAULT CHARSET = utf8;
`;
pool.query($sql, function(err, results, fields) {
    if (err) {
        console.log("数据库创建失败", err)
    }
})

let list = [{
        name: "human",
        nation: "人族",
        url: "http://games.sina.com.cn/z/war3/human/peasant.shtml",
        urlList: []
    },
    {
        name: "ne",
        nation: "暗夜",
        url: "http://games.sina.com.cn/z/war3/ne/wisp.shtml",
        urlList: []
    },
    {
        name: "orc",
        nation: "兽族",
        url: "http://games.sina.com.cn/z/war3/orc/kugong.shtml",
        urlList: []
    },
    {
        name: "un",
        nation: "不死",
        url: "http://games.sina.com.cn/z/war3/un/acolyte.shtml",
        urlList: []
    }
]

// 人族破法未采集到，待修复  报错待修复
var c = new Crawler({
    // 在每个请求处理完毕后将调用此回调函数
    callback: function(error, res, done) {
        if (error) {
            console.log(error);
        } else {
            var $ = res.$;
            // $ 默认为 Cheerio 解析器
            // 它是核心jQuery的精简实现，可以按照jQuery选择器语法快速提取DOM元素
            $("br,p:empty").remove();
            if ($("td>h1").text().trim()) {
                let name = res.options.uri.split("/")[5];
                let currentNation = list.find(item => item.name === name);
                if (currentNation.urlList.length) {
                    let name = $("img[src^='http://image2.sina.com.cn/gm/ol/war3']").eq(0).parent().parent().parent().next().text().trim();
                    if (!name.includes("：")) {
                        // 只采集普通单位数据
                        let index = name.indexOf("(") + 1 || name.indexOf("（") + 1;
                        let unit_name = name.slice(0, index - 1).trim();
                        let unit_name_en = name.slice(index, -1).trim().replace(/[)）]/, "");
                        let unit_nation = currentNation.nation;
                        let unit_img = $("img[src^='http://image2.sina.com.cn/gm/ol/war3']").eq(0).attr("src");
                        let unit_introduction = $("img[src^='http://image2.sina.com.cn/gm/ol/war3']").eq(0).parent().parent().next("td").text().trim().slice(0, 500);
                        let unit_profile = $("tr:contains('简介')").next().text().trim();

                        let unit_params = {}
                        let $tds = $("div:contains('训练费用'),p:contains('训练费用')").parent().parent().parent().find("td");
                        $tds.each((tdi, td) => {
                            let text = $tds.eq(tdi).text().trim();
                            let textn = $tds.eq(tdi + 1).text().trim();
                            if (tdi % 2 === 0 && text) {
                                unit_params[text] = textn
                            }
                        })
                        unit_params = JSON.stringify(unit_params);


                        let $prevs = $("p:contains('魔法技能'),div:contains('魔法技能')").parent().parent().parent().prev().nextAll();
                        let unit_skill = "";
                        $prevs.each(function(i, ele) {
                            let html = $prevs.eq(i).html().trim();
                            if (html.startsWith("<tbody")) {
                                unit_skill += `<table>` + html + `</table>`;
                            } else {
                                unit_skill += html;
                            }
                        });
                        let sql = `INSERT INTO unit_table  (unit_name, unit_name_en, unit_nation, unit_img, unit_introduction, unit_profile, unit_params, unit_skill)  VALUES ('${unit_name}', '${unit_name_en}', '${unit_nation}', '${unit_img}', '${unit_introduction}', '${unit_profile}', '${unit_params}', '${unit_skill}')`
                        pool.query(sql, function(err, results, fields) {
                            if (err) {
                                console.log(unit_name, "插入失败", err)
                            }
                        })
                    }
                } else {
                    let $list = $("p:contains('仅对地单位'),div:contains('仅对地单位')").parent().parent().parent();
                    $list.find("a").each((i, a) => {
                        let href = a.attribs.href
                        if (!href.includes("heroes")) {
                            if (!href.startsWith("http")) {
                                href = "http://games.sina.com.cn" + href;
                            }
                            currentNation.urlList.push(href);
                        }
                    })
                    c.queue(currentNation.urlList);
                }
            } else {
                // console.log("tree")
                // 科技树
            }
        }
        done();
    }
});

c.queue(list.map(item => {
    return item.url
}))