import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import DetailPage from "../pages/DetailPage";
import FormPage from "../pages/FormPage";
import Login from "./Login";
import EditPage from "../pages/EditPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/edit/:id" element={<EditPage />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/user/kakao/callback" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
