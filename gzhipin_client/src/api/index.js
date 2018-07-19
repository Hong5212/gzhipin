/*
包含n个接口请求函数的模块
每个函数对应一个接口
每个函数的返回值是promise对象
 */

import ajax from './ajax'

const BASE = ''
// 请求注册接口
export const reqRegister = ({username, password, type}) => ajax(BASE + '/register', {username, password, type}, 'POST')

// 请求登录接口
export const reqLogin = ({username, password}) => ajax(BASE + '/Login', {username, password}, 'POST')

//更新用户信息
export const reqUpdateUser = (user) => ajax(BASE + '/update', user, 'POST')

//获取当前用户
export const reqUser = () => ajax(BASE + 'user')