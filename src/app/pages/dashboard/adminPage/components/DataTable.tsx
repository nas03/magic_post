import * as React from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import api from '@/src/lib/axios';
import { useSession } from 'next-auth/react';
import { post_type, } from '@prisma/client';
export const revalidate = 30;

interface Post {
  post_id: number;
  location: string;
  type: post_type;
}

const fetchData = async (post_id: number, role: string) => {
  try {
    //TODO: fix this
    const response =
      role === 'Admin'
        ? await api.get('/api/admin/post')
        : await api.get('/api/manager/post', {
            params: {
              'post-id': post_id,
            },
          });

    const data = response.data.data;
    const rows: GridRowsProp = data.map((d: Post, index: number) => ({
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
  const { data: session } = useSession();

  useEffect(() => {
    const fetchDataAndSetRows = async () => {
      if (session) {
        const data = await fetchData(session.user.post_id, session.user.role);
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
