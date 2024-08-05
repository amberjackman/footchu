import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setSession, setDisplayName } from "./store/userSlice";
import supabase from "./supabaseClient";
import Modal from "./Modal";
import SignUpForm from "./component/SignUpForm";
import LoginForm from "./component/LoginForm";
import ProfilePage from "./component/ProfilePage";
import "./Header.css";

const Header = () => {
  const [showSignUpModal, setSignUpModal] = useState(false);
  const [showLoginModal, setLoginModal] = useState(false);
  const { session, displayName } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        // console.error("Error fetching session:", error);
      } else if (data?.session?.user) {
        dispatch(setSession(data.session));
        const displayName =
          data.session.user.user_metadata?.displayName ||
          data.session.user.email ||
          "User";
        dispatch(setDisplayName(displayName));
      }
    };
    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          dispatch(setSession(session));
          const displayName =
            session.user.user_metadata?.displayName ||
            session.user.email ||
            "User";
          dispatch(setDisplayName(displayName));
        } else {
          dispatch(setSession(null));
          dispatch(setDisplayName(""));
        }
      }
    );

    return () => {
      if (
        authListener &&
        typeof authListener.subscription?.unsubscribe === "function"
      ) {
        authListener.subscription.unsubscribe();
      }
    };
  }, [dispatch]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      // console.error("Error signing out:", error);
    } else {
      dispatch(setSession(null));
      dispatch(setDisplayName(""));
    }
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img src="/favicon.ico" alt="Logo" />
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/">QUIZ</Link>
          </li>
          <li>
            <Link to="/list">LIST</Link>
          </li>
        </ul>
      </nav>
      <div className="login-container">
        {session?.user ? (
          <>
            <p className="welcome-text">반갑습니다, {displayName} </p>
            <Link className="profile-link" to="/profile">
              Profile
            </Link>
            <a className="logout-link" onClick={handleLogout}>
              Logout
            </a>
          </>
        ) : (
          <>
            <p className="auth-link" onClick={() => setSignUpModal(true)}>
              가입
            </p>
            <p className="auth-link" onClick={() => setLoginModal(true)}>
              로그인
            </p>
          </>
        )}
      </div>
      <Modal show={showSignUpModal} onClose={() => setSignUpModal(false)}>
        <SignUpForm onSignUp={() => setSignUpModal(false)} />
      </Modal>
      <Modal show={showLoginModal} onClose={() => setLoginModal(false)}>
        <LoginForm onAuthChange={() => setLoginModal(false)} />
      </Modal>
    </header>
  );
};

export default Header;
