import { GridRowId } from '@mui/x-data-grid';

export interface SelectedRowParams {
  id: GridRowId;
  field: string;
}

type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  user_id: string;
  email: string;
  status: string;
  date_created: number;
  isNew?: boolean;
};

export interface FormValues {
  id: number;
  first_name: string;
  last_name: string;
  user_id: string;
  email: string;
  status: string;
  date_created?: string | number;
}

export default Employee;
