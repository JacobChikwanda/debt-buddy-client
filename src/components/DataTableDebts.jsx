import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid';
import { Button, Chip } from '@mui/material';


const renderStatus = (status) => {
  if (status === 'Not Paid') {
    return <Chip label='Not Paid' color='error' />
  } else if (status === 'Paid') {
    return <Chip label='Paid' color='success' />
  } else {
    return <Chip label='Pending' color='warning' />
  }
}

const rows = [
  { id: 1, returnDate: '24/12/2022', lastName: 'Snow', firstName: 'Jon', debtAmount: 1000, status: 'Paid' },
  { id: 2, returnDate: '24/12/2022', lastName: 'Lannister', firstName: 'Cersei', debtAmount: 4000, status: 'Not Paid' },
  { id: 3, returnDate: '24/12/2022', lastName: 'Lannister', firstName: 'Jaime',debtAmount: 3000, status: 'Not Paid' },
  { id: 4, returnDate: '24/12/2022', lastName: 'Stark', firstName: 'Arya', debtAmount: 900, status: 'Not Paid' },
  { id: 5, returnDate: '24/12/2022', lastName: 'Targaryen', firstName: 'Daenerys', debtAmount: 10000, status: 'Not Paid' },
  { id: 6, returnDate: '24/12/2022', lastName: 'Melisandre', firstName: 'Fredrick', debtAmount: 8000, status: 'Not Paid' },
];

export default function DebtDataTable({data=rows, handleUpdate }) {

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'firstName',
      headerName: 'First name',
      width: 150,
      renderCell: (params) => {
        return (
          <>{params.row.customer.firstName}</>
        )
      }
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      width: 150,
      renderCell: (params) => {
        return (
          <>{params.row.customer.lastName}</>
        )
      }
    },
    {
      field: 'amount',
      headerName: 'Debt Amount',
      width: 150,
    },
    {
      field: 'returnDate',
      headerName: 'Return Date',
      width: 150,
    },
    {
      field: 'status',
      headerName: 'Status',
      sortable: true,
      renderCell: (params) => {
        return (
          renderStatus(params.row.status)
        )
      },
      width: 160,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => (
        <Button onClick={() => handleUpdate({id: params.row.id})} variant='contained' color='info'>Mark As Paid</Button>
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
