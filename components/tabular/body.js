import React from 'react'
import {
    TableBody,
    TableRow,
}  from 'react-md/lib'
import { FieldArray } from 'redux-form'
import { connect } from 'react-redux' 
import { formValues } from 'redux-form'
class Body extends React.Component{
    constructor(props){
        super(props)
    }

    getVisible(form) {
        return form.data.map(row => !form.recognized || row.selected);
    }

    renderTableBody = ({dataState, formName, ...props})=>{    
        return(
                <TableBody>
                        {props.fields.map((_, index)=>
                        {
                            const member = `${props.fields.name}[${index}]`
                            const rowIndex = index
                            if(!props.recognized || props.recognized && props.fields.get(index).checkbox)//!fields.get(index).checkbox)
                                return (
                                <TableRow 
                                key = {index}
                                visible={this.getVisible[index]}
                                >     
                                    {React.Children.map(props.children, (child,index)=>
                                        React.cloneElement(child,{formName, member, key: index, colIndex:index, rowIndex,dataState})
                                        )
                                    }
                                </TableRow>  
                            )
                        }
                        )}
                </TableBody>
        )
    }

    render(){
        return(
                <FieldArray
                    component = {this.renderTableBody}
                    name = {this.props.name?this.props.name:'data'}
                    props = {this.props}
                    rerenderOnEveryChange = {true}
                />
        )
    }
}

const mapStateToProps = (state, ownProps)=>({})
const mapDispatchToProps = {}

export default formValues({recognized:'recognized'})(connect(
    mapStateToProps,
    mapDispatchToProps,
)(Body))
