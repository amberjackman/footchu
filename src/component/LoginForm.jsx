import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";
import { setSession, setDisplayName, setLoading, setError } from "../store/userSlice"; // setLoading, setError 추가
import "./LoginForm.css";

const LoginForm = ({ onAuthChange }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { session, isLoading, error: globalError } = useSelector((state) => state.user); // isLoading, globalError 가져오기
  const navigate = useNavigate();

  useEffect(() => {
    if (session && session.user && session.user.user_metadata) {
      dispatch(setDisplayName(session.user.user_metadata.displayName || ""));
    }
  }, [session, dispatch]);

  const handleLogin = async () => {
    dispatch(setLoading(true));
    dispatch(setError(null));

    // 클라이언트 측 유효성 검사
    if (!email || !password) {
      dispatch(setError("이메일과 비밀번호를 모두 입력해주세요."));
      dispatch(setLoading(false));
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      dispatch(setError(error.message));
      console.error("로그인 에러:", error);
    } else {
      dispatch(setSession(data.session));
      dispatch(
        setDisplayName(data.session.user.user_metadata.displayName || "")
      );
      onAuthChange(data.session.user);
      navigate("/");
    }
    dispatch(setLoading(false));
  };

  const handleLogout = async () => {
    dispatch(setLoading(true)); // 로딩 시작
    dispatch(setError(null)); // 에러 초기화
    const { error } = await supabase.auth.signOut();
    if (error) {
      dispatch(setError(error.message)); // 전역 에러 상태 업데이트
      console.error("로그아웃 에러:", error);
    } else {
      dispatch(setSession(null));
      dispatch(setDisplayName(""));
      onAuthChange(null);
      navigate("/");
    }
    dispatch(setLoading(false)); // 로딩 종료
  };

  return (
    <>
      <div className="LoginFormContainer">
        <h2>로그인</h2>
        <div>
          {(globalError) && <p className="error-message">{globalError}</p>} {/* 전역 에러 표시 */}
          {!session ? (
            <>
              <input
                type="email"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading} // 로딩 중 비활성화
              />
              <input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading} // 로딩 중 비활성화
              />
              <button onClick={handleLogin} disabled={isLoading}>로그인</button>
            </>
          ) : (
            <button onClick={handleLogout} disabled={isLoading}>로그아웃</button>
          )}
          {isLoading && <p>처리 중...</p>} {/* 로딩 메시지 표시 */}
        </div>
      </div>
    </>
  );
};

export default LoginForm;
