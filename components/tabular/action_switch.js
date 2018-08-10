import React from 'react'
import { Chip, Cell, Grid } from 'react-md'
import { messages } from './index'
import { injectIntl } from 'react-intl';
import { getFormValues, Field } from 'redux-form'
import { connect } from 'react-redux'


class ActionSwitch extends React.Component{
    constructor(props){
        super(props)
    }

    handleClick = () => {

    }

    
    renderSwitch = ({input,meta, ...props}) =>{
        // console.log(input)
        // console.log(props)
        return(
            // <Cell>
                // <Grid>
                    <>
                    <Chip
                    style = {{top:'50%', transform:'translateY(-50%)', width:'50%'}} 
                    // className = 'md-cell--6'
                    label = {this.props.intl.formatMessage(messages.actionAll)}
                    onClick = {()=>(input.onChange(false))}
                    />
                    <Chip 
                    // style = {{marginTop:'0.3em'}} 
                    style = {{top:'50%', transform:'translateY(-50%)', width:'50%'}} 
                    // className = 'md-cell--6'
                    label = {this.props.intl.formatMessage(messages.actionRecogized)}
                    onClick = {()=>
                            input.onChange(true)}
                    />
                    </>
                 //</Grid>
            // </Cell>
        )
    }


    render(){
        return(
            <Cell size = {4}>
            <Field
            name = 'recognized'
            component = {this.renderSwitch}
            />
            </Cell>
        )
    }
}

export default injectIntl(
    connect(
        (state, ownProps) =>(
            {
                values: getFormValues(ownProps.formName)(state)
            }
        )
    )
    (ActionSwitch)
)