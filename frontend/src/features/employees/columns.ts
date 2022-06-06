import { GridColDef, GridValueFormatterParams } from '@mui/x-data-grid';

const gridColumns: GridColDef[] = [
  {
    field: 'user_id',
    headerName: 'User ID',
    minWidth: 200,
    flex: 2,
    editable: true,
  },
  {
    field: 'first_name',
    headerName: 'First Name',
    minWidth: 150,
    flex: 1,
    editable: true,
  },
  {
    field: 'last_name',
    headerName: 'Last Name',
    minWidth: 150,
    flex: 1,
    editable: true,
  },
  {
    field: 'email',
    headerName: 'Email',
    minWidth: 250,
    flex: 3,
    editable: true,
  },
  {
    field: 'status',
    headerName: 'Status',
    type: 'singleSelect',
    valueOptions: ['REGISTERED', 'INITIATED'],
    minWidth: 150,
    flex: 2,
    editable: true,
  },
  {
    field: 'date_created',
    headerName: 'Created On',
    type: 'dateTime',
    minWidth: 500,
    flex: 5,
    editable: false,
    valueFormatter: (params: GridValueFormatterParams) => {
      if (params.value) {
        return new Date(params.value).toString();
      }
    },
  },
];

export default gridColumns;
