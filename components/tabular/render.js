
import React from 'react'
import { EditDialogColumn, DatePicker, TableColumn} from 'react-md'

export const renderActionDatePicker =  (props)=>{
    return <DatePicker
        id = {props.id}
        className = {props.className}
        placeholder = {props.placeholder}
        {...props.input}
        />
}

export const renderEditDialogColumn = (props)=>{
    return <EditDialogColumn
        inline
        id = {props.id}
        className = {props.className}
        placeholder = {props.placeholder}
        {...props.input}
        />
}

export const renderEmptyColumn = (props)=>{
    return <TableColumn></TableColumn>
}