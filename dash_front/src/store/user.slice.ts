import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Service } from 'services/service';
import { User } from 'services/user';
import { Widget } from 'services/widget';

interface UserState {
  id?: string;
  username?: string;
  email?: string;
  is_admin?: boolean;
  created_at?: Date;
  updated_at?: Date;
  services?: Service[];
  widgets?: Widget[];
}

const initialState: UserState = {
  id: undefined,
  username: undefined,
  email: undefined,
  is_admin: undefined,
  created_at: undefined,
  updated_at: undefined,
  services: undefined,
  widgets: undefined,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.is_admin = action.payload.is_admin;
      state.id = action.payload.id;
      state.created_at = action.payload.created_at;
      state.updated_at = action.payload.updated_at;
      state.widgets = action.payload.widgets;
      state.services = action.payload.services;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
