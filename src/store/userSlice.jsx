import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    session: null,
    displayName: "",
    isLoading: false, // 로딩 상태 추가
    error: null, // 전역 에러 상태 추가
  },
  reducers: {
    setSession(state, action) {
      state.session = action.payload;
      if (action.payload && action.payload.user) {
        state.displayName =
          action.payload.user.user_metadata?.displayName ||
          action.payload.user.email ||
          "";
      } else {
        state.displayName = "";
      }
    },
    setDisplayName(state, action) {
      state.displayName = action.payload;
    },
    setLoading(state, action) { // 로딩 상태 설정 리듀서
      state.isLoading = action.payload;
    },
    setError(state, action) { // 에러 상태 설정 리듀서
      state.error = action.payload;
    },
  },
});

export const { setSession, setDisplayName, setLoading, setError } = userSlice.actions;

export default userSlice.reducer;
