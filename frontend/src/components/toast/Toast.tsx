import classNames from 'classnames';
import { FC } from 'react';
import { useToastStateContext } from './context';
import { ToastActions, ToastProp } from './types';

const Toast: FC<ToastProp> = ({ type, message, id }) => {
  const { dispatch } = useToastStateContext();
  return (
    <>
      <div
        className={classNames('rounded-md  p-4 m-3', {
          'bg-accent': type === 'success',
          'bg-error-500': type === 'error',
        })}>
        <div className='flex'>
          <div className='flex-shrink-0 flex items-center'>
            <span
              className={classNames('material-icons ', {
                'text-primary-400': type === 'success',
                'text-primary-200': type === 'error',
              })}>
              {type === 'success' && 'check_circle'}
              {type === 'error' && 'error_outline'}
            </span>
          </div>
          <div className='ml-3 flex items-center'>
            <p
              className={classNames('text-sm font-medium', {
                'text-primary': type === 'success',
                'text-primary-100': type === 'error',
              })}>
              {message}
            </p>
          </div>
          <div className='ml-auto pl-3'>
            <div className='-mx-1.5 -my-1.5'>
              <button
                onClick={() => {
                  dispatch({ type: ToastActions.DELETE_TOAST, id });
                }}
                className={classNames('inline-flex  rounded-md p-1.5 ', {
                  'bg-accent text-primary-100 hover:bg-accent-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-accent-400 focus:ring-accent-500':
                    type === 'success',
                  'bg-error-500 text-secondary-100 hover:bg-error-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-error-400 focus:ring-error-500':
                    type === 'error',
                })}>
                <span className='sr-only'>Dismiss</span>
                <span
                  className={classNames('material-icons ', {
                    'text-primary-400': type === 'success',
                    'text-primary-300': type === 'error',
                  })}>
                  close
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Toast;
