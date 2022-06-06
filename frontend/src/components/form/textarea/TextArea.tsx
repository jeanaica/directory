import { useFormContext } from 'react-hook-form';
import classNames from 'classnames';
import { FC } from 'react';

type Props = {
  label: string;
  placeholder?: string;
  helperText?: string;
  name: string;
  readOnly?: boolean;
  className?: string;
};

const TextArea: FC<Props> = ({
  label,
  placeholder = '',
  helperText = '',
  name,
  readOnly = false,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <label
        htmlFor={name}
        className='block text-sm font-normal text-primary'>
        {label}
      </label>
      <div className='relative mt-1'>
        <textarea
          {...register(name)}
          rows={3}
          name={name}
          id={name}
          readOnly={readOnly}
          className={classNames(
            'border-secondary-300 border w-full rounded-md shadow-sm px-4 py-2',
            {
              'bg-secondary-100 focus:ring-0 cursor-not-allowed border-secondary-300 focus:border-secondary-300':
                readOnly,
              'focus:ring-error-500 border-error-500 focus:border-error-500':
                !readOnly && errors[name],
              'focus:ring-primary-500 border-secondary-300 focus:border-primary-500':
                !readOnly && !errors[name],
            }
          )}
          placeholder={placeholder}
          aria-describedby={name}
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

export default TextArea;
