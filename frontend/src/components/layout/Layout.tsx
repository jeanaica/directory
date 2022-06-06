import Footer from 'components/footer/Footer';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../header/Header';

const Layout: FC = () => (
  <div className='h-screen w-screen grid grid-rows-[auto_minmax(auto,_1fr)_auto] grid-cols-1 overflow-hidden prose min-w-[320px]'>
    <Header />
    <div className='overflow-y-auto'>
      <Outlet />
    </div>
    <Footer />
  </div>
);

export default Layout;
