/*
包含多个用于生成新的state的reducer函数的模块
 */
import {combineReducers} from 'redux'

import {getRedirectPath} from '../utils'

import {
    AUTH_SUCCESS,
    ERROR_MSG
} from './action-types'

// 产生user状态的reducer
const initUser = {
    username: '',
    password: '',
    msg: '', // 需要显示的错误信息
    redirectTo: '' // 需要自动跳转的路径
};

function user(state = initUser, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            const redirectTo = getRedirectPath(action.data.type, action.data.header)
            const user = action.data
            return {...user, redirectTo}
        case ERROR_MSG:
            const msg = action.data
            return {...state, msg} //?
        default:
            return state;
    }
}

// 合并多个reducer，生成一个新的reducer
// 返回的状态，是包含所有状态的对象: {xxx}
export default combineReducers({
    user
})