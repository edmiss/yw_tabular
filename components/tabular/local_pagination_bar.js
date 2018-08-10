import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { TablePagination } from 'react-md'
import { Fields, blur } from 'redux-form'
import { filteredDataTotalSelector } from '../../selectors/local_table'
export class LocalPaginationBar extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <Fields
      names = {['page', 'rows', 'rows_per_page','start']}
      component = {renderTablePagination}
      props = {this.props}
      />
    )
  }
}

const renderTablePagination = ({formName,start, page,rows,rows_per_page,blur,filteredRows,...fields})=>{
  return(
  <TablePagination 
  // page = {page.input.value}
  rows = {filteredRows}
  rowsPerPage = {rows_per_page.input.value}
  // defaultRowsPerPage = {15}
  id = {'id-local-table-pagination'}
  onPagination = {(newStart, rowsPerPage, currentPage)=>{
    console.log(newStart)
    console.log(rowsPerPage)
    console.log(currentPage)
    console.log(formName)
    start.input.onChange(newStart)
    rows_per_page.input.onChange(rowsPerPage)
  }}
  /> )
}

const mapStateToProps = (state, ownProps) => ({
  filteredRows:filteredDataTotalSelector(state,ownProps)
})

const mapDispatchToProps = {
  blur
}

export default connect(mapStateToProps, mapDispatchToProps)(LocalPaginationBar)
