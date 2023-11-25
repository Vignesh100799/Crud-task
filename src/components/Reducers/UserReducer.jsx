import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "Userlist",
  initialState: {
    users: [],
    loading:false,
    error: null,
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
      state.loading = false;
      state.error = null;
      return state;
    },
    deleteUser: (state, action) => {
      const id = action.payload;
      state.users = state.users.filter((user) => user.id !== id);
      state.loading = false;
      state.error = null;
      return state;
    },
    editUser: (state, action) => {
      const id = action.payload;
      state.users = state.users.filter((user) => user.id !== id);
      state.loading = false;
      state.error = null;
      return state;
    },
    setLoading: (state,action) => {
      state.loading = action.payload;
      state.error = null

    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    

    
  },
});

export const { setLoading,setError, setUsers, deleteUser, editUser } = userSlice.actions;
