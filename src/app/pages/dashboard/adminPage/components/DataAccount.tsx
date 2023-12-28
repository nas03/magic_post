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
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import {updateNameAdmin, updateIDAdmin, updateLocationAdmin, updateRoleAdmin} from '../../../../context/actions/updateDataAdmin'
import { useSelector, useDispatch } from 'react-redux'
import { XCircleIcon } from '@heroicons/react/24/solid';

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



export default function DataAccount({tableType}) {
	const [row, setRow] = useState<Row[]>(rows);
	const { data: session } = useSession();
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)
    const [ID, setID] = useState('')
    const [name, setName] = useState('')
    const [location, setLocation] = useState('')
    const [role, setRole] = useState('')
    const dataAdmin = useSelector((state:any) => state.dataAdmin)

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

    const modifyInfo = () => {
        setShowModal(false)
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

      const modifyUser = (item:any) => {
        dispatch(updateIDAdmin(item.col1))
        dispatch(updateNameAdmin(item.col2))
        dispatch(updateLocationAdmin(item.col3))
        dispatch(updateRoleAdmin(item.col4))
        setShowModal(true)
      }

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
                icon={<DisplaySettingsIcon/>}
                label="Modify"
                onClick={()=> modifyUser(params.row)}
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
        <>
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
            {showModal ? (
                    <>
                        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                            <div className=' w-[40vw] py-5 bg-white rounded-md flex flex-col justify-center items-center relative'>
                                    <XCircleIcon onClick={() => setShowModal(false)} color='red' className=' z-50 w-5 h-5 absolute right-[5%] top-[5%] object-contain  cursor-pointer'/>
                                    <div className="flex items-center py-5 text-2xl font-semibold text-gray-900 dark:text-white ">
                                        <img className="w-8 h-8 mr-2 rounded-full" src="/image/magic-post-logo.png" alt="logo"/>
                                        Magic Post    
                                    </div>
                                    <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                                Modify Information
                                            </h1>
                                            <form className="space-y-4 md:space-y-6" action="#">
													<div>
														<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
															ID
														</label>
														<input
															type="text"
															name="id"
															id="id"
															onChange={(e) => setID(e.target.value)}
															className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
															placeholder={dataAdmin.IDAm}
															required
														/>
													</div>
													<div>
														<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
															Name
														</label>
														<input
															type="text"
															name="name"
															id="name"
															placeholder={dataAdmin.nameAm}
															onChange={(e) => setName(e.target.value)}
															className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
															required
														/>
													</div>
													<div>
														<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
															Location
														</label>
														<input
															type="text"
															name="location"
															id="location"
															placeholder={dataAdmin.locationAm}
															onChange={(e) => setLocation(e.target.value)}
															className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
															required
														/>
													</div>
													<div>
														<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
															Role
														</label>
														<input
															type="text"
															name="type"
															id="type"
															placeholder={dataAdmin.roleAm}
															onChange={(e) => setRole(e.target.value)}
															className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
															required
														/>
													</div>
                                                <button type="submit" onClick={() => modifyInfo()} className="w-full hover:bg-transparent hover:text-[#F79132] hover:border-1 hover:border-[#F79132] bg-[#F79132] text-white  hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Confirm Changes</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                        </>
                    ) : null
		    }
        </>
        
	);
}
