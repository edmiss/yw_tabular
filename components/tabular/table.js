import React from 'react'
import { DataTable } from 'react-md'

const Table = (props)=>{
    const {name, formName, dataState} = props
    // console.log(props.formName)
    return(
        <DataTable
        plain
        baseId = 'datatable-baseid'
        selectableRows = {false}
        >
        {React.Children.map(props.children, (child,index)=>
        React.cloneElement(child,{name, formName, dataState, key: index})
            )
        }
        </DataTable>
    )
}

export default Table