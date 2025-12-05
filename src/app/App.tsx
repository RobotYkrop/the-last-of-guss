import React from 'react';
import { QueryProvider } from './providers/QueryProvider';
import { RouterProvider } from './providers/RouterProvider';

export const App: React.FC = () => {
  return (
    <QueryProvider>
      <RouterProvider />
    </QueryProvider>
  );
};