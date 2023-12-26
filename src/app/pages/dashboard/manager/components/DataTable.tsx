import * as React from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import api from '@/src/lib/axios';
import { useSession } from 'next-auth/react';
import { Location } from '@/src/util';

const fetchData = async () => {
	try {
		const response = await api.get('/api/admin/location');
		const data = response.data.data;
		console.log('data', data);
		const rows: GridRowsProp = data.map((location: Location, index) => ({
			id: index + 1,
			col1: location.id,
			col2: location.name,
			col3: location.location,
			col4: location.type,
			col5: <MoreHorizIcon />,
		}));

		return rows;
	} catch (error) {
		console.error('Error fetching data:', error);
		return [];
	}
};

const columns: GridColDef[] = [
	{ field: 'col1', headerName: 'ID', width: 100 },
	{ field: 'col2', headerName: 'Name', width: 200 },
	{ field: 'col3', headerName: 'Location', width: 100 },
	{ field: 'col4', headerName: 'Type', width: 100 },
	{
		field: 'col6',
		headerName: 'Actions',
		sortable: false,
		width: 140,
		renderCell: () => <MoreHorizIcon />,
	},
];

export default function DataTable() {
	const [rows, setRows] = useState<GridRowsProp>([]);
	const { data: session } = useSession();

	useEffect(() => {
		const fetchDataAndSetRows = async () => {
			if (session.user.role == 'LEADER') {
				const data = await fetchData();
				setRows(data);
				console.log(data);
			}
		};

		fetchDataAndSetRows();
	}, [session]);

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
