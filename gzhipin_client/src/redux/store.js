/*
redux最核心的store对象模块
redux管理状态的核心对象
 */
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import reducers from './reducers'

export default createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))