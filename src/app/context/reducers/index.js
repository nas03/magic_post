import {combineReducers } from 'redux'
import TableGatherReducer from './updateTableReducer';
import orderListReducer from './orderListReducer'
import dataAdminReducer from './dataAdmin';

const myReducer = combineReducers({
    tableData: TableGatherReducer,
    orderList: orderListReducer,
    dataAdmin: dataAdminReducer
})

export default (state, action) => myReducer(state, action)