import { CommonLayout } from 'components/layout';
import { DetailPage, HomePage, PostMapPage, DetailCommentPage } from 'pages';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Router = () => {
  return (
    <CommonLayout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/review/:reviewId" element={<DetailPage />} />
          <Route
            path="/review/comments/:reviewId"
            element={<DetailCommentPage />}
          />
          <Route path="/postmap" element={<PostMapPage />} />
        </Routes>
      </BrowserRouter>
    </CommonLayout>
  );
};

export default Router;
