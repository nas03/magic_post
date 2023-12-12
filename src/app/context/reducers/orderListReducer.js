import React from 'react'

const initialState = {
    orderList : [{id: '', col1: '', col2: '', col3: ''}],
    nameList: '',
    typeList: ''
}

const orderListReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'UPDATEORDERLIST':
            return {
                ...state, 
                orderList : state.orderList.concat(action.order)
            }   
        case 'UPDATEORDERNAME':
            return {
                ...state,
                nameList: state.nameList.concat(action.orderName + ', ')
            }   
        case 'UPDATEORDERTYPE':
            return {
                ...state,
                typeList: state.typeList.concat(action.orderType + ', ')
            }   
        case 'CLEARORDERNAME':
            return {
                ...state,
                nameList: action.orderName
            }   
        case 'CLEARORDERTYPE':
            return {
                ...state,
                typeList: action.orderType
            }   

        default:
            return state
    }

}
export default orderListReducer