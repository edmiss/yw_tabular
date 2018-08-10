import React from 'react'
import { injectIntl } from 'react-intl';
import { TextField, FontIcon, } from 'react-md'
import { Field } from 'redux-form'
class ActionSearch extends React.Component{
    //require message
    constructor(props){
        super(props)
    }
    render(){
        const {formName, dataState} = this.props
        return(
            <Field
                component = {renderSearchField}
                name = {'filter_keyword'}
                className = {'md-cell md-cell--bottom'}
                placeholder = {'Multi-Field Search'}
                props = {this.props}
            />
        )
    }
}


function renderSearchField(props){
    return(
        <TextField
            id = {props.input.name}
            placeholder = {props.placeholder}
            className = {props.className}
            onChange = {(v)=>props.input.onChange(v)}
            onBlur = {(v)=>props.input.onBlur(v)}
            onFocus = {(e)=>props.input.onFocus(e)}
            value = {props.input.value}
            leftIcon ={<FontIcon>search</FontIcon>}
        />
    )
}


export default injectIntl(ActionSearch)
