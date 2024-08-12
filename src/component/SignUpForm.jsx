import React, { useState } from "react";
import supabase from "../supabaseClient";
import { useDispatch } from "react-redux";
import { setSession } from "../store/userSlice";
import "./SignUpForm.css";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const handleSocialSignUp = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      setError(error.message);
      setSuccess(null);
    }
  };

  const handleSignUp = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      setSuccess(null);
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          displayName,
        },
      },
    });

    if (error) {
      setError(error.message);
      setSuccess(null);
    } else {
      setSuccess("회원가입이 성공적으로 완료되었습니다!");
      setError(null);
      const { data: sessionData } = await supabase.auth.getSession();
      dispatch(setSession(sessionData));
    }
  };

  return (
    <div className="SignUpFormContainer">
      <h2>회원가입</h2>
      <span className="warning">
        가입하지 않아도 모든 기능은 자유롭게 이용하실 수 있습니다
        <br />
        비밀번호는 암호화되어 저장되므로 운영자도 확인할 수 없습니다
        <br />
        인증이 필요하므로 사용 가능한 이메일을 입력해주세요
      </span>
      <form onSubmit={handleSignUp}>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="사용할 닉네임"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          required
        />
        <button type="submit">회원가입</button>
      </form>
      <button className="google-signup-button" onClick={handleSocialSignUp}>
        <img
          src="./image/google_logo.png"
          alt="Google logo"
          className="google-logo"
        />
        구글 회원가입
      </button>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </div>
  );
};

export default SignUpForm;
