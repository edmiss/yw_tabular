import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ListItem } from 'react-md'
import { getFormValues } from 'redux-form'
import { cardsEditFormCheckedSelector,cardsEditFormSelector } from '../../selectors/card_edit'

export class EditCompanyCards extends Component {

  constructor(props){
    super(props)
  }


  render() {
    return (
      <ListItem
        primaryText = 'Submit Selected Edits'
        onClick = {()=>{
          console.log(this.props.checked)
        }}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  checked:cardsEditFormCheckedSelector(state)
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCompanyCards)
