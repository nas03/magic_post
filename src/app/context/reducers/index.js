import {combineReducers } from 'redux'
import TableGatherReducer from './updateTableReducer';
import orderListReducer from './orderListReducer'

const myReducer = combineReducers({
    tableData: TableGatherReducer,
    orderList: orderListReducer
})

export default (state, action) => myReducer(state, action)