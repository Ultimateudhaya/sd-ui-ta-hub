import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  candidates: [],
  
};

export const candidatesSlice = createSlice({
  name: 'candidates',
  initialState,
  reducers: {
    setCandidates: (state, action) => {
      state.candidates = action.payload;
    },
    addCandidate: (state, action) => {
      state.candidates.push(action.payload);
    },
    updateCandidate: (state, action) => {
      const updatedCandidate = action.payload;
      state.candidates = state.candidates.map(candidate => 
        candidate.id === updatedCandidate.id ? updatedCandidate : candidate
      );
    },
    deleteCandidate: (state, action) => {
      const candidateId = action.payload;
      state.candidates = state.candidates.filter(candidate => candidate.id !== candidateId);
    },
  },
});

export const { setCandidates, addCandidate, updateCandidate, deleteCandidate } = candidatesSlice.actions;

// Function to delete candidate on the server
export const deleteCandidateOnServer = (candidateId) => async () => {
  try {
    const response = await fetch(`http://localhost:8080/api/candidates/candidate/${candidateId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete candidate on the server');

    }

    // Dispatch action to delete candidate from the Redux store
    // dispatch(deleteCandidate(candidateId));
  } catch (error) {
    console.error('Error deleting candidate:', error);
    // Handle error, if needed
  }
};

// Function to update candidate on the server
export const updateCandidateOnServer = (userData) => async () => {
  try {
    const {candidateId}=userData
    const response = await fetch(`http://localhost:8080/api/candidates/candidate/${candidateId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    console.log("id",candidateId);


    if (!response.ok) {
      throw new Error('Failed to update candidate on the server');
    }

    // Dispatch action to update candidate in the Redux store
    // dispatch(updateCandidate(updatedCandidate));
  } catch (error) {
    console.error('Error updating candidate:', error);
    // Handle error, if needed
  }
};

export default candidatesSlice.reducer;
