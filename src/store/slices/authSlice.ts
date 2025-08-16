import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  userId: number | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  userId: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
    setUser(state, action: PayloadAction<number>) {
      state.userId = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
  },
});

export const { setAuth, logout, setUser } = authSlice.actions;
export default authSlice.reducer;
