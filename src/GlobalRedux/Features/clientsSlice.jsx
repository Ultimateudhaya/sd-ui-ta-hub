import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  clients: [],
};

export const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    setClients: (state, action) => {
      state.clients = action.payload;
    },
    addNewClient: (state, action) => {
      state.clients.push(action.payload);
    },
    updateClient: (state, action) => {
      const updatedClient = action.payload;
      state.clients = state.clients.map(client => 
        client.id === updatedClient.id ? updatedClient : client
      );
    },
    deleteClient: (state, action) => {
      const clientId = action.payload;
      state.clients = state.clients.filter(client => client.id !== clientId);
    },
  },
});

export const { setClients, addNewClient, updateClient, deleteClient } = clientsSlice.actions;

// Function to delete client on the server
export const deleteClientOnServer = (clientId) => async () => {
  try {
    const response = await fetch(`http://localhost:8080/api/clients/client/${clientId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete client on the server');
    }

    // Dispatch action to delete client from the Redux store
    // dispatch(deleteClient(clientId));
  } catch (error) {
    console.error('Error deleting client:', error);
    // Handle error, if needed
  }
};

// Function to update client on the server
export const updateClientOnServer = (userData) => async () => {
  try {
    const {clientId}=userData;
    const response = await fetch(`http://localhost:8080/api/clients/client/${clientId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Failed to update client on the server');
    }

    // Dispatch action to update client in the Redux store
    // dispatch(updateClient(updatedClient));
  } catch (error) {
    console.error('Error updating client:', error);
    // Handle error, if needed
  }
};

export default clientsSlice.reducer;
