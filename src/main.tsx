import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';
import NotFoundPage from './components/NotFoundPage';
import SpecieCard from './components/SpecieCard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/specie" replace />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/specie',
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '/specie/:id',
        element: <SpecieCard />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
