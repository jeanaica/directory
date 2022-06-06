import { FC, useEffect, useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import Employee, { FormValues } from 'features/employees/types';
import Button from 'components/button/Button';
import { FormProvider, useForm } from 'react-hook-form';
import Input from 'components/form/input/Input';
import Dropdown from 'components/form/select/Select';

type Props = {
  values: FormValues;
  onSubmit(form: FormValues): void;
  onCancel(): void;
  rows?: Array<Employee>;
  rowId?: string;
};

const schema = z.object({
  id: z.number().min(1, { message: 'Required' }),
  first_name: z.string().min(1, { message: 'Required' }),
  last_name: z.string().min(1, { message: 'Required' }),
  status: z.string().min(1, { message: 'Required' }),
  user_id: z.string().min(1, { message: 'Required' }),
  email: z.string().email().min(1, { message: 'Required' }),
  date_created: z.string().min(1, { message: 'Required' }),
});

const Form: FC<Props> = ({ onSubmit, onCancel, values, rows, rowId }) => {
  const options = [
    { label: 'Registered', value: 'REGISTERED' },
    { label: 'Initiated', value: 'INITIATED' },
  ];

  // const editedRow = useMemo(() => {

  // }, rows)

  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    reset({
      ...values,
      date_created: values.date_created
        ? new Date(values.date_created).toString()
        : new Date().toString(),
    });
  }, []);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-full sm:max-w-md rounded overflow-hidden sm:shadow-lg shadow-accent-500 p-4 flex flex-col lg:max-w-5xl lg:p-4'>
        <div className='flex gap-4'>
          <Input
            label='User ID'
            name='user_id'
          />

          <Input
            label='Created On'
            name='date_created'
            readOnly
          />
        </div>
        <div className='flex gap-4'>
          <Input
            label='First Name'
            name='first_name'
          />
          <Input
            label='Last Name'
            name='last_name'
          />
        </div>
        <Dropdown
          label='Status'
          name='status'
          options={options}
        />

        <Input
          label='Email'
          name='email'
        />

        <Button
          type='submit'
          large
          className='mt-4'>
          Submit
        </Button>
        <Button
          type='button'
          onClick={onCancel}
          large
          className='mt-4'>
          Cancel
        </Button>
      </form>
    </FormProvider>
  );
};

export default Form;
