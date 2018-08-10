import React from 'react'
import { Field } from 'redux-form'
import { TableColumn } from 'react-md' 
import { FormattedMessage } from 'react-intl'
import { FontIcon } from 'react-md'
import { Button } from 'react-md'
import { DATASTATE_LOADING } from '../../yw_lib/datastate/states'
import { getState } from '../../yw_lib/datastate'

const Head = (props)=>{
    return(
    <TableColumn
    header = {true}>
        <Field
        name = {`sort`}
        component = {renderHead}
        props = {{targetName: props.field, ...props}}
        />
    </TableColumn>)
}

const renderHead = (props) =>{
    return(
        <Button 
        disabled = {!props.sortable || getState(props.dataState) == DATASTATE_LOADING}
        flat 
        iconBefore = {false} 
        iconEl = {props.sortable?<GetIcon {...props} />:null}
        onClick = {()=>
            {   
                //if remote sort, using the remoteSort fetch function
                props.remoteSort?
                props.remoteSort(
                    props.dataState,
                    getNewSort(props),
                    props.formName
                ).then(()=>
                changeSortTitle(props)):
                //else just active the fucntion change form
                ()=>changeSortTitle(props)
                // sortReduxForm('offer_management', 'offers', props.input.value.name, props.input.value.sort);
                // console.log(props.input.value)
            }
        }>
            <FormattedMessage {...props.message}/>
        </Button>)
}

const GetIcon = (props) =>{
    if(props.input.value.field == props.targetName && props.input.value.sort == true)
    {
        return <FontIcon>arrow_drop_down</FontIcon>
    }
    else if(props.input.value.field == props.targetName && props.input.value.sort == false)
    {
        return <FontIcon>arrow_drop_up</FontIcon>
    }
    else{ 
        return <FontIcon>arrow_right</FontIcon>
    }
}

export const  getNewSort = (props) =>
    (props.input.value != undefined || props.input.value.field != props.targetName) ?
    ({field:props.targetName, sort: !props.input.value.sort})
    :
    ({field:props.targetName, sort : true})





export function changeSortTitle(props){
    props.input.onChange(getNewSort(props))
}


export default Head