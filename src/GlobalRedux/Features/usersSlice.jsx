import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addNewUser: (state, action) => {
      state.users.push(action.payload);
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    updateUser: (state, action) => {  
      const { id, newData } = action.payload;
      const index = state.users.findIndex(user => user.id === id);
      if (index !== -1) {
        state.users[index] = { ...state.users[index], ...newData };
      }
    },
    deleteUser: (state, action) => {
      const userId = action.payload;
      state.users = state.users.filter(user => user.id !== userId);
    },
  },
});

export const { setUsers, updateUser, deleteUser, addNewUser } = usersSlice.actions;

export const deleteUserOnServer = (userId) => async (dispatch) => {
  try {
    const response = await fetch(`http://localhost:8080/api/users/user/${userId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      dispatch(deleteUser(userId));
      console.log("Deleted successfully");
    } else {
      throw new Error('Failed to delete record on the server');
    }
  } catch (error) {
    console.error('Error deleting record:', error);
  }
};

export const updateUserOnServer = (userData) => async () => {
  const { userId } = userData; 
  
  try {
    const response = await fetch(`http://localhost:8080/api/users/user/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    console.log("userid",userId);


    if (!response.ok) {
      throw new Error('Failed to update user on the server');
    }

    // Dispatch any success action if needed
    // dispatch(updateUserSuccess(userData));
  } catch (error) {
    // Dispatch any failure action if needed
    // dispatch(updateUserFailure(error.message));
  }
};

export default usersSlice.reducer;
