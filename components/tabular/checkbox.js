import React from 'react'

// const Data  = ({props})=>{
//     return ({name: props.name})
// }
import { Field } from 'redux-form'
import { TableColumn, Checkbox as MDCheckbox, SelectionControl } from 'react-md' 

const Checkbox = (props)=>{
    return(
    <TableColumn>
        <Field
        name = {`${props.member}.${props.name?props.name:'checkbox'}`}
        type = "text"
        component = {renderCheckbox}
        />
    </TableColumn>
    )}

const renderCheckbox = (props) =>{

    return(
        <MDCheckbox
        id = {props.input.name}
        name = {props.input.name?props.input.name:'checkbox'}
        label = ""
        value = {props.input.value}
        checked = {props.input.value==true}
        onChange = {(checked, e)=>{
            props.input.onChange(checked)
        }}
        />
    )
}

export default Checkbox