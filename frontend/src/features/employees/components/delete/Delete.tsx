import { Dispatch, FC, SetStateAction } from 'react';

import Employee, { SelectedRowParams } from 'features/employees/types';
import Button from 'components/button/Button';
import useToast from 'components/toast/hook';

type Props = {
  rows: Array<Employee>;
  selectionModel: Array<number>;
  setRows: Dispatch<SetStateAction<Array<Employee>>>;
  setSelectedRowParams: Dispatch<SetStateAction<SelectedRowParams | null>>;
};

const Delete: FC<Props> = ({
  rows,
  selectionModel,
  setRows,
  setSelectedRowParams,
}) => {
  const toast = useToast(2000);

  const handleDeleteClick = () => {
    toast('success', 'You have successfully deleted the record');

    setSelectedRowParams(null);
    const indexSet = new Set(selectionModel);
    setRows(rows.filter(row => !indexSet.has(row.id)));
  };

  return (
    <div className='flex mr-4 '>
      <Button
        onClick={handleDeleteClick}
        disabled={!selectionModel.length}>
        <span className='material-icons-outlined'>delete</span>
      </Button>
    </div>
  );
};

export default Delete;
