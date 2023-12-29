const initialState = {
    tableData : 'Gathering Point',
}

const TableGatherReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'UPDATETABLEGATHER':
            return {
                ...state, 
                tableData : action.tableType
            }      
            default:
            return state
        }

}

export default TableGatherReducer