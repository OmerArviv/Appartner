import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  Button,
  DialogContent,
  TextField,
  DialogActions,
  IconButton,
  Grid,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import CreateProfile from "../pages/CreateProfile";

const btnstyle = {
  background: "#4F4E51",
  color: "#D0D2D8",
};

function DialogAddCollabrator(props) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [addProfileOpen, setaddProfileOpen] = useState(false);

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

  useEffect(() => {
    fetch("http://localhost:8000/email-all-userprofiles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  //    const handleSearch = async () => {
  //      // Make an API call or a database query to search for the user by email
  //      const userExists = await searchUserByEmail(email);

  //      if (userExists) {
  //        // Add the existing user to your page
  //        addUserToPage(userExists);
  //      } else {
  //        // Create a new user in your site's database
  //        const newUser = await createUser(email);

  //        // Add the new user to your page
  //        addUserToPage(newUser);
  //      }

  //      handleClose();
  //    };

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        sx={{
          marginBottom: "20px",
          height: "50px",
          color: "black",
        }}
      >
        <AddIcon sx={{ marginRight: "7px", paddingBottom: "2px" }}></AddIcon>
        Add Collaborator
      </Button>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Search Collabrator Profile by Email</DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid item xs={10}>
              <TextField
                autoFocus
                margin="dense"
                label="Email Address"
                type="email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid
              item
              xs={2}
              sx={{
                display: "flex",
                alignItems: "center",
                paddingLeft: "15px",
              }}
            >
              <IconButton size="large">
                <SearchIcon></SearchIcon>
              </IconButton>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ color: "black", fontSize: "12px" }}
            onClick={handleOpenAddProfile}
          >
            dont have an account?
          </Button>
          <Button style={btnstyle} onClick={handleClose}>
            Cancel
          </Button>
          {/* <Button onClick={handleSearch}>Search</Button> */}
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
