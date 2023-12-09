'use client';
import * as React from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid';
import { post_type } from '@prisma/client';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import axios from 'axios';

export const revalidate = 30;

interface Post {
	post_id: number;
	location: string;
	type: post_type;
}

const fetchData = async () => {
	try {
		const response = await axios.get('/api/admin/post');
		const data = response.data.data;
    let id = 1;
		const rows: GridRowsProp = data.map((d: Post, index : number) => ({
			id: index + 1,
      col1: d.post_id,
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
	{ field: 'col1', headerName: 'Post ID', width: 100 },
	{ field: 'col2', headerName: 'Post', width: 300 },
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

	useEffect(() => {
		const fetchDataAndSetRows = async () => {
			const data = await fetchData();
			setRows(data);
			console.log(data);
		};

		fetchDataAndSetRows();
	}, [rows]);

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
