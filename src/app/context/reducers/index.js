import {combineReducers } from 'redux'
import TableGatherReducer from './updateTableReducer';
import orderListReducer from './orderListReducer'
import dataAdminReducer from './dataAdmin';
import dataBranchReducer from './dataBranch'

const myReducer = combineReducers({
    tableData: TableGatherReducer,
    orderList: orderListReducer,
    dataAdmin: dataAdminReducer,
    dataBranch: dataBranchReducer
})

export default (state, action) => myReducer(state, action)