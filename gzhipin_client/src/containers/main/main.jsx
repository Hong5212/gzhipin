/*
主界面组件
 */
import React, {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {NavBar} from 'antd-mobile'
import Cookies from 'js-cookie'

import LaobanInfo from '../laoban-info/laoban-info'
import DashenInfo from '../dashen-info/dashen-info'
import Laoban from '../laoban/laoban'
import Dashen from '../dashen/dashen'
import Message from '../message/message'
import Personal from '../personal/personal'
import NavFooter from '../../components/nav-footer/nav-footer'
import {connect} from "react-redux"
import {getUser} from '../../redux/actions'


class Main extends Component{
    // 给组件对象添加一个属性navList: 后面访问: this.navList
    navList = [
        {
            path: '/laoban', // 路由路径
            component: Laoban,
            title: '大神列表',
            icon: 'dashen',
            text: '大神',
        },
        {
            path: '/dashen', // 路由路径
            component: Dashen,
            title: '老板列表',
            icon: 'laoban',
            text: '老板',
        },
        {
            path: '/message', // 路由路径
            component: Message,
            title: '消息列表',
            icon: 'message',
            text: '消息',
        },
        {
            path: '/personal', // 路由路径
            component: Personal,
            title: '用户中心',
            icon: 'personal',
            text: '个人',
        }
    ]

    //组件已经加载
    componentDidMount(){
        //当前还没登录，当前面登录过 --> 发送异步的ajax请求，获取当前用户
        const id = this.props.user._id;
        const userid = Cookies.get('userid'); //获取Cookie
        if(!id && userid){
            this.props.getUser()
        }
    }
    render(){
        // 1. 如果从来没有登录过(cookie中没有userid)，自动跳转到login
        const userid = Cookies.set('userid');
        if(!userid){
            return <Redirect to='/login'/>
        }

        // 2. 登录过(cookie中有userid)，但当前还没登录(state.user._id没有)，需要实现自动登录(发送请求获取当前user)
        const {user} = this.props
        //render中不能发送ajax请求
        if(!user._id){
            return null //暂时不能显示
        }

        // 得到当前路由信息对象
        // 得到当前请求的路径
        const path = this.props.location.pathname;

        // 从navList中找出对应的nav    find(): 返回一个回调函数返回true的元素
        const currentNav = this.navList.find((nav, index) => path === nav.path) //nav就是navList里面的对象

        return(
            <div>
                {currentNav ? <NavBar>老板列表</NavBar>: null} {/*js代码要被{}包括着*/}
                <Switch>
                    <Route path='/laobaninfo' component={LaobanInfo}/>
                    <Route path='/dasheninfo' component={DashenInfo}/>
                    <Route path='/laoban' component={Laoban}/>
                    <Route path='/dashen' component={Dashen}/>
                    <Route path='/message' component={Message}/>
                    <Route path='/personal' component={Personal}/>
                </Switch>
                {currentNav ? <NavFooter/>: null}
            </div>
        )
    }
}

// 向外暴露是包含UI组件的容器组件
export default connect(
    state => ({user: state.user}),
    {}
)(Main);

/*
1. 如果从来没有登录过(cookie中没有userid)，自动跳转到login
2. 登录过(cookie中有userid)，但当前还没登录(state.user._id没有)，需要实现自动登录(发送请求获取当前user)
3. 当前已经登录了，如果请求的是根路径：'/'，自动跳转到对应的路由(getRedirectTo())
 */

/*
声明式编程: what(什么工作)  填空题
命令式编程: what(什么工作) + how(流程) 问答题
arr.reduce((preTotal, item) => preTotal + item, 0)
 */

/*
回调函数
1. 你定义的
2. 你没有调用
3. 但最终它执行了
 */
