import * as React from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import api from '@/src/lib/axios';
import { useSession } from 'next-auth/react';
import { TransshipmentLog } from '@/src/util';
import DeleteIcon from '@mui/icons-material/Delete';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { GridActionsCellItem, GridRowId } from '@mui/x-data-grid';
import { useMemo, useCallback } from 'react';
import SecurityIcon from '@mui/icons-material/Security';
import { useSelector, useDispatch } from 'react-redux';
import {
	updateOrderType,
	updateOrderQuality,
} from '../../../../../context/actions/updateDataBranch';

let rows = [
	{
		id: 0,
		col1: 0,
		col2: '',
		col3: false,
		col4: 0,
		col5: 'Package',
		col6: 2,
	},
];

type Row = {
	id: number;
	col1: number;
	col2: string;
	col3: boolean;
	col4: number;
	col5: string;
	col6: number;
};

export default function DataTable({ tableData }) {
	const [row, setRow] = useState<Row[]>(rows);

	// if (tableData && tableData[0] != null) {
	// 	rows = tableData.map((log: TransshipmentLog, index) => ({
	// 		id: index + 1,
	// 		col1: log.id,
	// 		col2: log.request_location,
	// 		col3: log.verified_timestamp ? 'Confirmed' : 'Pending',
	// 		col4: log.package_id,
	// 	}));
	// }

	const dispatch = useDispatch();

	const deleteUser = useCallback(
		(id: GridRowId) => () => {
			setTimeout(() => {
				setRow((prevRows) => prevRows.filter((row) => row.id !== id));
			});
		},
		[]
	);

	const toggleAdmin = useCallback(
		(id: GridRowId) => () => {
			setRow((prevRows) =>
				prevRows.map((row) =>
					row.id === id ? { ...row, col3: !row.col3 } : row
				)
			);
		},
		[]
	);

	const duplicateUser = useCallback(
		(id: GridRowId) => () => {
			setRow((prevRows) => {
				const rowToDuplicate = prevRows.find((row) => row.id === id)!;
				return [...prevRows, { ...rowToDuplicate, id: Date.now() }];
			});
		},
		[]
	);

	const columns = useMemo<GridColDef<Row>[]>(
		() => [
			{ field: 'col1', headerName: 'ID', width: 100 },
			{ field: 'col2', headerName: 'Request', width: 200 },
			{ field: 'col3', headerName: 'Verify', type: 'boolean', width: 100 },
			{ field: 'col4', headerName: 'PackageID', width: 100 },
			{ field: 'col5', headerName: 'PackageType', width: 150 },
			{ field: 'col6', headerName: 'PackageQuality', width: 150 },
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
		[deleteUser, toggleAdmin, duplicateUser]
	);

	const getOrderTypeAndQuality = (e: any) => {
		dispatch(updateOrderType(e.col5));
		dispatch(updateOrderQuality(e.col6));
	};

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
				onRowClick={(e) => getOrderTypeAndQuality(e.row)}
				disableRowSelectionOnClick
			/>
		</div>
	);
}
