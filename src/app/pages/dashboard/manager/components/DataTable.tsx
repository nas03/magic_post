import * as React from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { useState, useEffect, useMemo } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import api from '@/src/lib/axios';
import { useSession } from 'next-auth/react';
import { Location } from '@/src/util';
import DeleteIcon from '@mui/icons-material/Delete';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { GridActionsCellItem, GridRowId } from '@mui/x-data-grid';
import { useCallback } from 'react';
import SecurityIcon from '@mui/icons-material/Security';

const fetchData = async () => {
	try {
		const response = await api.get('/api/admin/location');
		const data = response.data.data;
		console.log('data', data);
		const rows: Row[] = data.map((location: Location, index) => ({
			id: index + 1,
			col1: location.id,
			col2: location.name,
			col3: location.location,
			col4: location.type,
		}));

		return rows;
	} catch (error) {
		console.error('Error fetching data:', error);
		return [];
	}
};

let rows = [
	{
		id: 0,
		col1: 0,
		col2: '',
		col3: '',
		col4: '',
		col5: false
	},
];

type Row = {
		id: number,
		col1: number,
		col2: string,
		col3: string,
		col4: string,
		col5: boolean
}



export default function DataTable() {
	const [row, setRow] = useState<Row[]>(rows);
	const { data: session } = useSession();

	useEffect(() => {
		const fetchDataAndSetRows = async () => {
			if (session.user.role == 'LEADER') {
				const data = await fetchData();
				setRow(data);
				console.log(data);
			}
		};

		fetchDataAndSetRows();
	}, [session]);

	const deleteUser = useCallback(
		(id: GridRowId) => () => {
		  setTimeout(() => {
			setRow((prevRows) => prevRows.filter((row) => row.id !== id));
		  });
		},
		[],
	  )
	
	  const toggleAdmin = useCallback(
		(id: GridRowId) => () => {
		  setRow((prevRows) =>
			prevRows.map((row) =>
			  row.id === id ? { ...row, col5: !row.col5 } : row,
			),
		  );
		},
		[],
	  );
	
	  const duplicateUser = useCallback(
		(id: GridRowId) => () => {
		  setRow((prevRows) => {
			const rowToDuplicate = prevRows.find((row) => row.id === id)!;
			return [...prevRows, { ...rowToDuplicate, id: Date.now() }];
		  });
		},
		[],
	  );


	const columns = useMemo<GridColDef<Row>[]>(() => [
		{ field: 'col1', headerName: 'ID', width: 100 },
		{ field: 'col2', headerName: 'Name', width: 200 },
		{ field: 'col3', headerName: 'Location', width: 100 },
		{ field: 'col4', headerName: 'Role', width: 100 },
		{ field: 'col5', headerName: 'Verify', type: 'boolean', width: 100 },
		{
			field: 'actions',
			type: 'actions',
			width: 80,
			getActions: (params) => [
			  <GridActionsCellItem
				icon={<DeleteIcon />}
				label="Delete"
				onClick={deleteUser(params.id)}
			  />,
			  <GridActionsCellItem
				icon={<SecurityIcon />}
				label="Toggle Admin"
				onClick={toggleAdmin(params.id)}
				showInMenu
			  />,
			  <GridActionsCellItem
				icon={<FileCopyIcon />}
				label="Duplicate User"
				onClick={duplicateUser(params.id)}
				showInMenu
			  />,
			],
		  },
		],
		[deleteUser, toggleAdmin, duplicateUser],
	)

	return (
		<div style={{ height: 400, width: '100%' }}>
			<DataGrid
				rows={row}
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
