import Button from 'components/button/Button';
import { FC } from 'react';
import { useMatch, useNavigate } from 'react-router-dom';

const Header: FC = () => {
  const navigate = useNavigate();
  const match = useMatch('/');

  return (
    <div className='flex bg-accent drop-shadow-md p-4 text-right md:text-center'>
      {!match?.pathname && (
        <Button
          icon
          onClick={() => navigate(-1)}
          className='mr-4'>
          <span className='material-icons-outlined'>arrow_back</span>
        </Button>
      )}
      <h1 className='mb-0 flex-[4]'>Employee Directory</h1>
    </div>
  );
};

export default Header;
