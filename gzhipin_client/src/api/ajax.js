/*
使用axios封装的ajax请求函数
函数返回的是promise对象
 */

import axios from 'axios'

export default function ajax(url, data={}, type='GET'){
    if(type === 'GET'){ //GET请求
        // 准备url query参数数据
        // /register?username=tom&password=123
        let queryStr = '' //数据拼接字符串
        Object.keys(data).forEach(key => { //Object.keys()返回的是属性名组成的数组
            const value = data[key]
            queryStr += key + '=' + value + '&'
        })
        if(queryStr){
            queryStr = queryStr.substring(0, queryStr.length - 1)
            queryStr = '?' + queryStr
        }
        return axios.get(url + queryStr)
    }else{ //POST请求
        return axios.post(url, data)
    }
}