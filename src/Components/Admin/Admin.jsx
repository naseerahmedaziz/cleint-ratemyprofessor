import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Admin.css";
import { Link } from 'react-router-dom';
import UpdateIcon from '../Assets/update.png';
import DeleteIcon from '../Assets/delete.png';
import { useNavigate } from 'react-router-dom';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import { useSelector } from 'react-redux';


const Admin = () => {
	const [profs, setProfs] = useState([]);
	const [open, setOpen] = React.useState(false);
	const [selectedProf, setSelectedProf] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedSubject, setUpdatedSubject] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false); // State for the add dialog
  const [newName, setNewName] = useState(""); // State for the new teacher fields
  const [newSubject, setNewSubject] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const token = useSelector(state => state.token);
   useEffect(() => {
		getProfs();
	}, []);
	const getProfs = () => {
		axios
		.get("http://localhost:3000/admin/getTeachers", {
			headers: {
			 Authorization: `Bearer ${token}`
			}
		  })
			.then((response) => {
				const data = response.data;
				setProfs(data);
				console.log(response);
			})
			.catch((error) => {
				if (!error.response) {
					// this.errorStatus = "Error: Network Error";
				} else {
					// this.errorStatus = error.response.data.message;
				}
			});
	};

	const handleUpdate = (prof) => {
		setSelectedProf(prof);
		setUpdatedName(prof.name);
		setUpdatedSubject(prof.subject);
		setUpdatedEmail(prof.email);
		setOpenUpdateDialog(true);
	  };
	
	  const handleUpdateSubmit = () => {
		// Perform the update request using axios
		axios
		  .put(`http://localhost:5000/profs/${selectedProf._id}`, {
			name: updatedName,
			subject: updatedSubject,
			email: updatedEmail,
		  })
		  .then((response) => {
			const data = response.data;
			getProfs();
			setOpen(false);
		  })
		  .catch((error) => {
			console.log(error);
		  });
	  };
	  const handleDelete = (prof) => {
		setSelectedProf(prof);
		setOpenDeleteDialog(true);
	  };
	
	  const handleDeleteSubmit = () => {
		axios
		  .delete(`http://localhost:5000/profs/${selectedProf._id}`)
		  .then((response) => {
			const data = response.data;
			getProfs();
			setOpenDeleteDialog(false);
		  })
		  .catch((error) => {
			console.log(error);
		  });
	  };
	  const handleAdd = () => {
		setOpenAddDialog(true);
	  };
	
	  const handleAddSubmit = () => {
		axios
		  .post("http://localhost:3000/admin/teachers", {
			name: newName,
			subject: newSubject,
			email: newEmail,
		  })
		  .then(() => {
			getProfs();
			setOpenAddDialog(false);
		  })
		  .catch((error) => {
			console.log(error);
		  });
	  };
	
	  const handleCloseUpdateDialog = () => {
		setOpenUpdateDialog(false);
	  };
	
	  const handleCloseDeleteDialog = () => {
		setOpenDeleteDialog(false);
	  };
	
	  const handleCloseAddDialog = () => {
		setOpenAddDialog(false);
	  };
	// const handleRequest = (isApproved, id) => {
	// 	axios
	// 		.post(`http://localhost:5000/profs/${id}`, { isApproved })
	// 		.then((response) => {
	// 			const data = response.data;
	// 			getProfs();
	// 		})
	// 		.catch((error) => {
	// 			console.log(error);
	// 		});
	// };

	// const handleClose = () => {
	// 	setOpen(false);
	// };

	return (
		<div className="admin">
		  <div className="aatab">
			Rate My Professor (RMP)
			<Link to="/adminlogin">
			  <button className="logout-button">Logout</button>
			</Link>
		  </div>
		  <div className="admin-container">
			<div className="admin-title">
			  <h1>Teachers List:
			  <button className="add-button" onClick={handleAdd}>Add Teacher
            </button>
			  </h1>
			  <div className="requests">
				<div className="requests-container">
				  {profs.length
					? profs.map((prof) => (
						<div className="prof-request" key={`${prof.id}${prof.name}`}>
						  <div className="prof-request-icons">
                        <img
                          src={UpdateIcon}
                          alt="Update"
                          className="uicon"
                          onClick={() => handleUpdate(prof)}
                        />
                        <img
                          src={DeleteIcon}
                          alt="Delete"
                          className="dicon"
                          onClick={() => handleDelete(prof)}
                        />
                      </div>
						  <div className="prof-name">
							<h1>{prof.name}</h1>
							<h3>{prof.subject}</h3>
							<h4>{prof.email}</h4>
						  </div>
						</div>
					  ))
					: null}
				</div>
			  </div>
			</div>
		  </div>
		  <Dialog open={openUpdateDialog} onClose={handleCloseUpdateDialog}>
        <DialogTitle>Update Teacher Details</DialogTitle>
        <DialogContent>
          <label htmlFor="updatedName">Name:</label>
          <input
            type="text"
            id="updatedName"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
          />
          <br />
          <label htmlFor="updatedSubject">Subject:</label>
          <input
            type="text"
            id="updatedSubject"
            value={updatedSubject}
            onChange={(e) => setUpdatedSubject(e.target.value)}
          />
          <br />
          <label htmlFor="updatedEmail">Email:</label>
          <input
            type="text"
            id="updatedEmail"
            value={updatedEmail}
            onChange={(e) => setUpdatedEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
		<Button onClick={handleCloseUpdateDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateSubmit} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Delete Teacher</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this teacher?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteSubmit} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

	  {/* Add Dialog */}
      <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
        <DialogTitle>Add New Teacher</DialogTitle>
        <DialogContent>
          <label htmlFor="newName">Name:</label>
          <input
            type="text"
            id="newName"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <br />
          <label htmlFor="newSubject">Subject:</label>
          <input
            type="text"
            id="newSubject"
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
          />
          <br />
          <label htmlFor="newEmail">Email:</label>
          <input
            type="text"
            id="newEmail"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddSubmit} color="primary">
            Add Teacher
          </Button>
        </DialogActions>
      </Dialog>
		</div>
		
	  );
};

export default Admin;