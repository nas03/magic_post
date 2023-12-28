import React from 'react'

const initialState = {
   IDAm: '',
   nameAm: '',
   locationAm: '',
   typeAm: ''
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
        default:
            return state
    }

}
export default dataAdminReducer