import React, {Component} from 'react'
import {List, Grid} from 'antd-mobile'
import PropTypes from 'prop-types'

export default class HeaderSelector extends Component{

    static propTypes = {
        setHeader: PropTypes.func,isRequired
    }

    state = {
        icon: null
    }

    selectHeader = ({text, icon}) => {
        this.props.setHeader(text)
    }

    render(){
        const headerList = [];
        for(var i = 0; i < 20; i++){
            const text = '头像' + (i + 1);
            headerList.push({
                text,
                icon: require(`./imgs/${text}.png`)
            })
        }

        const header = '请选择头像：'
        return(
            <List renderHeader={()=> header}>
                <Grid columnNum={5}
                      onClick={this.selectHeader}
                      data={headerList}/>
            </List>
        )
    }
}