import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavBar, WingBlank, List, InputItem, TextareaItem, Button} from 'antd-mobile'
import {Redirect} from 'react-router-dom'

import HeaderSelector from '../../components/header-selector/header-selector'
import {updateUser} from "../../redux/actions";

class DashenInfo extends Component{
    state = {
        header: '', // 头像名称
        info: '', // 职位简介
        post: '', // 职位名称
    }

    handleChange = (name, val) => {
        this.setState({
            [name]: val
        })
    }

    save = () => {
        this.props.updateUser(this.state)
    }

    // 设置更新header
    setHeader = (header) => {
        this.setState({header})
    }

    render(){
        const {header, type} = this.props.user
        if(header){ // 户信息已完善
            return <Redirect to='/dashen'/>
        }
        return(
            <div>
                <NavBar>大神信息完善</NavBar>
                <HeaderSelector setHeader={this.setHeader}/>
                <WingBlank>
                    <List>
                        <InputItem placeholder='请输入求职岗位' onChange={val => this.handleChange('post', val)}>求职岗位</InputItem>
                        <TextareaItem title='个人介绍' rows={3} onChange={val => this.handleChange('info', val)}/>
                        <Button type="primary" onClick={this.save}>保存</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {updateUser}
)(DashenInfo)