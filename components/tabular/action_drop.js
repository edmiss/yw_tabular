import React from 'react'
import { injectIntl } from 'react-intl';
import { DropdownMenu, AccessibleFakeButton, IconSeparator, FontIcon, Cell } from 'react-md'

import { messages } from './index'

class ActionDrop extends React.Component{
    //require message
    constructor(props){
        super(props)
    }
    render(){
        const {formName, dataState} = this.props
        // console.log(this.props.formName)
        return(
            <Cell size = {4}>
                <DropdownMenu
                // className = {'md-cell'}
                style = {{top:'50%', transform:'translateY(-50%)', width:'100%',background:'white',zIndex:10}} 
                id={'action-drop-down-menu'}
                // listStyle = {{zIndex : 20}}
                menuItems={this.props.children?
                    React.Children.map(this.props.children,(child)=>{
                    return React.cloneElement(child, {formName,dataState})
                    })
                    :[]}
                anchor={{
                x: DropdownMenu.HorizontalAnchors.INNER_LEFT,
                y: DropdownMenu.VerticalAnchors.BOTTOM,
                }}
                position={DropdownMenu.Positions.TOP_LEFT}
                animationPosition="below"
                sameWidth
                >
                <AccessibleFakeButton
                component={IconSeparator}
                iconBefore
                label={
                    <IconSeparator label={this.props.intl.formatMessage(messages.actionDrop)}>
                    <FontIcon>arrow_drop_down</FontIcon>
                    </IconSeparator>
                }
                > </AccessibleFakeButton>
                </DropdownMenu>
            </Cell>
        )
    }
}

export default injectIntl(ActionDrop)
