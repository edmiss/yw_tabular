# yw_tabular 0.1

yw_tabular is a compound component that utilize react-md for visualization, redux and redux-fom for data manipulation.
In order to use this compound component, knowledge of redux and redux-form is required. 
Redux: https://redux.js.org/
Redux form: https://redux-form.com/7.4.2/
React md: https://docs.google.com/document/d/12HuyEX0NeEB4kI2V1sPE54AuUgcwYNArS-8RHbakp7U/edit
yw_lib.dataState: https://docs.google.com/document/d/12HuyEX0NeEB4kI2V1sPE54AuUgcwYNArS-8RHbakp7U
usage example:
https://bitbucket.org/youworld/ywsp-core-frontend/src/ecard-management-system/


**Target of this Project is to create beautiful, modifiable and extensible Editable Dynamic Table Component when you have all the data in redux without writing much actions/selectors.**

To use yw_tabular, put files within your project like structure below. 
File Structure:
 - components 
	 - tabular
 - selectors
	 - local-table

Usage of **yw_lib.datastate** is strong suggested if tabular requires any remote data. All component within Tabular can receive datastate so it can handle different data status.

# Tabular

The class that contains all the sub-component.  Pass props to children in order to let children use redux-form action create and redux-form selector.
It must wrapper with **reduxForm()** from redux-form library. 


These 3 props are passes through the tabular in order to use selectors and actions that relate to them 

 |  props | description |
|--|--|
 | name |name of the array that saves tabular data|
 | formName | name of redux form. default is 'data'| 
| dataState | *Optional. Pass dataState name to children that allows children using yw_lib datastate  |
To children Props:
|to children props | description |
|--|--|
| name  |name of the array that saves tabular data|
| formName  | name of redux form. default is 'data'| 
| dataState  | *Optional. Pass dataState name to children that allows children using yw_lib datastate  |

## ActionBar
Wrapper of a **react-md Grid** component. Can be used on top or bottom of a **Table**.
### ActionDrop
A well wrapped dropped down menu that take **react-md** **Listitem** as children. 
### ActionSwitch
A switch chips pair that switch the table between 'display all data' and 'display data that is checked'. Work with **Body** and **LocalBody**.
### ActionSearch
A search textfield that changes table contain right after you input your filter. Not case sensitive, apply to all fields. **Need to use LocalBody and local-table selectors.**

## Table
Wrapper for react-md table.  Must be a child of Tabular.
 | to children props | description |
|--|--|--|
 | name |name of the array that saves tabular data|
 | formName | name of redux form. default is 'data'| 
| dataState | *Optional. Pass dataState name to children that allows children using yw_lib datastate  |

## Header

Wrapper for **react-md TableHeader TableRow**. Must be a child of **Table**.

### Head
Wrapper of react-md table column and redux-form field with ~~sorting function.~~
( sorting function works but need some adjust.)

Non-sorting example:

    <Tabular.Head  field={'date_rate_start'}  message={{ id:  'title.rate_start', defaultMessage:  'date rate start' }}  />

### HeaderCheckbox

An checkbox that cancel/select all the checkbox in table (ignore pagination if using LocalPagination
It blurs all ***data(or your own name)*[*rownumber*].*checkbox*** to true/false 
	
## Body/LocalBody

### Body
A simple react-md table body wrapper that passes all children props:
Accept Data( or your custom wrapper of react-md TableColumn ) as children. Must be a child of **Table**.

|to children props| description |
|--|--|
| formName | name of form for further usage of action/selector |
|member| the address of children data within redux-form. default : **data[rowIndex].propertyName**|
|dataState| yw_lib datastate name for further usage of action/selector|
|key| index of current children element|
|colIndex | index of children's column |
|rowIndex | index of children's row|

### LocalBody
A react-md table body wrapper that work together with **local-table selectors** .   
This design allows it to have local multi-field search function with **LocalSearch** Component , and local automatic pagination using with **LocalPagination** component. 

LocalBody uses selector :
**localFormGetPage** from **local_table selectors**
You can edit the selector depend on your own usage. 


### Checkbox 
Checkbox is a react-md TableColumn Component wrapping a redux-form field. It create a field name **checkbox** so it can work together with HeaderCheckbox and have all checkbox information within redux-form.
It need to be a children of **LocalBody** or **Body**
### Data
Data is a wrapper of field that receive prop: member from it's parents. So it display what it suppose to display. 
|props| description |
|--|--|
| name | name of field   |
|type| *Optional. type of data. Current only support 'date' for display a react-md Datapicker for the data. |
|parse| redux-form Parse prop. allow user to decide that type of data they want to save within redux form.  |
|edit|*Optional. Curently only support value 'short' for inline edit. Create an editable table column that allows user to edit and changes redux value instantly. |


## LocalPaginationBar
LocalPaginationBar is Pagination that work with **LocalBody** and **filteredDataTotalSelector** within **local-table selectors**.  It provide functions include adjust page length, switch to next / last page. 
In order to user LocalPagination, form need to be set up with couple values:
In this example, data and rows are come form a **datastaste**( or any redux part that received data from a remote server | local file). After each time **fetchAllCardThunk** called, the Tabular will reintialize itself again.


    const  mapStateToProps  = (state) => ({
    initialValues:{
	    data:cardsAllDataSelector(state).hits,
	    page:1,
	    rows_per_page:10,
	    rows :  cardsAllDataSelector(state).total_hits,
	    start :  0
    },
    })
    const  mapDispatchToProps  = {
	    fetchAllCardsThunk
    }
    export  default  connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
	    form:  'card_all',
	    pure:  false,
	    enableReinitialize:  true,
	    keepDirtyOnReinitialize:  false,
    })(CardsAll)
    )
## local_table selectors
A bunch of reuseable selector if you use schema to build compound component. Whatever your formname is, selectors inside the Tabular component find your data for you and work properly. 

    const  mapStateToProps  = (state) => ({
    initialValues:{
	    data:cardsAllDataSelector(state).hits,
	    page:1,
	    rows_per_page:10,
	    rows :  cardsAllDataSelector(state).total_hits,
	    start :  0
    },
    })
    const  mapDispatchToProps  = {
	    fetchAllCardsThunk
    }
    export  default  connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
	    form:  'card_all',
	    pure:  false,
	    enableReinitialize:  true,
	    keepDirtyOnReinitialize:  false,
    })(CardsAll)
    )

**Major Selectors includes:**

 - localFormGetPage: This is the selector you use to get one page.
   sortedSelector: Combine all sorting conditions together, return an
   array of sorted data
 - localFormStartSelector: Choose the start location ( in the redux-form
   ) localFormRowsPerPageSelector: Choose the page length ( in the
   redux-form )
 - recognizedFilterSelector: return an array boolean that shows which
   row checked
 - allFieldFilterSelector: return an array boolean that shows which row
   satisfy search filters
 - filteredIndiceSelector: return an array boolean that shows which row
   satisfy all filters
 - filteredDataTotalSelector: return int show num of total after filter
## Example

