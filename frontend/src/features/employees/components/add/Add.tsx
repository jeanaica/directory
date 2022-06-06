import { Dispatch, FC, SetStateAction, useState } from 'react';

import Employee, { FormValues } from 'features/employees/types';
import Button from 'components/button/Button';
import Portal from 'components/portal/Portal';
import Form from './Form';

type Props = {
  rows: Array<Employee>;
  setRows: Dispatch<SetStateAction<Array<Employee>>>;
};

const Add: FC<Props> = ({ rows, setRows }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddSubmit = ({
    first_name,
    last_name,
    user_id,
    email,
    status,
    date_created,
  }: FormValues) => {
    const idNum = rows.length + 1;

    setRows([
      ...rows,
      {
        id: idNum,
        user_id,
        first_name,
        last_name,
        email,
        status,
        date_created: date_created
          ? new Date(date_created).valueOf()
          : new Date().valueOf(),
        isNew: true,
      },
    ]);

    handleClose();
  };

  return (
    <div className='flex mr-4 after:h-4 after:w-[2px] after:bg-secondary-100 after:my-2'>
      <Button
        onClick={handleOpen}
        className='mr-4'>
        <span className='material-icons-outlined'>add</span>
      </Button>
      <Portal open={open}>
        <Form
          onSubmit={handleAddSubmit}
          onCancel={handleClose}
        />
      </Portal>
    </div>
  );
};

export default Add;
