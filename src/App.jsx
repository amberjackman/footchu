// src/App.jsx
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { useDispatch } from "react-redux";
import { store } from "./store/store";
import { setSession, setLoading, setError } from "./store/userSlice";
import AppRouter from "./Router";
import Header from "./Header";
import Footer from "./Footer";
import supabase from "./supabaseClient";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSession = async () => {
      dispatch(setLoading(true)); // 로딩 시작
      dispatch(setError(null)); // 에러 초기화
      const { data, error } = await supabase.auth.getSession();
      // console.log("Session data:", JSON.stringify(data, null, 2));
      if (error) {
        console.error("Error getting session:", error);
        dispatch(setError(error.message)); // 에러 상태 업데이트
      } else {
        dispatch(setSession(data.session));
      }
      dispatch(setLoading(false)); // 로딩 종료
    };

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        dispatch(setSession(session));
      }
    );

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, [dispatch]);

  return (
    <Provider store={store}>
      <Header />
      <AppRouter />
      <Footer />
    </Provider>
  );
};

export default App;
