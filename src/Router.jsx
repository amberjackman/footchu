import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import List from "./List";
import ProfilePage from "./component/ProfilePage";
import ProtectedRoute from "./component/ProtectedRoute"; // ProtectedRoute 임포트
import NotFound from "./component/NotFound"; // NotFound 임포트
import LoginForm from "./component/LoginForm"; // LoginForm 임포트
import SignUpForm from "./component/SignUpForm"; // SignUpForm 임포트
import ShoeDetailPage from "./component/ShoeDetailPage"; // ShoeDetailPage 임포트

const AppRouter = () => {
  const session = useSelector((state) => state.user.session);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/list" element={<List />} />
      <Route path="/shoes/:id" element={<ShoeDetailPage />} /> {/* 축구화 상세 페이지 라우트 추가 */}
      <Route path="/login" element={<LoginForm />} /> {/* 로그인 경로 추가 */}
      <Route path="/signup" element={<SignUpForm />} /> {/* 회원가입 경로 추가 */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} /> {/* 404 페이지 추가 */}
    </Routes>
  );
};

export default AppRouter;
