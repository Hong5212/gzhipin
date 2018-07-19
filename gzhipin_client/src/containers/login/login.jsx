/*
用户登陆的路由组件
 */
import React, {Component} from 'react'
import {NavBar, WingBlank, List, InputItem, Button, WhiteSpace} from 'antd-mobile';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import Logo from '../../components/logo/logo'
import {login} from "../../redux/actions";

class Login extends Component {
    //定义初始状态
    state = {
        username: '',
        password: ''
    };

    handleChange = (name, val) => {
        this.setState({
            [name]: val // 属性名是name的值, 而不是name本身
        })
    }

    login = () => {
        this.props.login(this.state)
        // console.log(this.state);
    }

    goRegister = () => {
        //跳转到登陆的路由
        this.props.history.replace('/register')
    }

    render() {
        const {msg, redirectTo} = this.props.user;
        // debugger
        // 如果redirectTo有值
        if(redirectTo){
            // 跳转到redirectTo
            console.log(redirectTo);
            return <Redirect to={redirectTo}/>
        }
        return (
            <div>
                <NavBar>用户登录</NavBar>
                <Logo/>
                <WingBlank>
                    <List>
                        <p className='error-msg'>{msg}</p>
                        <WhiteSpace/>
                        <InputItem placeholder="请输入用户名" onChange={val => this.handleChange('username', val)}>用户名：</InputItem>
                        <WhiteSpace/>
                        <InputItem type='password' placeholder="请输入密码" onChange={val => this.handleChange('password', val)}>密码：</InputItem>
                        <WhiteSpace/>
                        <Button type="primary" onClick={this.login}>登&nbsp;&nbsp;录</Button>
                        <WhiteSpace/>
                        <Button onClick={this.goRegister}>还没有账号</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }

}

// 向外暴露是包含UI组件的容器组件
export default connect(
    state => ({user: state.user}),
    {login}
)(Login);