import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import {
  DataGrid,
  GridRowModel,
  GridColDef,
  GridEventListener,
  GridRowModesModel,
  GridRowParams,
  GridSelectionModel,
  MuiEvent,
} from '@mui/x-data-grid';
import data from './db';
import Employee, { SelectedRowParams } from './types';
import gridColumns from './columns';
import EditToolbar from './components/toolbar/Toolbar';

const Employees: FC = () => {
  const [rows, setRows] = useState<Array<Employee>>(data.employees);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [action, setAction] = useState<'view' | 'add' | 'edit'>('view');
  const gridRef = useRef<HTMLDivElement>(null);

  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);

  const [selectedRowParams, setSelectedRowParams] =
    useState<SelectedRowParams | null>(null);

  const handleRowEditStart = (
    _: GridRowParams,
    event: MuiEvent<React.SyntheticEvent>
  ) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (_, event) => {
    if (action !== 'view') {
      event.defaultMuiPrevented = true;
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map(row => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const columns: GridColDef[] = useMemo(() => gridColumns, []);

  const handleCellFocus = useCallback(
    (event: React.FocusEvent<HTMLDivElement>) => {
      const row = event.currentTarget.parentElement;
      const id = row!.dataset.id!;
      const field = event.currentTarget.dataset.field!;

      setSelectedRowParams({ id: Number(id), field });
    },
    []
  );

  useEffect(() => setSelectionModel([]), [action]);

  return (
    <div className='flex flex-col justify-center items-center h-full'>
      <div className='h-full w-[80%] overflow-x-scroll'>
        <div className='h-[90%]'>
          <DataGrid
            getRowClassName={params =>
              params.row.id === selectedRowParams?.id ? 'bg-secondary-100' : ''
            }
            rows={rows}
            columns={columns}
            ref={gridRef}
            checkboxSelection
            onSelectionModelChange={newSelectionModel =>
              setSelectionModel(newSelectionModel)
            }
            selectionModel={selectionModel}
            isRowSelectable={() => action === 'view'}
            initialState={{
              sorting: {
                sortModel: [{ field: 'date_created', sort: 'desc' }],
              },
            }}
            onCellFocusOut={params => {
              if (!params.id) {
                setSelectedRowParams(null);
              }
            }}
            disableExtendRowFullWidth
            disableSelectionOnClick
            editMode='row'
            rowModesModel={rowModesModel}
            hideFooter
            onRowEditStart={handleRowEditStart}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            components={{
              Toolbar: EditToolbar,
            }}
            componentsProps={{
              toolbar: {
                selectedRowParams,
                action,
                rows,
                rowModesModel,
                selectionModel,
                setRows,
                setRowModesModel,
                setSelectedRowParams,
                setSelectionModel,
                setAction,
              },
              cell: {
                onFocus: handleCellFocus,
              },
            }}
            experimentalFeatures={{ newEditingApi: true }}
          />
        </div>
      </div>
    </div>
  );
};

export default Employees;
