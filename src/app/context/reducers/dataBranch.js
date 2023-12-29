import React from 'react'

const initialState = {
   sender: '',
   senderLocation: '',
   senderPhone: '',
   receiver: '',
   receiverLocation: '',
   receiverPhone: '',
   orderType: '',
   customInstruction: '',
}

const dataBranchReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'UPDATESENDERBRANCH':
            return {
                ...state, 
                sender : action.Name
            }   
        case 'UPDATESENDERLOCATION':
            return {
                ...state,
                senderLocation: action.Location
            }   
        case 'UPDATESENDERPHONE':
            return {
                ...state,
                senderPhone: action.Phone
            }   
        case 'UPDATERECEIVERBRANCH':
            return {
                ...state,
                receiver: action.Name
            }   
        case 'UPDATERECEIVERLOCATION':
            return {
                ...state,
                receiverLocation: action.Location
            }   
        case 'UPDATERECEIVERPHONE':
            return {
                ...state,
                receiverPhone: action.Phone
            }   
        case 'UPDATEORDERTYPE':
            return {
                ...state,
                orderType: action.Type
            }   
        case 'UPDATECUSTOMINSTRUCTION':
            return {
                ...state,
                orderQuality: action.Instruction
            }   
        default:
            return state
    }

}
export default dataBranchReducer