import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuth: boolean;
  token: string | null;
}

const initialState: AuthState = {
  isAuth: !!localStorage.getItem('token'),
  token: localStorage.getItem('token'),
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuth = true;
    },
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
  },
});

export const { setToken, setIsAuth } = authSlice.actions;

export default authSlice.reducer;
