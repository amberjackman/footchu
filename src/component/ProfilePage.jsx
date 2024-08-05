// src/pages/ProfilePage.jsx
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setDisplayName } from "../store/userSlice";
import supabase from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";
const ProfilePage = () => {
  const session = useSelector((state) => state.user.session);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [displayName, setDisplayNameLocal] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      setEmail(session.user.email);
      setDisplayNameLocal(session.user.user_metadata?.displayName || "");
    }
  }, [session]);

  const handleUpdateProfile = async () => {
    const updates = {
      email,
      data: { displayName },
    };

    const { error: userError } = await supabase.auth.updateUser(updates);

    if (userError) {
      // console.error("프로필 업데이트 에러:", userError);
    } else {
      dispatch(setDisplayName(displayName));
      if (password) {
        const { error: passwordError } = await supabase.auth.updateUser({
          password,
        });

        if (passwordError) {
          // console.error("비밀번호 업데이트 에러:", passwordError);
        }
      }
      alert("프로필이 업데이트되었습니다.");
      navigate("/");
    }
  };

  return (
    <div className="profile-container">
      <h2>프로필 수정</h2>
      <label>
        이메일
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled
        />
      </label>
      <label>
        닉네임
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayNameLocal(e.target.value)}
        />
      </label>
      <label>
        새 비밀번호
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <div className="btn-container">
        <button onClick={handleUpdateProfile}>저장</button>
        <button onClick={() => navigate(-1)}>취소</button>
      </div>
    </div>
  );
};

export default ProfilePage;
