import React from 'react'
import { Field } from 'redux-form'
import { Button, TableColumn, EditDialogColumn, Chip, DatePicker } from 'react-md' 
import { renderDatePicker } from '../common/render';


const Data = (props)=>(
        <Field
        props = {props}
        name = {`${props.member}.${props.name}`}
        type = {props.type?props.type:'text'}
        displayName = {props.displayName?props.displayName:undefined}
        component = {renderColumn}
        parse = {props.parse}
        />
)

const renderColumn = (props) =>{
    if(props.edit == 'short')
    return(
        <EditDialogColumn 
        inline
        type = {props.type}
        placeholder = {props.name}
        value = {props.input.value}
        onChange = {props.input.onChange}
        onFocus = {props.input.onFocus}
        onBlur = {props.input.onBlur}
        />
    )
    else if (props.type == 'jsonArray' && props.displayName!=undefined)
    return(
        <TableColumn>
            {
                props.input.value.length<3?
                props.input.value.map(
                (value,index)=>{
                    return <Button flat key = {index} >{(value[props.displayName])}</Button>
                }):
                props.input.value.slice(0,3).map(
                    (value,index)=>{
                        if(index == 2)
                            return <Button flat key = {index} tooltipLabel = {
                                props.input.value.map((value,index)=>
                                    <div key = {index}>{value[props.displayName]}</div>
                                )
                            } >...</Button>
                        return <Button flat key = {index} >{(value[props.displayName])}</Button>
                    }   
                )
            }
        </TableColumn>
    )
    else if (props.type ==='date'){
        return(
            <TableColumn>
                {
                    renderDatePicker(props)
                }
            </TableColumn>
        )
    }
    else
    return(
        <TableColumn
        className = 'md-table-column' style = {{fontSize:13}}>
            {(props.input.value)}
        </TableColumn>
    )
}

export default Data