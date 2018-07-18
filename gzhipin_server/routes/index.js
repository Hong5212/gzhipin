var express = require('express');
var router = express.Router();
const md5 = require('blueimp-md5')

const {UserSchema} = require('../db/models')

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

/*router.post('/register', function (req, res, next) {
    const {username, password} = req.body
    console.log('register', username, password);
    if(username === 'admin'){
        res.send({code: 1, msg: '此用户已存在'})
    }else {
        res.send({code: 0, data: {_id: 'abc', username, password}})
    }
})*/

/*
1. 获取请求参数数据
2. 处理数据
3. 返回响应
 */

//注册的路由
router.post('/register', function (req, res) {
    //1. 获取请求参数数据
    const {username, password, type} = req.body
    //2. 处理数据
        // 2.1. 根据username查询users集合中对应的user
    UserSchema.findOne({username}, function (error, user) {
        if(user){
            res.send({
                "code": 1,
                "msg": "此用户已存在"
            })
        }else{
            // 2.3. 如果没有, 保存到users中
            new UserSchema({username, password: md5(password), type}).save(function(error, user) {
                // 向浏览器返回一个userid的cookie
                res.cookie('userid', user._id, {maxAge: 1000*60*60*24*7})

                // 3. 返回响应(成功)
                res.send({
                    "code": 0,
                    "data": {username, type, _id: user._id}
                })
            })
        }
    })
})
module.exports = router;
