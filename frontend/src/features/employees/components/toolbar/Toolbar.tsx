import {
  GridToolbarContainer,
  GridRowModesModel,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid';
import { Dispatch, FC, SetStateAction } from 'react';
import Employee, { SelectedRowParams } from '../../types';
import Edit from '../edit/Edit';
import Add from '../add/Add';
import Delete from '../delete/Delete';

interface EditToolbarProps {
  rows: Array<Employee>;
  action: 'view' | 'add' | 'edit';
  rowModesModel: GridRowModesModel;
  selectionModel: Array<number>;
  selectedRowParams: SelectedRowParams;
  setSelectionModel: Dispatch<SetStateAction<Array<string>>>;
  setSelectedRowParams: Dispatch<SetStateAction<SelectedRowParams | null>>;
  setRows: Dispatch<SetStateAction<Array<Employee>>>;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
  setAction: Dispatch<SetStateAction<'view' | 'add' | 'edit'>>;
}

const EditToolbar: FC<EditToolbarProps> = ({
  action,
  rows,
  selectionModel,
  selectedRowParams,
  setRows,
  setSelectedRowParams,
  setSelectionModel,
}) => {
  return (
    <GridToolbarContainer className='flex flex-col gap-4 p-4 sm:flex-row sm:gap-0'>
      <div className='flex flex-[3] justify-center sm:justify-end w-full'>
        <Add
          rows={rows}
          setRows={setRows}
        />

        <Edit
          rows={rows}
          setRows={setRows}
          selectedRowParams={selectedRowParams}
          setSelectedRowParams={setSelectedRowParams}
          setSelectionModel={setSelectionModel}
        />

        <Delete
          rows={rows}
          setRows={setRows}
          selectionModel={selectionModel}
          setSelectedRowParams={setSelectedRowParams}
        />
      </div>

      <div className='flex-1 w-full'>
        <GridToolbarQuickFilter
          onInput={() => setSelectionModel([])}
          disabled={action !== 'view'}
          className='w-full'
        />
      </div>
    </GridToolbarContainer>
  );
};

export default EditToolbar;
