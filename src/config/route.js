import { Navigate, useRoutes } from 'react-router-dom';
import DefaultLayout from "../layout/defaultLayout";

import Home from '../pages/home';
import Result from '../pages/result';

export default function Router() {
  return useRoutes([
    { 
      path: '/',
      children: [
        { path: '/', element: <Home /> }, 
        { path: '/result', element: <Result /> }, 
      ]
    },
  ])
}