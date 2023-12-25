import * as React from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import api from '@/src/lib/axios';
import { useSession } from 'next-auth/react';

interface Location {
	location_id: number;
	location: string;
	type: string;
}

const fetchData = async (location_id: number, role: string) => {
	try {
		//TODO: fix this
		const response = await api.get('/api/admin/location');

		const data = response.data.data;
		const rows: GridRowsProp = data.map((d: Location, index: number) => ({
			id: index + 1,
			col1: d.location,
			col2: d.location,
			col3: d.type,
			col4: <MoreHorizIcon />,
		}));

		return rows;
	} catch (error) {
		console.error('Error fetching data:', error);
		return [];
	}
};

const columns: GridColDef[] = [
	{ field: 'col1', headerName: 'Location ID', width: 100 },
	{ field: 'col2', headerName: 'Location', width: 300 },
	{ field: 'col3', headerName: 'Type', width: 100 },
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
			if (session) {
				const data = await fetchData(
					session.user.location_id,
					session.user.role
				);
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
