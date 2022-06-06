import { ToastProvider } from 'components/toast/context';
import ToastContainer from 'components/toast/ToastContainer';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Employees from './features/employees/Employees';

const App = () => {
  return (
    <ToastProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path='/'
            element={<Employees />}
          />
        </Route>
      </Routes>
      <ToastContainer />
    </ToastProvider>
  );
};

export default App;
