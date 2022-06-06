import Button from 'components/button/Button';

import {
  GridToolbarContainer,
  GridRowModesModel,
  GridRowModes,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid';
import { Dispatch, FC, SetStateAction } from 'react';
import Employee, { SelectedRowParams } from '../../types';
import Edit from '../edit/Edit';
import Add from '../add/Add';
import Delete from '../delete/Delete';
import useToast from 'components/toast/hook';

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
  rowModesModel,
  selectionModel,
  selectedRowParams,
  setRows,
  setRowModesModel,
  setAction,
  setSelectedRowParams,
  setSelectionModel,
}) => {
  const toast = useToast(2000);

  const handleCancelClick = () => {
    setAction('view');
    const { id } = selectedRowParams;

    Object.keys(rowModesModel).forEach(rowMode => {
      setRowModesModel(oldModel => ({
        ...oldModel,
        [rowMode]: {
          mode: GridRowModes.View,
          ignoreModifications: true,
        },
      }));
    });

    const editedRow = rows.find(row => row.id === id);

    if (editedRow!.isNew) {
      setRows(rows.filter(row => row.id !== id));
    }
  };

  const handleSaveClick = () => {
    setAction('view');

    if (!selectedRowParams) {
      return;
    }

    Object.keys(rowModesModel).forEach(rowMode => {
      setRowModesModel(oldModel => ({
        ...oldModel,
        [rowMode]: {
          mode: GridRowModes.View,
        },
      }));
    });
    toast('success', 'You have successfully saved the record');
  };

  return (
    <GridToolbarContainer className='flex flex-col gap-4 p-4 sm:flex-row sm:gap-0'>
      <div className='flex flex-1 w-full'>
        {action !== 'view' && (
          <Button
            onClick={handleCancelClick}
            className='mr-4 flex-1'>
            <span className='material-icons-outlined'>cancel</span>
            Cancel
          </Button>
        )}
        {action !== 'view' && (
          <Button
            onClick={handleSaveClick}
            className='mr-4 flex-1'>
            <span className='material-icons-outlined'>save</span>
            Save
          </Button>
        )}
      </div>

      <div className='flex flex-[3] sm:justify-center w-full'>
        <Add
          rows={rows}
          setRows={setRows}
          setRowModesModel={setRowModesModel}
          setAction={setAction}
          action={action}
        />

        <Edit
          setRowModesModel={setRowModesModel}
          selectedRowParams={selectedRowParams}
          setAction={setAction}
          action={action}
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
