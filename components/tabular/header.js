import React from 'react'
import {
    DataTable, 
    TableHeader,
    TableBody,
    TableRow,
    TableColumn,
    Checkbox
}  from 'react-md'
import PropTypes from 'prop-types'
import { FieldArray, Field } from 'redux-form'

export default class Header extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        // console.log(this.props.formName)
        const children = this.props.children;
        const {remoteSort, dataState} = this.props
        return(
            <TableHeader>
                <TableRow>
                {React.Children.map(this.props.children, (child,index)=>
                    React.cloneElement(child,{dataState,remoteSort, name:this.props.name, key: index, sorted:false, role:'button', formName:this.props.formName})
                    )
                }
                </TableRow>
            </TableHeader>
        )
    }
} 