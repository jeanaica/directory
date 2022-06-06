import { Dispatch, FC, SetStateAction } from 'react';

import { GridRowModesModel, GridRowModes } from '@mui/x-data-grid';

import Employee from 'features/employees/types';
import Button from 'components/button/Button';

type Props = {
  rows: Array<Employee>;
  action: 'view' | 'add' | 'edit';
  setRows: Dispatch<SetStateAction<Array<Employee>>>;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
  setAction: Dispatch<SetStateAction<'view' | 'add' | 'edit'>>;
};

const Add: FC<Props> = ({
  rows,
  action,
  setRows,
  setRowModesModel,
  setAction,
}) => {
  const handleAddClick = () => {
    const idNum = rows.length + 1;
    setAction('add');

    if (action === 'add') {
      setAction('view');
    } else {
      setRows([
        ...rows,
        {
          id: idNum,
          user_id: '',
          first_name: '',
          last_name: '',
          email: '',
          status: 'INITIATED',
          date_created: new Date().valueOf(),
          isNew: true,
        },
      ]);

      setRowModesModel(oldModel => ({
        ...oldModel,
        [idNum]: { mode: GridRowModes.Edit, fieldToFocus: 'user_id' },
      }));
    }
  };

  return (
    <div className='flex mr-4 after:h-4 after:w-[2px] after:bg-secondary-100 after:my-2'>
      <Button
        onClick={handleAddClick}
        disabled={action !== 'view'}
        className='mr-4'>
        <span className='material-icons-outlined'>add</span>
      </Button>
    </div>
  );
};

export default Add;
