import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import List from "./List";
import ProfilePage from "./component/ProfilePage";

const AppRouter = () => {
  const session = useSelector((state) => state.user.session);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/list" element={<List />} />
      {session && <Route path="/profile" element={<ProfilePage />} />}
    </Routes>
  );
};

export default AppRouter;
