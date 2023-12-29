import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import SecurityIcon from '@mui/icons-material/Security';
import { useSession } from 'next-auth/react';
import { useDispatch } from 'react-redux';
import { updateOrderType } from '../../../../../context/actions/updateDataBranch';
import { addSearchParams } from '@/src/util';
import { Package, TransshipmentLog, getFormattedDate } from '@/src/util';

const initialRows = [
	{
		id: 0,
		col1: 0,
		col2: '',
		col3: '',
		col4: '',
		col5: false,
	},
];

type Row = {
	id: number;
	col1: number;
	col2: string;
	col3: string;
	col4: string;
	col5: boolean;
};
const fetchTransshipmentLog = async (location_id: number) => {
	const url = new URL(
		addSearchParams(
			new URL('http://localhost:3000/api/employee/transshipment-log'),
			{
				location_id: location_id,
				role: 'BRANCH_OFFICER',
			}
		)
	);
	const response = await fetch(url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
		next: {
			revalidate: 3600,
		},
		cache: 'default',
	});
	const { data } = await response.json();
	console.log('data', data);
	return data;
};
const DataTransshipment = () => {
	const [rows, setRows] = useState<Row[]>([]);
	const [isComponentMounted, setComponentMounted] = useState(false);
	const dispatch = useDispatch();
	const { data: session, status } = useSession();
	const [staffLocation, setStaffLocation] = useState<number | undefined>(
		session?.user?.location_id
	);

	const deletePackage = useCallback(
		(id: number) => () => {
			setRows((prevRows) => prevRows.filter((row) => row.id !== id));
		},
		[]
	);
	const fetchData = useCallback(async () => {
		if (staffLocation !== undefined) {
			const data = await fetchTransshipmentLog(staffLocation);
			const tableTransshipmentRow = data.map(
				(pack: TransshipmentLog, index) => ({
					id: index + 1,
					col1: pack.id,
					col2: pack.request_location,
					col3: getFormattedDate(new Date(pack.request_timestamp)),
					col4: null,
				})
			);
			setRows(tableTransshipmentRow);
		}
	}, [staffLocation]);

	const verifyPackage = useCallback(
		async (id: number) => {
			const getRow = rows.find((row) => row.id === id);
			if (!getRow) return;

			const transshipment_id = Number(getRow.col1);
			const response = await fetch(
				'http://localhost:3000/api/employee/transshipment-log',
				{
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(transshipment_id),
				}
			);

			const body = await response.json();
			await fetchData();
			console.log('res', body);
		},
		[rows, fetchData]
	);

	const duplicatePackage = useCallback(
		(id: number) => () => {
			const rowToDuplicate = rows.find((row) => row.id === id);
			if (!rowToDuplicate) return;

			setRows((prevRows) => [
				...prevRows,
				{ ...rowToDuplicate, id: Date.now() },
			]);
		},
		[rows]
	);

	const columns = useMemo(
		() => [
			{ field: 'col1', headerName: 'ID', width: 100 },
			{ field: 'col2', headerName: 'Request Location', width: 100 },
			{ field: 'col3', headerName: 'Request Timestamp', width: 150 },
			{ field: 'col4', headerName: 'Verify Timestamp', width: 150 },
			{
				field: 'actions',
				type: 'actions',
				width: 80,
				getActions: (params) => [
					<GridActionsCellItem
						icon={<DeleteIcon />}
						label="Delete"
						onClick={deletePackage(params.id)}
					/>,
					<GridActionsCellItem
						icon={<SecurityIcon />}
						label="Toggle Admin"
						onClick={() => verifyPackage(params.id)}
						showInMenu
					/>,
					<GridActionsCellItem
						icon={<FileCopyIcon />}
						label="Duplicate User"
						onClick={duplicatePackage(params.id)}
						showInMenu
					/>,
				],
			},
		],
		[deletePackage, verifyPackage, duplicatePackage]
	);

	useEffect(() => {
		if (!isComponentMounted) {
			setRows(initialRows);
			setComponentMounted(true);
		}

		fetchData();
		const intervalId = setInterval(fetchData, 1000);

		return () => clearInterval(intervalId);
	}, [staffLocation, isComponentMounted, fetchData]);

	useEffect(() => {
		if (status === 'authenticated') {
			setStaffLocation(session?.user?.location_id);
		}
	}, [session, status]);

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
				onRowClick={(e) => dispatch(updateOrderType(e.row.col5))}
				disableRowSelectionOnClick
			/>
		</div>
	);
};

export default DataTransshipment;
