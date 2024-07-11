import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import NotFoundPage from './components/NotFoundPage';
import SpecieCard from './components/SpecieCard';

const router = createBrowserRouter([
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
    <RouterProvider router={router} />
  </React.StrictMode>,
);
