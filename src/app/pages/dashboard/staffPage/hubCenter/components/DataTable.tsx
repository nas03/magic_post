'use client';
import * as React from 'react';
import { DataGrid, GridRowsProp, GridColDef,  GridRowParams } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid';
import { post_type } from '@prisma/client';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import api from '@/src/lib/axios';
import { useDispatch } from 'react-redux';
import { updateOrderList, updateOrderName, updateOrderType } from '../../../../../context/actions/updateOrderList'
import DeleteIcon from '@mui/icons-material/Delete';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { GridActionsCellItem, GridRowId } from '@mui/x-data-grid';
import { useMemo, useCallback } from 'react';
import SecurityIcon from '@mui/icons-material/Security';




let rows = [
	{
		id: 0,
		col1: 0,
		col2: '',
		col3: '',
		Approve: false,
	},
];

type Row = {
		id: number,
		col1: number,
		col2: string,
		col3: string,
		Approve: boolean,
}

export const revalidate = 30;

interface Post {
	post_id: number;
	location: string;
	type: post_type;
}

const fetchData = async () => {
	try {
		const response = await api.get('/api/admin/post');
		const data = response.data.data;
		let id = 1;
		const rows: GridRowsProp = data.map((d: Post, index: number) => ({
			id: index + 1,
			col1: d.post_id,
			col2: d.location,
			col3: d.type,
			// col4: <MoreHorizIcon />,
		}));

		return rows;
	} catch (error) {
		console.error('Error fetching data:', error);
		return [];
	}
};



export default function DataTable() {
	const [selectedRow, setSelectedRow] = useState([])
	const [row, setRow] = useState<Row[]>(rows);

	const dispatch = useDispatch()

	// useEffect(() => {
	// 	const fetchDataAndSetRows = async () => {
	// 		const data = await fetchData();
	// 		setRow(data);
	// 		console.log(data);
	// 	};

	// 	fetchDataAndSetRows();
	// }, []);

	const handleClick = (item:any) => {
		dispatch(updateOrderList(item.row))
		dispatch(updateOrderName(item.row.col2))
		dispatch(updateOrderType(item.row.col3))
		console.log('name', item.row.col2)
	}

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
			  row.id === id ? { ...row, Approve: !row.Approve } : row,
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
		{ field: 'col1', headerName: 'Post ID', width: 100 },
		{ field: 'col2', headerName: 'Post', width: 300 },
		{ field: 'col3', headerName: 'Type', width: 100 },
		{ field: 'Approve', type: 'boolean', width: 120 },
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
		<div style={{ height: 300, width: '100%' }}>
			<DataGrid
				onRowClick={(item) => handleClick(item)}
				rows={row}
				columns={columns}
				initialState={{
					pagination: {
						paginationModel: { pageSize: 5, page: 0 },
					},
				}}
				checkboxSelection
			/>
		</div>
	);
}
