"use client"
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/Form.css';
import { FaTimes } from 'react-icons/fa'; 
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { RiAddCircleFill } from 'react-icons/ri';
import { submitForm } from '../GlobalRedux/Features/formSlice';
import SimplePopup from './popUp';
import { Grid, TextField, Select, MenuItem, Button } from '@mui/material';
import { DataGrid, GridColDef, GridToolbarContainer, GridActionsCellItem, GridRowId, GridRowModel, GridRowEditStopReasons, GridRowModesModel, GridRowModes } from '@mui/x-data-grid';
import CustomSnackbar from "../components/CustomSnackbar";


interface Position {
  id: number;
  jobTitle: string;
  noOfOpenings: string;
  roleType: string;
  modeOfWork: string;
  workLocation: string;
}

function Form() {      
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [reqStartDate, setReqStartDate] = useState<Date | null>(null);
    const [projectStartDate, setProjectStartDate] = useState<Date | null>(null);
    const [primarySkill, setPrimarySkill] = useState('');
    const [secondarySkill, setSecondarySkill] = useState('');
    const [isOpen, setIsOpen] = useState(true);
    const [clientName, setClientName] = useState('');
    const [clientSpocName, setClientSpocName] = useState('');
    const [clientSpocContact, setClientSpocContact] = useState('');
    const [accountManager, setAccountManager] = useState('');
    const [accountManagerEmail, setAccountManagerEmail] = useState('');
    const [salaryBudget, setSalaryBudget] = useState('');
    const [modeOfInterviews, setModeOfInterviews] = useState('');
    const [approvedBy, setApprovedBy] = useState('');
    const [yearsOfExperienceRequired, setYearsOfExperienceRequired] = useState('');
    const [noOfOpenings, setNoOfOpenings] = useState<number>(0);
    const [positions, setPositions] = useState<Position[]>([]);
    const dispatch = useDispatch();
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});


    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarVariant, setSnackbarVariant] = useState('success');

    useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await fetch('http://localhost:8080/api/requirement', {
                  method: 'GET',
                  headers: {
                      'Content-Type': 'application/json'
                  }
              });

              if (response.ok) {
                  const data = await response.json();
                  console.log('Fetched data:', data);
              } else {
                  console.error('Failed to fetch data:', response.statusText);
              }
          } catch (error) {
              console.error('An error occurred while fetching data:', error);
          }
      };

      fetchData();
  }, []);

    const submitFormHandler = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const formData = [{
          requirementStartDate: reqStartDate?.toISOString(),
          clientName,
          clientSpocName,
          clientSpocContact,
          accountManager,
          accountManagerEmail,
          totalNoOfOpenings: positions.length,
          positions: positions.map((position) => ({
              jobTitle: position.jobTitle,
              noOfOpenings: position.noOfOpenings.toString(),
              roleType: position.roleType,
              modeOfWork: position.modeOfWork,
              workLocation: position.workLocation
          })),
          salaryBudget: parseFloat(salaryBudget as string),
          modeOfInterviews,
          tentativeStartDate: startDate?.toISOString(),
          tentativeDuration: projectStartDate?.toISOString(),
          approvedBy,
          yearsOfExperienceRequired: parseInt(yearsOfExperienceRequired as string),
          primarySkillSet: primarySkill,
          secondarySkillSet: secondarySkill
      }];

      // Debugging: Log the formData to see its structure
      console.log("Form Data:", formData);

      try {
          const response = await fetch('http://localhost:8080/api/requirement', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(formData)
          });

          if (response.ok) {
              console.log('Form data submitted successfully!');
              setSnackbarOpen(true);
              setSnackbarMessage("Form data submitted successfully!");
              setSnackbarVariant("success");
              setReqStartDate(null);
              setStartDate(null);
              setProjectStartDate(null);
              setPrimarySkill('');
              setSecondarySkill('');
              setClientName('');
              setClientSpocName('');
              setClientSpocContact('');
              setAccountManager('');
              setAccountManagerEmail('');
              setSalaryBudget('');
              setModeOfInterviews('');
              setApprovedBy('');
              setYearsOfExperienceRequired('');
              setPositions([]);
              dispatch(submitForm(formData));
          } else {
              const errorData = await response.json();
              console.error('Failed to submit form data.', errorData);
          }
      } catch (error) {
          console.error('An error occurred while submitting form data:', error);
      }
  };

  const handleAddField = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleClose = () => {
    setIsOpen(false);
};
const handleAddPosition = () => {
    const newPosition: Position = {
      id: positions.length ? positions[positions.length - 1].id + 1 : 0,
      jobTitle: '',
      noOfOpenings: '',
      roleType: '',
      modeOfWork: '',
      workLocation: '',
    };
    setPositions([...positions, newPosition]);
    setRowModesModel((prevModel) => ({
      ...prevModel,
      [newPosition.id]: { mode: GridRowModes.Edit, fieldToFocus: 'jobTitle' },
    }));
  };

  const handleSavePosition = (id: GridRowId) => () => {
    setRowModesModel((prevModel) => ({
      ...prevModel,
      [id]: { mode: GridRowModes.View }
    }));
  };

  const handleDeletePosition = (id: GridRowId) => () => {
    setPositions((prevPositions) => prevPositions.filter((pos) => pos.id !== id));
    setRowModesModel((prevModel) => {
      const newModel = { ...prevModel };
      delete newModel[id];
      return newModel;
    });
  };

  const roleTypeOptions = [
    { value: 'Full-Time', label: 'Full-Time' },
    { value: 'Part-Time', label: 'Part-Time' },
    { value: 'Contract', label: 'Contract' },
  ];

  const modeOfWorkOptions = [
    { value: 'Onsite', label: 'Onsite' },
    { value: 'Remote', label: 'Remote' },
    { value: 'Hybrid', label: 'Hybrid' },
  ];

  const DropdownEditCell = (props) => {
    const { id, field, value, api } = props;
    const handleChange = (event) => {
      api.setEditCellValue({ id, field, value: event.target.value });
    };

    const options = field === 'roleType' ? roleTypeOptions : modeOfWorkOptions;

    return (
      <Select
        value={value}
        onChange={handleChange}
        sx={{ width: '100%' }}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    );
  };

  const columns: GridColDef[] = [
    { field: 'jobTitle', headerName: 'Job Title', width: 150, editable: true },
    { field: 'noOfOpenings', headerName: 'No. of Openings', width: 150, editable: true },
    {
      field: 'roleType',
      headerName: 'Role Type',
      width: 150,
      editable: true,
      renderEditCell: (params) => <DropdownEditCell {...params} />,
    },
    {
      field: 'modeOfWork',
      headerName: 'Mode of Work',
      width: 150,
      editable: true,
      renderEditCell: (params) => <DropdownEditCell {...params} />,
    },
    { field: 'workLocation', headerName: 'Work Location', width: 150, editable: true },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <>
          {rowModesModel[params.id]?.mode === GridRowModes.Edit ? (
            <Button
              onClick={handleSavePosition(params.id)}
              color="primary"
              size="small"
            >
              Save
            </Button>
          ) : (
            <Button
              onClick={() => {
                setRowModesModel((prevModel) => ({
                  ...prevModel,
                  [params.id]: { mode: GridRowModes.Edit, fieldToFocus: 'jobTitle' },
                }));
              }}
              color="primary"
              size="small"
            >
              Edit
            </Button>
          )}
          <Button
            onClick={handleDeletePosition(params.id)}
            color="secondary"
            size="small"
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  const removeOpening = (index: number) => {
      const updatedPositions = [...positions];
      updatedPositions.splice(index, 1);
      setPositions(updatedPositions);
  };
    
  
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    setSnackbarMessage("");
  };

    return (
        isOpen && (
            <div className='position'>
                <div className='container'>
                    <form className='form-req' onSubmit={submitFormHandler}>
                        <div className='header'>
                            <h3>Client Requirement Form</h3>
                            <FaTimes className="close-icon pl-2" onClick={handleClose} />
                        </div>
                        <div className="scrollable-area">
                            <div className='fields'>
                                <div className="form-group p-2">
                                    <label htmlFor="cname" className="form-label">Client Name</label>
                                    <input 
                                        type="text" 
                                        className="input-box" 
                                        name="cname"  
                                        value={clientName} 
                                        onChange={(e) => setClientName(e.target.value)}  
                                        required={true} 
                                    />
                                </div>
                                <div className="form-group p-2">
                                    <label htmlFor="spocname" className="form-label">Client SPOC Name</label>
                                    <input 
                                        type="text" 
                                        className="input-box" 
                                        name="spocname" 
                                        value={clientSpocName} 
                                        onChange={(e) => setClientSpocName(e.target.value)} 
                                        required={true} 
                                    />
                                </div>
                                <div className="form-group pt-3 p-2">
                                    <label htmlFor="date" className="form-label">Requirement Start Date</label>
                                    <div className="date-picker-container">
                                        <DatePicker
                                            selected={reqStartDate}
                                            onChange={(date) => setReqStartDate(date)}
                                            className="calender"
                                            name="date"
                                            dateFormat="dd/MM/yyyy"
                                            required={true}
                                        />
                                    </div>
                                </div>
                                <div className="form-group p-2">
                                    <label htmlFor="contact" className="form-label">Client Contact Details</label>
                                    <input 
                                        type="text" 
                                        className="input-box" 
                                        name="contact" 
                                        value={clientSpocContact} 
                                        onChange={(e) => setClientSpocContact(e.target.value)} 
                                        required={true} 
                                    />
                                </div>
                                <div className="form-group p-2">
                                    <label htmlFor="manager" className="form-label">Account Manager Name</label>
                                    <input 
                                        type="text" 
                                        className="input-box" 
                                        name="manager" value={accountManager} 
                                        onChange={(e) => setAccountManager(e.target.value)} 
                                        required={true} 
                                    />
                                </div>
                                <div className="form-group p-2">
                                    <label htmlFor="email" className="form-label">Account Manager E-mail</label>
                                    <input 
                                        type="email" 
                                        className="input-box" 
                                        name="email" 
                                        value={accountManagerEmail} 
                                        onChange={(e) => setAccountManagerEmail(e.target.value)} 
                                        aria-describedby="emailHelp" 
                                    />
                                </div>

                                <div className="form-group p-2 pb-0 mt-0 position-relative">
                                <label htmlFor="openings" className="form-label">No. of Openings</label>
                                <div className="input-container">
                                    <input
                                    type="number"
                                    className="input-box"
                                    name="openings"
                                    value={noOfOpenings}
                                    onChange={(e) => setNoOfOpenings(Number(e.target.value))}
                                    aria-describedby="emailHelp"
                                    />
                                    <RiAddCircleFill className="add-icon" onClick={handleAddField} />
                                </div>
                                </div>

                                {showPopup && (
                                <SimplePopup onClose={handleClosePopup}>
                                    <Button onClick={handleAddPosition}>Add Position</Button>
                                    <div style={{ height: '89%', width: '100%' }}>
                                    <DataGrid
                                        rows={positions}
                                        columns={columns}
                                        editMode="row"
                                        rowModesModel={rowModesModel}
                                        onRowEditStop={(params, event) => {
                                        if (event.reason === GridRowEditStopReasons.escapeKeyDown) {
                                            setRowModesModel((prevModel) => ({
                                            ...prevModel,
                                            [params.id]: { mode: GridRowModes.View },
                                            }));
                                        }
                                        }}
                                        processRowUpdate={(newRow: GridRowModel) => {
                                        const updatedPositions = positions.map((position) =>
                                            position.id === newRow.id ? { ...position, ...newRow } : position
                                        );
                                        setPositions(updatedPositions);
                                        return newRow;
                                        }}
                                        onRowModesModelChange={setRowModesModel}
                                    />
                                    </div>
                                </SimplePopup>
                                )}

                                <div className="form-group row p-2">
                                    <div className="col">
                                        <label htmlFor="buget" className="form-label">Salary Budget</label>
                                        <input 
                                            type="text" 
                                            className="input-box" 
                                            name='budget' 
                                            value={salaryBudget} 
                                            onChange={(e) => setSalaryBudget(e.target.value)} 
                                            aria-describedby="mobileHelp" 
                                        />
                                    </div>
                                    <div className="col">
                                        <div className="form-group">
                                            <label htmlFor="modeOfInterview" className="form-label">Mode of Interview</label>
                                            <select 
                                                className="input-box" 
                                                name="modeOfInterview" 
                                                value={modeOfInterviews} 
                                                onChange={(e) => setModeOfInterviews(e.target.value)} 
                                                required
                                            >
                                                <option value="">Select an option</option>
                                                <option value="option1">Option 1</option>
                                                <option value="option2">Option 2</option>
                                                <option value="option3">Option 3</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group p-2">
                                    <label htmlFor="date" className="form-label">Project Start Date</label>
                                    <div className="date-picker-container">
                                        <DatePicker
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date)}
                                            className="calender"
                                            name="date"
                                            dateFormat="dd/MM/yyyy"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-group p-2">
                                    <label htmlFor="proj-duration" className="form-label">Project Duration</label>
                                    <div className="date-picker-container">
                                        <DatePicker
                                            selected={projectStartDate}
                                            onChange={(date) => setProjectStartDate(date)}
                                            className="calender"
                                            name="proj-duration"
                                            dateFormat="dd/MM/yyyy"
                                            required={true}
                                        />
                                    </div>
                                </div>
                                <div className="form-group p-2">
                                    <label htmlFor="email" className="form-label">Approved By</label>
                                    <input 
                                        type="email" 
                                        className="input-box" 
                                        name="email" 
                                        value={approvedBy} 
                                        onChange={(e) => setApprovedBy(e.target.value)} 
                                        required={true} 
                                    />
                                </div>
                                <div className="form-group p-2">
                                    <label htmlFor="ex" className="form-label">Years of Experience</label>
                                    <input 
                                        type="number" 
                                        className="input-box" 
                                        name="ex" 
                                        value={yearsOfExperienceRequired} 
                                        onChange={(e) => setYearsOfExperienceRequired(e.target.value)} 
                                        required={true} 
                                    />
                                </div>
                                <div className="form-group p-2">
                                    <label htmlFor="primary-skill" className="form-label">Primary Skill set</label>
                                    <textarea 
                                        className="text-area" 
                                        name="primarySkill" 
                                        id="primary-skill" 
                                        rows={3}
                                        value={primarySkill} 
                                        onChange={(e) => setPrimarySkill(e.target.value)} 
                                        required
                                    />
                                </div>
                                <div className="form-group p-2">
                                    <label htmlFor="secondary-skill" className="form-label">Secondary Skill set</label>
                                    <textarea
                                        className="text-area" 
                                        name="secondarySkill" 
                                        id="secondary-skill" 
                                        rows={3}
                                        value={secondarySkill} 
                                        onChange={(e) => setSecondarySkill(e.target.value)} 
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='footer'>
                            <button type="submit" className="btn-save">Submit</button>
                        </div>
                    </form>
                </div>
                <CustomSnackbar
        message={snackbarMessage}
        variant={snackbarVariant}
        onClose={handleCloseSnackbar}
        open={snackbarOpen}
      />
            </div>
        )
    );
}
export default Form;
