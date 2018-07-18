/*
用户登陆的路由组件
 */
import React, {Component} from 'react'
import {NavBar, WingBlank, List, InputItem, Button, WhiteSpace} from 'antd-mobile';

import Logo from '../../components/logo/logo'

export default class Login extends Component {
    //定义初始状态
    state = {
        username: '',
        password: '',
        password2: '',
        type: 'dashen' // laoban
    };

    handleChange = (name, val) => {
        this.setState({
            [name]: val // 属性名是name的值, 而是name本身
        })
    }

    register = () => {
        console.log(this.state);
    }

    goRegister = () => {
        //跳转到登陆的路由
        this.props.history.replace('/register')
    }

    render() {
        return (
            <div>
                <NavBar>用户登录</NavBar>
                <Logo/>
                <WingBlank>
                    <List>
                        <WhiteSpace/>
                        <InputItem placeholder="请输入用户名" onChange={val => this.handleChange('username', val)}>用户名：</InputItem>
                        <WhiteSpace/>
                        <InputItem type='password' placeholder="请输入密码" onChange={val => this.handleChange('password', val)}>密码：</InputItem>
                        <WhiteSpace/>
                        <Button type="primary" onClick={this.register}>登&nbsp;&nbsp;录</Button>
                        <WhiteSpace/>
                        <Button onClick={this.goRegister}>还没有账号</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }

}