import { GridRenderEditCellParams } from '@mui/x-data-grid';

const CustomEditComponent = (props: GridRenderEditCellParams) => {
  return (
    <input
      type='text'
      className='border-secondary-300 border rounded-md shadow-sm w-full px-4 py-2'
    />
  );
};

export default CustomEditComponent;
