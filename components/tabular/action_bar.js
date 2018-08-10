import React from 'react'
import { injectIntl } from 'react-intl';
import { Grid } from 'react-md'

const ActionBar = ({messages, intl,formName, dataState, ...props})=>{
        if(!props.children)
            return <div></div>
        return(
            <Grid>
            {
            React.Children.map(props.children, (child,index)=>{
                return React.cloneElement(child,{key:index, formName, dataState})
            })
            }
            </Grid>
        )
}

export default injectIntl(ActionBar)