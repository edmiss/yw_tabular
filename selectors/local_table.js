import { createSelector } from 'reselect'
import { formValueSelector } from 'redux-form'
import  moment from 'moment'


export const localFormDataSelector = (state, ownProps)=> {
    return formValueSelector(ownProps.formName)(state,ownProps.name?ownProps.name:'data')
}

export const localFormPageSelector = (state,ownProps)=>{
    return formValueSelector(ownProps.formName)(state,'page')
}

export const localFormRowsSelector = createSelector(localFormDataSelector, localFormData=>(
    localFormData?localFormData.length:0
))

export const localFormRowsPerPageSelector = (state,ownProps)=>{
    return formValueSelector(ownProps.formName)(state, 'rows_per_page')
}

export const localFormStartSelector = (state,ownProps)=>{
    return formValueSelector(ownProps.formName)(state,'start')
}

export const localFormStartDateSelector = (state, ownProps)=>{
    return formValueSelector(ownProps.formName)(state,'date_start')
}

export const localFormEndDateSelector = (state, ownProps)=>{
    return formValueSelector(ownProps.formName)(state,'date_end')
}

export const recognizedSelector = (state,ownProps) =>{
    return formValueSelector(ownProps.formName)(state,'recognized')
}
export const sortConditionSelector = (state,ownProps) =>{
    return formValueSelector(ownProps.formName)(state, 'sort')
}

export const filterKeyWordSelector = (state,ownProps)=>{
    return formValueSelector(ownProps.formName)(state,'filter_keyword')
}

//this part is for find all selected Data and uploading
export const checkedFilterSelector = createSelector(
    localFormDataSelector, data=>data.map(value=>value.checkbox?true:false)
)

export const checkedIndiceSelector = createSelector(
    checkedFilterSelector, filter=>{
        let output = []
        filter.forEach((value,index)=>{
            if(value){
                output.push(index)
            }
        })
        return output
    }
)


export const allFieldFilterSelector = createSelector(
    localFormDataSelector,
    filterKeyWordSelector,
    (data = [], keyword = '')=>{
        // console.log(data.map(v => Object.values(v).some(v => new RegExp(keyword + '').test(v))))
        return data.map(v => Object.values(v).some(v => new RegExp(keyword + '','i').test(v)))
    } 
)


export const recognizedFilterSelector = createSelector(
    localFormDataSelector,
    recognizedSelector, (data = [],recognized=false)=>
        !recognized?data.map(value=>true):
        data.map(value=>value.checkbox?true:false)
)

export const dateEndFilterSelector = createSelector(
    localFormStartDateSelector,
    localFormEndDateSelector,
    localFormDataSelector,
    (start = '01/01/1970', end = '01/01/2100', data)=>
        data.map(value=>{
            if(!value.date_end)
                return true
            return moment(value.date_end,'MM/DD/YYYY').isSameOrAfter(start, 'MM/DD/YYYY')&&moment(value.date_end,'MM/DD/YYYY').isSameOrBefore(end, 'MM/DD/YYYY')
        })
)

export const filteredIndiceSelector = createSelector(
    recognizedFilterSelector,allFieldFilterSelector, dateEndFilterSelector, (recogMap,allFieldMap,/*, dateEndMap*/)=>{
        let output = []
        recogMap.forEach((tf,index)=>{
            if(recogMap[index]&&allFieldMap[index]/*&&dateEndMap[index]*/)
            output.push(index)
        })
        return output
    }
)

export const filteredDataTotalSelector = createSelector(filteredIndiceSelector,data=>data.length)

export const sortedSelector = createSelector(
    localFormDataSelector,
    filteredIndiceSelector, 
    sortConditionSelector,
    (data, filteredIndice,condition)=>{

    if(!condition)
        return filteredIndice

    let {field, sort} = condition

    if(condition.field == "date_end")
    {
        console.log(condition.field)
        return filteredIndice
        .slice()
        .sort((lhs, rhs) => {
            return sort?
            (+moment(data[lhs].date_end)-(+moment(data[rhs].date_end))):
            (+moment(data[rhs].date_end)-(+moment(data[lhs].date_end)))
        })   
    }
    return filteredIndice
    .slice()
    .sort((lhs,rhs)=>{
        // console.log('sorting....'+field+' '+sort)
        return sort?
        (data[lhs][field].localeCompare(data[rhs][field])):-(data[lhs][field].localeCompare(data[rhs][field]))
    })
    } 
)

export const localFormGetPage = createSelector(
    sortedSelector,
    localFormRowsPerPageSelector,
    localFormStartSelector, 
    (data,rowsPerPage,start)=>{
    return data.slice(start, start+rowsPerPage)
})





