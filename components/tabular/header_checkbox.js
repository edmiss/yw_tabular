import React from 'react'
import { SelectionControl, Checkbox } from 'react-md'
import { getFormValues, blur } from 'redux-form'
import { connect } from 'react-redux'
import { TableColumn } from 'react-md'


let HeaderCheckbox = (props) =>{
    //formName was passed from tabular
    return(
        <TableColumn
        header = {false}
        >
            <Checkbox
            id = {`${props.formName}select-all-checkbox`}
            name = {'select-all-checkbox'}
            label = ""
            defaultChecked = {false}
            onChange = {(newValue,changeEvent)=>{
                // console.log(props.name)
                // console.log(props.values)
                props.values[props.name?props.name:'data'].map((value,index)=>{
                    props.blur(props.formName, `${props.name?props.name:'data'}[${index}].checkbox`, newValue)
                })
            }}
            />
        </TableColumn>
    )
}

// const selector = formValueSelector('offer_management')

const mapStateToProps = (state, ownProps) => {
    return(
        {values: getFormValues(ownProps.formName)(state)}
    )
}


HeaderCheckbox = connect(
mapStateToProps,
{blur}
)(HeaderCheckbox)


export default HeaderCheckbox