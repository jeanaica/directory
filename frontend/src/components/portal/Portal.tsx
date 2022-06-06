import { Modal } from '@mui/material';
import { FC, ReactNode } from 'react';

type Props = {
  open: boolean;
  onClose?(): void;
  children: ReactNode;
};

const Portal: FC<Props> = ({ open, onClose, children }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}>
      <div className='absolute min-w-[80%] min-h-[200px] sm:min-w-[40%] sm:min-h-[200px] top-[5%] left-[10%] sm:top-[10%] sm:left-[33%] bg-accent-100'>
        {children}
      </div>
    </Modal>
  );
};

export default Portal;
