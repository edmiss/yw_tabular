import React from 'react'
import { TableColumn} from 'react-md' 


const ActionButtonGroup = ({member,colIndex,rowIndex,dataState,formName, ...props})=>(
    <TableColumn>
        {React.Children.map(props.children, (child,index)=>
            React.cloneElement(child,{member, formName, dataState, key: index,colIndex, rowIndex })
            )
        }   
    </TableColumn>
)

export default ActionButtonGroup