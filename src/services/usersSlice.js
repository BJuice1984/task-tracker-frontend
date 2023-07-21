import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../utils/UsersApi';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
	async (_, { rejectWithValue }) => {
    try {
      const response = await getUsers();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);


const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [{
			country: null,
      date_of_birth: null,
      email: null,
      first_name: null,
      gender: null,
      id: null,
      last_name: null,
      phone: null,
      photo: null,
      position: null,
      timezone: null,
      username: null,
		}],
    status: null,
    error: null,
  },
  reducers: {
	},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.status = 'resolved';
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      });
  },
});

export const {updateUser, updatePhoto} = usersSlice.actions;
export default usersSlice.reducer;
