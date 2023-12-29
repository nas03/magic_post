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
import {
	updateSenderBranch,
	updateSenderLocation,
	updateSenderPhone,
	updateReceiverBranch,
	updateReceiverLocation,
	updateReceiverPhone,
	updateCustomInstruction,
} from '../../../../../context/actions/updateDataBranch';

const initialRows = [
	{
		id: 0,
		col1: 0,
		col2: '',
		col3: '',
		col4: '',
		col5: 'Package',
		col6: '',
		col7: '',
		col8: '',
		col9: '',
		col10: false,
	},
];

type Row = {
	id: number;
	col1: number;
	col2: string;
	col3: string;
	col4: string;
	col5: string;
	col6: string;
	col7: string;
	col8: string;
	col9: string;
	col10: boolean;
};
const fetchPackage = async (location_id: number) => {
	const url = new URL(
		addSearchParams(new URL('http://localhost:3000/api/employee/package'), {
			location_id: location_id,
			task: 'ship',
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

const DataShipment = ({ tableType }) => {
	const [rows, setRows] = useState<Row[]>(initialRows);
	const dispatch = useDispatch();
	const { data: session, status } = useSession();
	const [staffLocation, setStaffLocation] = useState(
		session?.user?.location_id || 0
	);

	// Update managerRole when the session changes
	useEffect(() => {
		const fetchLocationId = async () => {
			if (status === 'authenticated') {
				const location_id = session?.user?.location_id;
				if (location_id && location_id !== 0) {
					setStaffLocation(location_id);
				} else {
					// If location_id is 0 or undefined, fetch it again after a delay
					setTimeout(fetchLocationId, 500); // Replace FETCH_DELAY with the delay in milliseconds
				}
			}
		};

		fetchLocationId();
	}, [session, status]);

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
					row.id === id ? { ...row, col10: !row.col10 } : row
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
			{ field: 'col1', headerName: 'ID', width: 50 },
			{ field: 'col2', headerName: 'State', width: 100 },
			{ field: 'col3', headerName: 'PackageType', width: 100 },
			{ field: 'col4', headerName: 'Sender', width: 100 },
			{ field: 'col5', headerName: 'Receiver', width: 100 },
			{ field: 'col6', headerName: 'Sender Location', width: 200 },
			{ field: 'col7', headerName: 'Receiver Location', width: 200 },
			{ field: 'col8', headerName: 'Sender Phone', width: 150 },
			{ field: 'col9', headerName: 'Receiver Phone', width: 150 },
			{ field: 'col10', headerName: 'Verify', type: 'boolean', width: 100 },
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
			console.log('data');
			const tablePackageRow = data.map((pack: Package, index) => ({
				id: index + 1,
				col1: pack.id,
				col2: pack.state,
				col3: pack.type,
				col4: pack.sender,
				col5: pack.receiver,
				col6: pack.sender_location,
				col7: pack.receiver_location,
				col8: pack.sender_phone,
				col9: pack.receiver_phone,
			}));
			setRows(tablePackageRow);
		}
	};

	useEffect(() => {
		fetchData();
		const intervalId = setInterval(() => {
			fetchData();
		}, 10 * 1000);

		return () => clearInterval(intervalId);
	}, [staffLocation, tableType]);

	const getSelectedRowData = (e: any) => {
		dispatch(updateOrderType(e.col3));
		dispatch(updateSenderBranch(e.col4));
		dispatch(updateReceiverBranch(e.col5));
		dispatch(updateSenderLocation(e.col6));
		dispatch(updateReceiverLocation(e.col7));
		dispatch(updateSenderPhone(e.col8));
		dispatch(updateReceiverPhone(e.col9));
	};

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
				onRowClick={(e) => getSelectedRowData(e.row)}
				disableRowSelectionOnClick
			/>
		</div>
	);
};

export default DataShipment;
