  import React, { useEffect } from 'react';
  import Box from '@mui/material/Box';
  import { useDispatch } from 'react-redux';
  import DataGridComponent from './DataGridComponent';
  import fetchDataFromAPI from './fetchApi';
  import AddIcon from '@mui/icons-material/Add';
  import { GridToolbarContainer } from '@mui/x-data-grid';
  import { setUsers } from '../GlobalRedux/Features/usersSlice';
  import { setClients } from '../GlobalRedux/Features/clientsSlice';
  import { setCandidates } from '../GlobalRedux/Features/candidatesSlice';

  interface FullFeaturedCrudGridProps {
    apiEndpoint: string;
  }

  const FullFeaturedCrudGrid: React.FC<FullFeaturedCrudGridProps> = (props) => {
    const dispatch = useDispatch();

    // Function to handle click event
    const handleClick = () => {
      // Logic to handle adding a new record
    };

    const { apiEndpoint } = props;

    useEffect(() => {
      async function fetchData() {
        // Fetch data from API
        const usersData = await fetchDataFromAPI('http://localhost:8080/api/users/');
        const clientsData = await fetchDataFromAPI('http://localhost:8080/api/clients/');
        const candidatesData = await fetchDataFromAPI('http://localhost:8080/api/candidates/');

        // Dispatch actions to update Redux store
        dispatch(setUsers(usersData));
        dispatch(setClients(clientsData));
        dispatch(setCandidates(candidatesData));
      }

      // Call fetchData function
      fetchData();
    }, [dispatch, apiEndpoint]); // Dependencies array for useEffect

    return (
      <Box
        sx={{
          marginTop: 10,
          height: 600,
          width: '95%',
          marginLeft: 5,
        }}
      >
        {/* Uncomment the following section if needed */}
        {/* <GridToolbarContainer>
          <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
            Add record
          </Button>
        </GridToolbarContainer> */}

        {/* Render DataGridComponent */}
        <DataGridComponent apiEndpoint={apiEndpoint} />
      </Box>
    );
  };

  export default FullFeaturedCrudGrid;
