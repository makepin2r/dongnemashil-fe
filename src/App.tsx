import React from 'react';
import Router from 'routes/Router';
import GlobalStyle from 'style/GlobalStyle';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from 'queries/queryClient';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RecoilRoot } from 'recoil';
import { CommonLayout } from 'components/layout';

function App() {
  return (
    <>
      <CommonLayout>
        <RecoilRoot>
          <QueryClientProvider client={queryClient}>
            <GlobalStyle />
            <Router />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </RecoilRoot>
      </CommonLayout>
    </>
  );
}

export default App;
