/*
包含n个接口请求函数的模块
每个函数对应一个接口
每个函数的返回值是promise对象
 */

import ajax from './ajax'

const BASIC = ''
// 请求注册接口
export const reqRegister = ({username, password, type}) => ajax(BASIC + '/register', {username, password, type}, 'POST')

// 请求登录接口
export const reqLogin = ({username, password}) => ajax(BASIC + '/Login', {username, password}, 'POST')