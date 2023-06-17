import {createAsyncThunk} from '@reduxjs/toolkit';
import {login} from '~/ultities/Auth';

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({email, password}, {rejectWithValue}) => {
    try {
      const rs = await login(email, password);
      return rs.user.uid;
    } catch (error) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);
