import * as React from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import api from '@/src/lib/axios';
import { useSession } from 'next-auth/react';
import { TransshipmentLog } from '@/src/util';

const columns: GridColDef[] = [
	{ field: 'col1', headerName: 'ID', width: 100 },
	{ field: 'col2', headerName: 'Request', width: 200 },
	{ field: 'col3', headerName: 'Verify', width: 100 },
	{ field: 'col4', headerName: 'PackageID', width: 100 },
	{
		field: 'col6',
		headerName: 'Actions',
		sortable: false,
		width: 140,
		renderCell: () => <MoreHorizIcon />,
	},
];

export default function DataTable({ tableData }) {
	let rows: GridRowsProp = [
		{
			id: 0,
			col1: 0,
			col2: null,
			col3: null,
			col4: null,
			col5: <MoreHorizIcon />,
		},
	];
	if (tableData && tableData[0] != null) {
		rows = tableData.map((log: TransshipmentLog, index) => ({
			id: index + 1,
			col1: log.id,
			col2: log.request_location,
			col3: log.verified_timestamp ? 'Confirmed' : 'Pending',
			col4: log.package_id,
			col5: <MoreHorizIcon />,
		}));
	}
	return (
		<div style={{ height: 400, width: '100%' }}>
			<DataGrid
				rows={rows}
				columns={columns}
				initialState={{
					pagination: {
						paginationModel: { pageSize: 5, page: 0 },
					},
				}}
				checkboxSelection
				disableRowSelectionOnClick
			/>
		</div>
	);
}
