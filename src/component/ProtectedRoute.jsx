import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const session = useSelector((state) => state.user.session);

  if (!session) {
    // 로그인되지 않았다면 홈으로 리디렉션
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;

