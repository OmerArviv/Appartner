import { useState, useEffect, useContext } from "react";
import {
  Dialog,
  DialogTitle,
  Button,
  DialogContent,
  TextField,
  DialogActions,
  IconButton,
  Grid,
  Autocomplete,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CreateProfile from "../pages/CreateProfile";
import { authContext } from "../APP/Utils";

const btnstyle = {
  background: "#4F4E51",
  color: "#D0D2D8",
};

function DialogAddCollabrator(props) {
  const { userEmail } = useContext(authContext);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [tempEmail, setTempEmail] = useState("");
  const [addProfileOpen, setaddProfileOpen] = useState(false);
  const [usersData, setUsersData] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenAddProfile = () => {
    setaddProfileOpen(true);
  };

  const handleCloseAddProfile = () => {
    setaddProfileOpen(false);
  };

  const handleChooseCollaborator = () => {
    if (usersData.some(user => user.email === tempEmail)) {
      setEmail(tempEmail);
      props.onChooseCollaborator(tempEmail);
      handleClose();
    } else {
      alert('Invalid email address!');
    }
  };

  useEffect(() => {
    fetch("http://localhost:8000/email-all-userprofiles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((response) => response.json())
      .then((data) => {
        const filteredData = data.filter((user) => user.email !== userEmail);
        setUsersData(filteredData);
        console.log(filteredData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  return (
    <div >
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        sx={{
          marginBottom: "20px",
          height: "50px",
          width: "400px",
          color: "black",
        }}
      >
        <AddIcon sx={{ marginRight: "7px", paddingBottom: "2px" }}></AddIcon>
        {email ? email : "Add Collaborator"}
      </Button>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Search Collabrator Profile by Email</DialogTitle>
        <DialogContent>
          <Autocomplete
            id="collaborator-email"
            options={usersData}
            getOptionLabel={(option) => option.email}
            renderInput={(params) => (
              <TextField
                {...params}
                autoFocus
                margin="dense"
                label="Email Address"
                type="email"
                fullWidth
                value={tempEmail}
                onChange={(e) => setTempEmail(e.target.value)}
              />
            )}
            onChange={(event, value) => {
              if (value) {
                setTempEmail(value.email);
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ color: "black", fontSize: "12px" }}
            onClick={handleOpenAddProfile}
          >
            your roommate doesn't have an account?
          </Button>
          <Button style={btnstyle} onClick={handleClose}>
            Cancel
          </Button>
          <Button style={btnstyle} onClick={handleChooseCollaborator}>
            Choose
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={addProfileOpen} onClose={handleCloseAddProfile}>
        <DialogTitle>Creat Profile For collaborator</DialogTitle>
        <CreateProfile></CreateProfile>
      </Dialog>
    </div>
  );
}

export default DialogAddCollabrator;
