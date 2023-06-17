import React, { useContext, useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Alert,
} from "@mui/material";
import { styled } from "@mui/system";
import { authContext } from "../APP/Utils";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import TransgenderOutlinedIcon from "@mui/icons-material/TransgenderOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import LocalBarOutlinedIcon from "@mui/icons-material/LocalBarOutlined";
import SmokingRoomsOutlinedIcon from "@mui/icons-material/SmokingRoomsOutlined";
import LocalDiningOutlinedIcon from "@mui/icons-material/LocalDiningOutlined";
import PetsOutlinedIcon from "@mui/icons-material/PetsOutlined";
import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";
import DialogImage from "../components/DialogImage";
import {
  getUserProfileByEmail,
  updateUserProfile,
} from "../controller/userProfileController";
import { Navigate } from "react-router-dom";

const ProfilePicture = styled("img")(({ theme }) => ({
  width: "100%",
  height: "400px",
  objectFit: "cover",
  borderRadius: "10%",
  marginBottom: theme.spacing(2),
}));

const options = ["Yes", "No", "Sometimes"];
const yesNoOptions = ["Yes", "No"];
const genderOptions = ["Male", "Female", "Other"];

const Topic = ({ label, value }) => (
  <Box sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}>
    <Typography
      sx={{ padding: "2px 8px", marginRight: 1, fontWeight: 600, fontSize: 18 }}
    >
      {label}
    </Typography>
    <Typography sx={{ fontSize: 18 }}>{value}</Typography>
  </Box>
);

const btnstyle = {
  background: "#4F4E51",
  height: "50px",
  color: "#D0D2D8",
};

const UserProfile = (props) => {
  const { email } = props;
  const { userEmail, setNavBarStatus } = useContext(authContext);
  const [userProfileImage, setUserProfileImage] = useState(
    "https://icon-library.com/images/no-user-image-icon/no-user-image-icon-0.jpg"
  );
  const [age, setAge] = useState();
  const [gender, setGender] = useState();
  const [employment, setEmployment] = useState();
  const [alcohol, setAlcohol] = useState();
  const [kosher, setKosher] = useState();
  const [smoking, setSmoking] = useState();
  const [pets, setPets] = useState();
  const [additionInfo, setAdditionInfo] = useState();
  const [open, setOpen] = useState(false);

  const [editMode, setEditMode] = useState(false);

  const [editableAge, setEditableAge] = useState();
  const [editableGender, setEditableGender] = useState();
  const [editableEmployment, setEditableEmployment] = useState();
  const [editableAlcohol, setEditableAlcohol] = useState();
  const [editableKosher, setEditableKosher] = useState();
  const [editableSmoking, setEditableSmoking] = useState();
  const [editablePets, setEditablePets] = useState();
  const [editableAdditionInfo, setEditableAdditionInfo] =
    useState(additionInfo);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/email-userprofile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      const uProfile = data.message;
      console.log(data.message); // logs "Email received"
      setAge(uProfile.Birthday_date);
      setGender(uProfile.gender);
      setEmployment(uProfile.user_employment);
      setAlcohol(uProfile.alcohol);
      setKosher(uProfile.kosher);
      setSmoking(uProfile.smoking);
      setPets(uProfile.pets);
      setAdditionInfo(uProfile.user_additonal_information);
      setUserProfileImage(uProfile.user_profile_image);

      setEditableAge(uProfile.Birthday_date);
      setEditableGender(uProfile.gender);
      setEditableEmployment(uProfile.user_employment);
      setEditableAlcohol(uProfile.alcohol);
      setEditableKosher(uProfile.kosher);
      setEditableSmoking(uProfile.smoking);
      setEditablePets(uProfile.pets);
      setEditableAdditionInfo(uProfile.user_additonal_information);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (email) {
      fetchData();
    }
  }, []);

  const handleImageError = (event) => {
    setUserProfileImage(
      "https://icon-library.com/images/no-user-image-icon/no-user-image-icon-0.jpg"
    );
  };

  const handleEditProfile = () => {
    if (editMode) {
      const confirmSave = window.confirm(
        "Are you sure you want to save your changes?"
      );
      if (confirmSave) {
        onSubmitHandler();
      } else {
        console.log("No");
      }
    }
    setEditMode(!editMode);
  };

  const onSubmitChangeImageHandler = async (image) => {
    const isValid = await isValidImageAddress(image);

    if (isValid) {
      setUserProfileImage(image);
      const user_email = userEmail;

      const userProfileData = {
        email: user_email,
        user_profile_image: image,
      };

      const userExists = await getUserProfileByEmail(userEmail);
      if (userExists) {
        const result = await updateUserProfile(userProfileData);
        if (result.status === 201) {
          // alert("Profile image changed successfully!");
          setNavBarStatus(true);
        } else {
          alert("Something went wrong - try again!");
        }
      } else {
        alert("User does not exist.");
      }
    } else {
      alert("Invalid image address provided.");
    }
  };

  const isValidImageAddress = (image) => {
    return new Promise((resolve) => {
      const imgElement = document.createElement("img");

      imgElement.onload = () => {
        resolve(true);
      };

      imgElement.onerror = () => {
        resolve(false);
      };

      imgElement.src = image;
    });
  };

  const onSubmitHandler = async (event) => {
    const user_email = userEmail;
    if (
      user_email !== "" &&
      editableAge !== "" &&
      editableGender !== "" &&
      editableEmployment !== "" &&
      editableAlcohol !== "" &&
      editableKosher !== "" &&
      editableSmoking !== "" &&
      editablePets !== "" &&
      editableAdditionInfo !== ""
    ) {
      const ageValue = parseInt(editableAge);

      if (isNaN(ageValue) || ageValue < 18 || ageValue > 75) {
        alert("Please enter a valid age between 18 and 75.");
        return;
      }

      const userProfileData = {
        email: user_email,
        Birthday_date: editableAge,
        user_employment: editableEmployment,
        smoking: editableSmoking,
        pets: editablePets,
        gender: editableGender,
        alcohol: editableAlcohol,
        kosher: editableKosher,
        user_additonal_information: editableAdditionInfo,
      };

      const userExists = await getUserProfileByEmail(userEmail);
      if (userExists) {
        const result = await updateUserProfile(userProfileData);
        if (result.status === 201) {
          fetchData();
          setTimeout(() => {
            alert("Your preferences have been updated!");
          }, 500);
        } else {
          alert("Something went wrong - try again!");
        }
      } else {
        alert("User does not exist.");
      }
    } else {
      alert("Please fill in all the fields.");
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="stretch"
      style={{ margin: "0 auto" }}
    >
      <Grid item xs={10} sm={10} md={10}>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          spacing={1}
          marginTop={2}
        >
          <Grid item xs={12}>
            <Grid
              container
              alignItems="center"
              justifyContent="center"
              spacing={1}
            >
              <Grid item xs={12} sm={5}>
                <Box sx={{ height: 400, overflow: "hidden" }}>
                  <ProfilePicture
                    src={userProfileImage}
                    alt="Profile Picture"
                    onError={handleImageError}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "3rem",
                  }}
                >
                  {email === userEmail && (
                    <div>
                      <Button
                        variant="contained"
                        style={btnstyle}
                        sx={{ width: "300px", marginBottom: "20px" }}
                        onClick={handleClickOpen}
                      >
                        CHANGE PROFILE IMAGE
                      </Button>

                      <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Change Profile Image</DialogTitle>
                        <DialogContent>
                          <DialogImage setImage={onSubmitChangeImageHandler} />
                        </DialogContent>
                      </Dialog>
                    </div>
                  )}
                </Box>
              </Grid>
              <Grid item xs={1} />
              <Grid item xs={6}>
                <Box sx={{ height: 350 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <AccountCircleOutlinedIcon sx={{ paddingBottom: "15px" }} />
                    {editMode ? (
                      <div>
                        <label htmlFor="editableAge">Age:</label>
                        <input
                          type="text"
                          id="editableAge"
                          value={editableAge}
                          onChange={(e) => setEditableAge(e.target.value)}
                        />
                      </div>
                    ) : (
                      <Topic label="Age:" value={age} />
                    )}
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <TransgenderOutlinedIcon sx={{ paddingBottom: "15px" }} />
                    {editMode ? (
                      <div>
                        <label htmlFor="editableGender">Gender:</label>
                        <select
                          id="editableGender"
                          value={editableGender}
                          onChange={(e) => setEditableGender(e.target.value)}
                        >
                          {genderOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    ) : (
                      <Topic label="Gender:" value={gender} />
                    )}
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <BadgeOutlinedIcon sx={{ paddingBottom: "15px" }} />
                    {editMode ? (
                      <div>
                        <label htmlFor="editableEmployment">Employment:</label>
                        <input
                          type="text"
                          id="editableEmployment"
                          value={editableEmployment}
                          onChange={(e) =>
                            setEditableEmployment(e.target.value)
                          }
                        />
                      </div>
                    ) : (
                      <Topic label="Employment:" value={employment} />
                    )}{" "}
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <LocalBarOutlinedIcon sx={{ paddingBottom: "15px" }} />
                    {editMode ? (
                      <div>
                        <label htmlFor="editableAlcohol">Alcohol:</label>
                        <select
                          id="editableAlcohol"
                          value={editableAlcohol}
                          onChange={(e) => setEditableAlcohol(e.target.value)}
                        >
                          {options.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    ) : (
                      <Topic label="Alcohol:" value={alcohol} />
                    )}
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <SmokingRoomsOutlinedIcon sx={{ paddingBottom: "15px" }} />
                    {editMode ? (
                      <div>
                        <label htmlFor="editableSmoking">Smoking:</label>
                        <select
                          id="editableSmoking"
                          value={editableSmoking}
                          onChange={(e) => setEditableSmoking(e.target.value)}
                        >
                          {options.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    ) : (
                      <Topic label="Smoking:" value={smoking} />
                    )}
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <LocalDiningOutlinedIcon sx={{ paddingBottom: "15px" }} />
                    {editMode ? (
                      <div>
                        <label htmlFor="editableKosher">Kosher:</label>
                        <select
                          id="editableKosher"
                          value={editableKosher}
                          onChange={(e) => setEditableKosher(e.target.value)}
                        >
                          {yesNoOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    ) : (
                      <Topic label="Kosher:" value={kosher} />
                    )}
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <PetsOutlinedIcon sx={{ paddingBottom: "15px" }} />
                    {editMode ? (
                      <div>
                        <label htmlFor="editablePets">Pets:</label>
                        <select
                          id="editablePets"
                          value={editablePets}
                          onChange={(e) => setEditablePets(e.target.value)}
                        >
                          {yesNoOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    ) : (
                      <Topic label="Pets:" value={pets} />
                    )}
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <AddCommentOutlinedIcon sx={{ paddingBottom: "15px" }} />
                    {editMode ? (
                      <React.Fragment>
                        <label htmlFor="editableAdditionInfo">
                          Additional Information:
                        </label>
                        <input
                          type="text"
                          id="editableAdditionInfo"
                          value={editableAdditionInfo}
                          onChange={(e) =>
                            setEditableAdditionInfo(e.target.value)
                          }
                        />
                      </React.Fragment>
                    ) : (
                      <Topic
                        label="Additional Information:"
                        value={additionInfo}
                      />
                    )}
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "3rem",
                  }}
                >
                  {email === userEmail && (
                    <Button
                      variant="contained"
                      style={btnstyle}
                      sx={{ width: "300px", marginTop: "30px" }}
                      onClick={handleEditProfile}
                    >
                      {editMode ? "SAVE PROFILE" : "EDIT PROFILE"}
                    </Button>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserProfile;
