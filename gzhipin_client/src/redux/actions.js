/*
包含n个action creator函数的模块
同步action: 对象  (与action type一一对应)
异步action: 函数
 */
import {
    reqRegister,
    reqLogin,
    reqUpdateUser,
    reqUser,
    reqUsers
} from '../api'
import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RESET_USER,
    RECEIVE_USER,
    RECEIVE_USER_LIST
} from './action-types'


// 成功的同步action
const authSuccess = (user) => ({type: AUTH_SUCCESS, data: user}); //对象
// 失败的同步action
const errorMsg = (msg) => ({type: ERROR_MSG, data: msg}); //对象

//接受用户的同步action
const receiveUser = (user) => ({type: RECEIVE_USER, data: user});
//重置用户的同步action
export const resetUser = (msg) => ({type: RESET_USER, data: msg});
// 接收用户列表的同步action
const receiveUserList = (userList) => ({type: RECEIVE_USER_LIST, data: userList});
/*
注册的异步action
1. 执行异步代码(发ajax请求)
2. 有了结果后, 根据结果不同分发不同的同步action
 */
export function register(user) {
    const {username, password, password2, type} = user
    // 进行前台表单验证, 如果不通过, 直接返回一个失败的同步action对象
    if (!username) {
        return errorMsg('必须指定用户名')
    } else if (!password) {
        return errorMsg('必须指定密码')
    } else if (password !== password2) {
        return errorMsg('两次密码必须一致!')
    } else if (!type) {
        return errorMsg('类型不对')
    }
    return async dispatch => {
        // 1. 执行异步代码(发ajax请求)
        /*const promise = reqRegister({username, password, type})
        promise.then(response => {
            const result = response.data;
            if (result.code === 0) { //成功
                //发送成功的同步action
                dispatch(authSuccess(result.data))
            } else { //失败
                dispatch(errorMsg(result.msg))
            }
        })*/
        const response = await reqRegister({username, password, type})
        const result = response.data;
        if (result.code === 0) { //成功
            //发送成功的同步action
            dispatch(authSuccess(result.data))
        } else { //失败
            dispatch(errorMsg(result.msg))
        }
    }
}

/*
登陆的异步action
 */
export function login(user) {
    const {username, password} = user
    return async dispatch => {
        if (!username) {
            return errorMsg('必须指定用户名')
        } else if (!password) {
            return errorMsg('必须指定密码')
        }

        const response = await reqLogin({username, password})
        const result = response.data;
        if (result.code === 0) { //成功
            //发送成功的同步action
            dispatch(authSuccess(result.data))
        } else { //失败
            dispatch(errorMsg(result.msg))
        }
    }
}

/*
更新用户的异步action
 */
export function updateUser(user){
    return async dispatch => {
        const response = await reqUpdateUser(user)
        const result = response.data
        if(result.code === 0){
            dispatch(receiveUser(result.data))
        }else{
            dispatch(resetUser(result.msg))
        }
    }
}

/*
获取当前用户的异步action
 */
export function getUser(){
    return async dispatch => {
        const response = await reqUser()
        const result = response.data
        if(result.code === 0){
            dispatch(receiveUser(result.data))
        }else{
            dispatch(resetUser(result.msg))
        }
    }
}

/*
获取当前用户的异步action
 */
export function getUserList(type){
    return async dispatch => {
        const response = await reqUsers(type);
        const result = response.data;
        if(result.code === 0){
            dispatch(receiveUserList(result.data))
        }
    }
}