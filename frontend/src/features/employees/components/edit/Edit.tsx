import { Dispatch, FC, SetStateAction } from 'react';

import { GridRowModesModel, GridRowModes } from '@mui/x-data-grid';

import { SelectedRowParams } from 'features/employees/types';
import Button from 'components/button/Button';

type Props = {
  action: 'view' | 'add' | 'edit';
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
  selectedRowParams: SelectedRowParams;
  setAction: Dispatch<SetStateAction<'view' | 'add' | 'edit'>>;
};

const Edit: FC<Props> = ({
  action,
  setRowModesModel,
  selectedRowParams,
  setAction,
}) => {
  const handleEditClick = () => {
    if (!selectedRowParams) {
      return;
    }
    const { id } = selectedRowParams;
    if (action === 'edit') {
      setAction('view');

      setRowModesModel(oldModel => ({
        ...oldModel,
        [id]: {
          mode: GridRowModes.View,
          fieldToFocus: 'user_id',
        },
      }));
    } else {
      setAction('edit');

      setRowModesModel(oldModel => ({
        ...oldModel,
        [id]: {
          mode: GridRowModes.Edit,
          fieldToFocus: selectedRowParams?.field,
        },
      }));
    }
  };

  return (
    <div className='flex mr-4 after:h-4 after:w-[2px] after:bg-secondary-100 after:my-2 after:ml-4'>
      <Button
        onClick={handleEditClick}
        disabled={!selectedRowParams?.id || action !== 'view'}>
        <span className='material-icons-outlined'>edit</span>
      </Button>
    </div>
  );
};

export default Edit;
