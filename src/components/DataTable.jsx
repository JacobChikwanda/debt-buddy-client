import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid';
import { Button } from '@mui/material';



const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', email: 'jon@hotmail.com', address: '2435 Chifubu' },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', email: 'jon@hotmail.com', address: '2435 Chifubu' },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime',email: 'jon@hotmail.com', address: '2435 Chifubu' },
  { id: 4, lastName: 'Stark', firstName: 'Arya', email: 'jon@hotmail.com', address: '2435 Chifubu' },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', email: 'jon@hotmail.com', address: '2435 Chifubu' },
  { id: 6, lastName: 'Melisandre', firstName: 'Fredrick', email: 'jon@hotmail.com', address: '2435 Chifubu' },
];

export default function DataTable({data, handleDelete}) {

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'firstName',
      headerName: 'First name',
      width: 150,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      width: 150,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 150,
    },
    {
      field: 'address',
      headerName: 'Home Address',
      sortable: true,
      width: 160,
    },
    {
      field: 'action',
      headerName: 'Action',
      renderCell: (params) => (
        <Button onClick={() => handleDelete({id: params.row.id})} variant='contained' color='error'>Delete</Button>
      ),
    }
  ];

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
}
