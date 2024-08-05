import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    session: null,
    displayName: "",
    id: null,
  },
  reducers: {
    setSession(state, action) {
      state.session = action.payload;
      if (action.payload?.user) {
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
  },
});

export const { setSession, setDisplayName } = userSlice.actions;

export default userSlice.reducer;
