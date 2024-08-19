import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import supabase from "../supabaseClient";
import { setSession, setDisplayName } from "../store/userSlice";
import "./LoginForm.css";

const LoginForm = ({ onAuthChange }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const session = useSelector((state) => state.user.session);

  useEffect(() => {
    if (session && session.user && session.user.user_metadata) {
      dispatch(setDisplayName(session.user.user_metadata.displayName || ""));
    }
  }, [session, dispatch]);

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      // console.error("로그인 에러:", error);
    } else {
      dispatch(setSession(data.session.user));
      dispatch(
        setDisplayName(data.session.user.user_metadata.displayName || "")
      );
      onAuthChange(data.session.user);

      // console.log("displayName:", session.user.user_metadata.displayName);
      window.location.reload();
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      // console.error("로그아웃 에러:", error);
    } else {
      dispatch(setSession(null));
      dispatch(setDisplayName(""));
      onAuthChange(null);
    }
  };

  return (
    <>
      <div className="LoginFormContainer">
        <h2>로그인</h2>
        <div>
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>로그인</button>
          <button onClick={handleLogout}>로그아웃</button>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
