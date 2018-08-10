import React from 'react'
import Body from './body'
import Data from './data'
import Header from './header'
import Table from './table'
import Checkbox from './checkbox'
import HeaderCheckbox from './header_checkbox'
import ActionButtonGroup from './action_button_group'
import Head from './head'
import ActionBar from './action_bar'
import ActionDrop from './action_drop'
import ActionSwitch from './action_switch'
import ActionSearch from './action_search'
import LocalBody from './local_body'
import LocalPaginationBar from './local_pagination_bar'
import EditCompanyCards from './edit_company_cards'
import { defineMessages } from 'react-intl' 
import FinalRate from './final_rate'
export const messages = defineMessages({
    actionDrop:{
        id:'tabular.actionDrop',
        defaultMessage:'Actions'
    },
    actionDelete:{
        id:'tabular.actionDelete',
        defaultMessage:'Delete'
    },
    actionSubmit:{
        id:'tabular.actionSubmit',
        defaultMessage: 'Submit for Review'
    },
    actionAll:{
        id:'tabular.actionAll',
        defaultMessage:'All'
    },
    actionRecogized:{
        id:'tabular.actionRecogized',
        defaultMessage:'Recognized'
    },
    actionDateStart:{
        id:'tabular.actionDateStart',
        defaultMessage:'Date Start'
    },
    actionDateEnd:{
        id:'tabular.actionDateEnd',
        defaultMessage:'Date End'
    },
    actionSubmitReview:{
        id:'tabular.actionSubmitReview',
        defaultMessage: 'Submit Review'
    },
    actionCancelReview:{
        id:'tabular.actionCancelReview',
        defaultMessage: 'Cancel Review / Offline'
    },
    actionOffline:{
        id:'tabular.actionOffline',
        defaultMessage:'Offline'
    }

})


export default class Tabular extends React.Component{
    
    static Body = Body;
    static Data = Data;
    static Header = Header;
    static Table = Table;
    static Checkbox = Checkbox;
    static HeaderCheckbox = HeaderCheckbox;
    static Head = Head;
    static ActionButtonGroup = ActionButtonGroup;
    static ActionBar = ActionBar
    static ActionDrop = ActionDrop
    static ActionSearch = ActionSearch
    static ActionSwitch = ActionSwitch
    static LocalBody = LocalBody
    static LocalPaginationBar = LocalPaginationBar
    static EditCompanyCards = EditCompanyCards
    static FinalRate = FinalRate
    constructor(props){
        super(props);
    }

    render(){
        const {name,formName,dataState} = this.props;
        return ( 
        <div>
            {React.Children.map(this.props.children, (child,index)=>
                React.cloneElement(child,{name, formName, key: index, dataState})
                )
            }
        </div>
        )
    }
}