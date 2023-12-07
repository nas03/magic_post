import * as React from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const dataRow = async() => {
  const data = fetch('/api/user/admin')
}
const rows: GridRowsProp = [
  {id: 1, col1: 1, col2: 'Enpul Rohman', col3: 'Delivered', col4: 'Book', col5: '$3.99', col6: <MoreHorizIcon/> },
  {id: 2, col1: 2, col2: 'Riko Sapto Dimo', col3: 'Delivered', col4: 'Electronic', col5: '$5.99', col6: <MoreHorizIcon/>},
  {id: 3,  col1: 3, col2: 'Pandi Atuk Senantiasa', col3: 'On Hold', col4: 'Furniture', col5: '$1.99', col6: <MoreHorizIcon/>},
  {id: 4,  col1: 4, col2: 'Dede Inon', col3: 'Delivered', col4: 'Delivered', col5: '$7.99', col6:  <MoreHorizIcon/>},
  {id: 5,  col1: 5, col2: 'Ariq Fikriawan Ramdani', col3: 'Waiting', col4: 'Book', col5:'$2.99' , col6: <MoreHorizIcon/>},
  {id: 6,  col1: 6, col2: 'Nazmi Javier', col3: 'Delivered', col4: 'Food', col5: '$1.00', col6: <MoreHorizIcon/>},
  {id: 7, col1: 7, col2: 'Enpul Rohman', col3: 'Delivered', col4: 'Book', col5: '$3.99', col6: <MoreHorizIcon/> },
  {id: 8, col1: 8, col2: 'Riko Sapto Dimo', col3: 'Delivered', col4: 'Electronic', col5: '$5.99', col6: <MoreHorizIcon/>},
  {id: 9,  col1: 9, col2: 'Pandi Atuk Senantiasa', col3: 'On Hold', col4: 'Furniture', col5: '$1.99', col6: <MoreHorizIcon/>},
  {id: 10,  col1: 10, col2: 'Dede Inon', col3: 'Delivered', col4: 'Delivered', col5: '$7.99', col6:  <MoreHorizIcon/>},
];

const columns: GridColDef[] = [
  { field: 'col1', headerName: 'No', width: 100 },
  { field: 'col2', headerName: 'Recipient', width: 300 },
  { field: 'col3', headerName: 'Status', width: 100 },
  { field: 'col4', headerName: 'Product', width: 150 },
  { field: 'col5', headerName: 'Fee', width: 100 },
  {
    field: "col6",
    headerName: "Actions",
    sortable: false,
    width: 140,
    renderCell: () => <MoreHorizIcon/>
  }
];



export default function DataTable() {
  return (
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} 
        initialState={{
            pagination: {
            paginationModel: { pageSize: 5, page: 0 },
            },
        }}
            checkboxSelection
            disableRowSelectionOnClick/>
        </div>
  );
}
