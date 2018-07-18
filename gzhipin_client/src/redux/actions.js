/*
包含n个action creator函数的模块
同步action: 对象  (与action type一一对应)
异步action: 函数
 */
import {reqRegister, reqLogin} from '../api'
import {AUTH_SUCCESS, ERROR_MSG} from './action-types'


// 成功的同步action
const authSuccess = (user) => ({type: AUTH_SUCCESS, data: user}) //对象

// 失败的同步action
const errorMsg = (msg) => ({type: ERROR_MSG, data: msg}) //对象

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

    if (!username) {
        return errorMsg('必须指定用户名')
    } else if (!password) {
        return errorMsg('必须指定密码')
    }
    return async dispatch => {
        const response = await reqRegister({username, password})
        const result = response.data;
        if (result.code === 0) { //成功
            //发送成功的同步action
            dispatch(authSuccess(result.data))
        } else { //失败
            dispatch(errorMsg(result.msg))
        }
    }
}