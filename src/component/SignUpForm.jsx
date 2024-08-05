import React, { useState } from "react";
import supabase from "../supabaseClient";
import "./SignUpForm.css";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

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
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      // console.error("Sign up error:", error);
      setError(error.message);
      setSuccess(null);
    } else {
      // console.log("Sign up success:", data);
      setSuccess("회원가입이 성공적으로 완료되었습니다!");
      setError(null);
    }
  };

  return (
    <div className="SignUpFormContainer">
      <h2>회원가입</h2>
      <span className="warning">
        가입하지 않아도 모든 기능은 자유롭게 이용하실 수 있습니다
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
        <button type="submit">회원가입</button>
      </form>
      <button onClick={handleSocialSignUp}>구글 로그인</button>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </div>
  );
};

export default SignUpForm;
