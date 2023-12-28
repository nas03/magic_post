import React from 'react'

const initialState = {
   IDAm: '',
   nameAm: '',
   locationAm: '',
   typeAm: '',
   tableType: '',
   roleAm: ''
}

const dataAdminReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'UPDATEIDADMIN':
            return {
                ...state, 
                IDAm : action.id
            }   
        case 'UPDATENAMEADMIN':
            return {
                ...state,
                nameAm: action.Name
            }   
        case 'UPDATELOCATIONADMIN':
            return {
                ...state,
                locationAm: action.Location
            }   
        case 'UPDATETYPEADMIN':
            return {
                ...state,
                typeAm: action.Type
            }   
        case 'UPDATETABLETYPEADMIN':
            return {
                ...state,
                tableType: action.tableType
            }   
        case 'UPDATEROLEADMIN':
            return {
                ...state,
                roleAm: action.Role
            }   
        default:
            return state
    }

}
export default dataAdminReducer