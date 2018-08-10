import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TableColumn } from 'react-md'
import { formValueSelector } from 'redux-form'


export class final_rate extends Component {


  render() {

      const {original_rate,yw_rate} = this.props.row
    return (
        <TableColumn
        className = 'md-table-column' 
        style = {{fontSize:13}}
        >
        {
            original_rate-yw_rate
        }
        </TableColumn>
    )
  }
}

const mapStateToProps = (state,ownProps) => ({
  row:formValueSelector(ownProps.formName)(state,ownProps.member)
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(final_rate)
