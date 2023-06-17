import {createSlice} from '@reduxjs/toolkit';
import {loginUser} from './Actions/authAction';
const initialState = {
  uid: null,
  loading: false,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.uid = action.payload.uid;
    },
  },
  extraReducers: builder => {
    //login user
    builder
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.error = true;
      })
      .addCase(loginUser.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.error = false;
        state.uid = payload;
      })
      .addCase(loginUser.rejected, (state, {payload}) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

const {loginSuccess} = authSlice.actions;

export default authSlice.reducer;
