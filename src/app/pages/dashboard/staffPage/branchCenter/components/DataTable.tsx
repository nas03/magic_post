import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import SecurityIcon from '@mui/icons-material/Security';
import { useSession } from 'next-auth/react';
import { useDispatch } from 'react-redux';
import { updateOrderType } from '../../../../../context/actions/updateDataBranch';
import { addSearchParams } from '@/src/util';
import { Package, TransshipmentLog } from '@/src/util';


const initialRows = [
	{
		id: 0,
		col1: 0,
		col2: '',
		col3: '',
		col4: '',
		col5: 'Package',
		col6: false,
	},
];

type Row = {
	id: number;
	col1: number;
	col2: string;
	col3: string;
	col4: string;
	col5: string;
	col6: boolean;
};
const fetchPackage = async (location_id: number) => {
	const url = new URL(
		addSearchParams(new URL('http://localhost:3000/api/employee/package'), {
			location_id: location_id,
			role: 'BRANCH_OFFICER',
		})
	);
	const response = await fetch(url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
		next: {
			revalidate: 3600,
		},
		cache: 'reload',
	});
	const { data } = await response.json();
	console.log('data', data);
	return data;
};

const DataTable= () => {
	const [rows, setRows] = useState<Row[]>(initialRows);
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

	const verify = useCallback(
		(id: number) => () => {
			setRows((prevRows) =>
				prevRows.map((row) =>
					row.id === id ? { ...row, col6: !row.col6 } : row
				)
			);
		},
		[]
	);

	const duplicatePackage = useCallback(
		(id: number) => () => {
			setRows((prevRows) => {
				const rowToDuplicate = prevRows.find((row) => row.id === id)!;
				return [...prevRows, { ...rowToDuplicate, id: Date.now() }];
			});
		},
		[]
	);

	const columns = useMemo(
		() => [
			{ field: 'col1', headerName: 'ID', width: 100 },
			{ field: 'col2', headerName: 'State', width: 100 },
			{ field: 'col3', headerName: 'PackageType', width: 150 },
			{ field: 'col4', headerName: 'Sender', width: 150 },
			{ field: 'col5', headerName: 'Receiver', width: 150 },
			{ field: 'col6', headerName: 'Verify', type: 'boolean', width: 100 },
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
						onClick={verify(params.id)}
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
		[deletePackage, verify, duplicatePackage]
	);

	const fetchData = async () => {
		if (staffLocation !== undefined) {
			const data = await fetchPackage(staffLocation);
			const tablePackageRow = data.map((pack: Package, index) => ({
				id: index + 1,
				col1: pack.id,
				col2: pack.state,
				col3: pack.type,
				col4: pack.sender,
				col5: pack.receiver,
			}));
			setRows(tablePackageRow);
		}
	};

	useEffect(() => {
		fetchData();
		const intervalId = setInterval(() => {
			fetchData();
		}, 3600 * 1000);

		return () => clearInterval(intervalId);
	}, [staffLocation]);

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
				onRowClick={(e) => dispatch(updateOrderType(e.row.col3))}
				disableRowSelectionOnClick
			/>
		</div>
	);
};

export default DataTable;
