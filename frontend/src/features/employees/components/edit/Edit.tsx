import { Dispatch, FC, SetStateAction, useState } from 'react';

import Employee, {
  FormValues,
  SelectedRowParams,
} from 'features/employees/types';
import Button from 'components/button/Button';
import Portal from 'components/portal/Portal';
import Form from './Form';

type Props = {
  selectedRowParams: SelectedRowParams;
  rows: Array<Employee>;
  setRows: Dispatch<SetStateAction<Array<Employee>>>;
  setSelectionModel: Dispatch<SetStateAction<Array<string>>>;
  setSelectedRowParams: Dispatch<SetStateAction<SelectedRowParams | null>>;
};

const Edit: FC<Props> = ({
  rows,
  selectedRowParams,
  setRows,
  setSelectionModel,
  setSelectedRowParams,
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const editedRow = rows?.find(row => row.id === selectedRowParams?.id);

  const handleEditSubmit = (data: FormValues) => {
    const { id, first_name, last_name, user_id, email, status, date_created } =
      data;

    const objIndex = rows.findIndex(row => row.id === id);

    const newRowState = rows.slice();

    newRowState[objIndex] = {
      id,
      first_name,
      last_name,
      user_id,
      email,
      status,
      date_created: date_created
        ? new Date(date_created).valueOf()
        : new Date().valueOf(),
    };

    setRows(newRowState);

    setSelectedRowParams(null);
    setSelectionModel([]);

    handleClose();
  };

  const handleEditClick = () => {
    const activeIndex = selectedRowParams?.id;
    setSelectionModel([activeIndex.toString()]);

    handleOpen();
  };

  return (
    <div className='flex mr-4 after:h-4 after:w-[2px] after:bg-secondary-100 after:my-2 after:ml-4'>
      <Button
        onClick={handleEditClick}
        disabled={!selectedRowParams?.id}>
        <span className='material-icons-outlined'>edit</span>
      </Button>
      <Portal open={open}>
        <Form
          values={
            editedRow ?? {
              ...(editedRow as unknown as Employee),
              date_created:
                editedRow && new Date(editedRow['date_created']).valueOf(),
            }
          }
          onSubmit={handleEditSubmit}
          onCancel={handleClose}
        />
      </Portal>
    </div>
  );
};

export default Edit;
