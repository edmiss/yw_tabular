import React from 'react'
import {
    TableBody,
    TableRow,
}  from 'react-md'
import { FieldArray } from 'redux-form'
import { connect } from 'react-redux' 
import { formValues } from 'redux-form'
import { localFormDataSelector, localFormGetPage, localFormStartSelector,sortedSelector, sortConditionSelector } from '../../selectors/local_table'
class Body extends React.Component{
    constructor(props){
        super(props)
    }

    renderTableBody = (props)=>{
        return(
            <TableBody>
                    {props.pageData.map((sortedIndex, index)=>
                    {
                        const member = `${props.fields.name}[${sortedIndex}]`
                            return (
                            <TableRow 
                            key = {index}
                            >     
                                {React.Children.map(props.children, (child,index)=>
                                    React.cloneElement(child,{formName:this.props.formName, member, key: index})
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
                    // rerenderOnEveryChange = {true}
                />
        )
    }
}


const mapStateToProps = (state, ownProps)=>(
    {
        // pageData:localFormGetPage(state,ownProps),
        start:localFormStartSelector(state,ownProps),
        // pageData:localFormDataSelector(state,ownProps).slice(0,30),
        sorted:sortedSelector(state,ownProps),
        pageData:localFormGetPage(state,ownProps),
        sortCondition:sortConditionSelector(state,ownProps)
    }
)

const mapDispatchToProps = {
}

export default formValues({recognized:'recognized'})(connect(
    mapStateToProps,
    mapDispatchToProps,
)(Body))
