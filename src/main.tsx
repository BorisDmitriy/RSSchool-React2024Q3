import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './components/store/store';
import App from './App';
import NotFoundPage from './components/NotFoundPage';
import ControledFormPage from './components/ControledFormPage';
import UncontroledFormPage from './components/UncontroledFormPage';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/controled',
    element: <ControledFormPage />,
  },
  {
    path: '/uncontroled',
    element: <UncontroledFormPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
