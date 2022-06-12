import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ErrorPage from './components/ErrorPage';
import Info from './components/Info';
import Aside from './components/Aside';
import { Center, CircularProgress } from '@chakra-ui/react';
const LazyHome = React.lazy(() => import('./components/Home'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Aside />}>
        <Route
          index
          element={
            <React.Suspense
              fallback={
                <Center h="80vh">
                  <CircularProgress isIndeterminate />
                </Center>
              }
            >
              <LazyHome />
            </React.Suspense>
          }
        />
        <Route path=":countryName" element={<Info />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
