import { FC } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import Select from 'react-select';

type Props = {
  label: string;
  helperText?: string;
  name: string;
  disabled?: boolean;
  isLoading?: boolean;
  options?: Array<{ value: string; label: string }>;
};

const Dropdown: FC<Props> = ({
  label,
  helperText = '',
  name,
  disabled,
  isLoading,
  options = [],
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className='w-full mb-4'>
      <label
        htmlFor={name}
        className='block text-sm font-semibold text-primary'>
        {label}
      </label>
      <div className='relative mt-1 w-full'>
        <Controller
          control={control}
          defaultValue={options[0].value}
          name={name}
          render={({ field: { onChange, value, ref } }) => (
            <Select
              ref={ref}
              value={options.filter(c => value.includes(c.value))}
              isDisabled={disabled}
              isLoading={isLoading}
              onChange={val => onChange(val?.value)}
              options={options}
            />
          )}
        />
        {errors[name] && (
          <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
            <span className='material-icons-outlined text-xl text-error-500'>
              error_outline
            </span>
          </div>
        )}
      </div>
      <div className='mt-1'>
        {helperText !== '' && (
          <p className='text-xs text-secondary-500'>{helperText}</p>
        )}
        {errors[name] && (
          <span className='text-sm text-error-500'>{errors[name].message}</span>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
