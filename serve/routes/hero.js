var express = require('express');
var router = express.Router();
var mysql = require('mysql');


var data = {
    code: 200,
    msg: 'success'
}; //最后返回的json对象

var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'DRsXT5ZJ6Oi55LPQ',
    database: 'war3'
});

// 获取单位列表
router.get('/', function(req, res, next) {
    pool.query(`SELECT * FROM hero_table`, function(err, results, fields) {
        if (err) {
            data.code = 500
            data.msg = err
        };
        data.data = results;
        res.statusCode = 200;
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader('Content-Type', 'application/json');
        res.json(data);
    });
})
module.exports = router;