import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  userId: number | null;
  userRoles: string[];
}

const initialState: AuthState = {
  isAuthenticated: false,
  userId: null,
  userRoles: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
    setUser(state, action: PayloadAction<number | null>) {
      state.userId = action.payload;
    },
    setRoles(state, action: PayloadAction<string[]>) {
      state.userRoles = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
  },
});

export const { setAuth, logout, setUser, setRoles } = authSlice.actions;
export default authSlice.reducer;
