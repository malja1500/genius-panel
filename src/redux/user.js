import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: [],
    userId: 0,
  },
  reducers: {
    onUserChange: (state, action) => {
      state.user = action.payload;
    },
    onUserIdChange: (state, action) => {
      state.userId = action.payload;
    },
  },
});

export default userSlice.reducer;

export const useUserSelector = () => useSelector((state) => state.user);

export const { onUserChange, onUserIdChange } = userSlice.actions;
