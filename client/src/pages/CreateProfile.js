import {
  Box,
  FormControl,
  TextField,
  InputLabel,
  Select,
  CardContent,
  Card,
  MenuItem,
  Button,
  InputAdornment,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createUserProfile } from "../controller/userProfileController";
import UploadImages from "../components/UploadImages";
import { getUserEmail } from "../APP/APP_AUTH";
import { authContext, pageTitleContext } from "../APP/Utils";
import Speechtotext from "../components/Speechtotextapi/Speechtotext";

const btnstyle = {
  // margin: "8px 0",
  background: "#4F4E51",
  height: "50px",
  color: "#D0D2D8",
};

const options = ["Yes", "No", "Sometimes"];
const yesNoOptions = ["Yes", "No"];
const genderOptions = ["Male", "Female", "Other"];

const CreateProfile = () => {
  const navigate = useNavigate();
  const { setPageTitle } = useContext(pageTitleContext);
  const { userEmail } = useContext(authContext);

  // const [arrayImages, setArrayImages]= useState(null);

  useEffect(() => {
    setPageTitle("Create Profile");
  }, []);
  // const [userInstagramLink, setUserInstagramLink]=useState(null);
  const email = "email";
  const userType = "type";

  const [userSTT, setUserSTT] = useState("");

  const [userBirthday, setUserBirthday] = useState("");
  const [userEmployment, setUserEmployment] = useState("");
  const [userSmoking, setUserSmoking] = useState("");
  const [userPets, setUserPets] = useState("");
  const [userGender, setUserGender] = useState("");
  const [userAlcohol, setUserAlcohol] = useState("");
  const [userKosher, setUserKosher] = useState("");
  const [userOther, setUserOther] = useState("");
  const [userAdditonal, setUserAdditonalInformation] = useState("");
  const [userFacebookLink, setUserFacebookLink] = useState("");
  const [userInstagramLink, setUserInstagramLink] = useState("");
  const [userImagesArray, setUserImagesArray] = useState("");

  useEffect(() => {
    if (userSTT != "") {
      console.log(userSTT);
      setUserBirthday(userSTT["age"]);
      setUserEmployment(userSTT["user_employment"]);
      setUserSmoking(userSTT["smoking"]);
      setUserPets(userSTT["pets"]);
      setUserAlcohol(userSTT["alcohol"]);
      setUserKosher(userSTT["kosher"]);
      setUserGender(userSTT["gender"]);
    }
  }, [userSTT]);

  function userBirthdayHandler(event) {
    // console.log('birthday');
    // console.log(event.target.value);
    // let age=event.target.value;

    // if(age>=18 && age<=75){
    //     console.log(userBirthday);
    //     setUserBirthday(event.target.value);
    //     console.log(userBirthday);
    // }
    // else{
    //     // alert("change age");
    //     age="";
    // }
    // setUserBirthday(event.target.value);
    // console.log(userBirthday);

    setUserBirthday(event.target.value);
  }

  function userEmploymentHandler(event) {
    setUserEmployment(event.target.value);
  }

  function userSmokingHandler(event) {
    setUserSmoking(event.target.value);
  }

  function userPetsHandler(event) {
    setUserPets(event.target.value);
  }

  function userGenderHandler(event) {
    setUserGender(event.target.value);
  }

  function userAlcoholHandler(event) {
    setUserAlcohol(event.target.value);
  }

  function userKosherHandler(event) {
    setUserKosher(event.target.value);
  }

  function userOtherHandler(event) {
    setUserOther(event.target.value);
  }

  function userAdditonalInformationHandler(event) {
    setUserAdditonalInformation(event.target.value);
  }

  function userFacebookLinkHandler(event) {
    setUserFacebookLink(event.target.value);
  }

  function userInstagramLinkHandler(event) {
    setUserFacebookLink(event.target.value);
  }

  function userImagesArrayHandler(arr) {
    console.log("set images array handler");
    const newArray = [];
    if (arr[0] != "") {
      newArray.push(arr[0]);
    }
    if (arr[1] != "") {
      newArray.push(arr[1]);
    }
    if (arr[2] != "") {
      newArray.push(arr[2]);
    }
    if (arr[3] != "") {
      newArray.push(arr[3]);
    }
    if (newArray != null) {
      setUserImagesArray(newArray);
    }
    console.log(userImagesArray);
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const user_email = userEmail;
    if (
      user_email != null &&
      userBirthday != null &&
      userEmployment != null &&
      userSmoking != null &&
      userPets != null &&
      userGender != null &&
      userAlcohol != null &&
      userKosher != null &&
      userOther != null
    ) {
      const userProfile = {
        email: user_email,
        Birthday_date: userBirthday,
        user_employment: userEmployment,
        smoking: userSmoking,
        pets: userPets,
        gender: userGender,
        alcohol: userAlcohol,
        kosher: userKosher,
        other: userOther,
        user_additonal_information: userAdditonal,
        user_facebook_link: userFacebookLink,
        user_instagram_link: userInstagramLink,
        user_images_array: userImagesArray,
      };
      const result = await createUserProfile(userProfile);
      if (result.status == 201) {
        navigate("/create-profile/set-prefernces");
      } else if (result.status == 403) {
        alert("Error occured!");
      }
    } else {
      alert("Please enter all fields!");
    }
  };

  return (
    <>
      {/* <Speechtotext setUser={setUserSTT}></Speechtotext> */}
      <Box
        container="true"
        spacing={50}
        sx={{ display: "flex", flexWrap: "wrap", margin: "10", marginTop: 5 }}
      >
        <Box
          item="true"
          component="form"
          xs={4}
          sx={{ width: 400, marginLeft: "auto", marginRight: "auto" }}
        >
          <Card>
            <FormControl fullWidth sx={{ marginTop: 3 }}>
              <CardContent>
                {/* <InputLabel sx={{fontSize:20, textDecoration:'bolt'}} shrink id='user-birthday-label'>Birth Day date</InputLabel> */}
                {/* <TextField
                        labelid="user-birthday-label"
                         id='birthday' 
                         type='date' 
                         onChange={userBirthdayHandler}
                         value={userBirthday}
                         fullWidth 
                         required
                         min="2017-04-01" max="2017-04-30"
                        // max="2023-03-25" min="2023-03-20"
                        /> */}
                <InputLabel
                  sx={{ fontSize: 20, textDecoration: "bolt" }}
                  shrink
                  id="user-birthday-label"
                >
                  Age
                </InputLabel>
                <TextField
                  labelid="user-birthday-label"
                  id="birthday"
                  type="number"
                  onChange={userBirthdayHandler}
                  value={userBirthday}
                  fullWidth
                  required
                  min="18"
                  max="75"
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  helperText="Your age have to be 18-75"
                  // max="2023-03-25" min="2023-03-20"
                />
              </CardContent>
            </FormControl>
            <FormControl fullWidth>
              <CardContent>
                <InputLabel
                  sx={{ fontSize: 20, textDecoration: "bolt" }}
                  shrink
                  id="user-employment-label"
                >
                  Employment
                </InputLabel>
                <TextField
                  //  label='Employment'
                  labelid="user-employment-label"
                  id="employment"
                  onChange={userEmploymentHandler}
                  value={userEmployment}
                  fullWidth
                />
              </CardContent>
            </FormControl>
            <FormControl fullWidth>
              <CardContent>
                <InputLabel
                  sx={{ fontSize: 20, textDecoration: "bolt" }}
                  shrink
                  id="smoking-label"
                >
                  Smoking
                </InputLabel>
                <Select
                  label="Smoking"
                  // labelId='smoking-label'
                  id="smoking"
                  value={userSmoking}
                  onChange={userSmokingHandler}
                  // input={<OutlinedInput label="Smoking" />}
                  fullWidth
                >
                  {options.map((o) => (
                    <MenuItem key={o} value={o}>
                      {o}
                    </MenuItem>
                  ))}
                </Select>
              </CardContent>
            </FormControl>
            <FormControl fullWidth>
              <CardContent>
                <InputLabel
                  sx={{ fontSize: 20, textDecoration: "bolt" }}
                  shrink
                  id="pets-label"
                >
                  Pets
                </InputLabel>
                <Select
                  // label='Smoking'
                  // labelId='smoking-label'
                  id="pets"
                  value={userPets}
                  onChange={userPetsHandler}
                  // input={<OutlinedInput label="Smoking" />}
                  fullWidth
                >
                  {yesNoOptions.map((o) => (
                    <MenuItem key={o} value={o}>
                      {o}
                    </MenuItem>
                  ))}
                </Select>
              </CardContent>
            </FormControl>
          </Card>
        </Box>

        {/*Second Box Form */}
        <Box
          item="true"
          component="form"
          xs={4}
          sx={{ width: 400, marginLeft: "auto", marginRight: "auto" }}
        >
          <Card>
            <FormControl fullWidth sx={{ marginTop: 3 }}>
              <CardContent>
                <InputLabel
                  sx={{ fontSize: 20, textDecoration: "bolt" }}
                  shrink
                  id="user-gender-label"
                >
                  Gender
                </InputLabel>
                <Select
                  label="Gender"
                  // labelId='smoking-label'
                  id="gender"
                  value={userGender}
                  onChange={userGenderHandler}
                  fullWidth
                >
                  {genderOptions.map((o) => (
                    <MenuItem key={o} value={o}>
                      {o}
                    </MenuItem>
                  ))}
                </Select>
              </CardContent>
            </FormControl>
            <FormControl fullWidth>
              <CardContent>
                <InputLabel
                  sx={{ fontSize: 20, textDecoration: "bolt" }}
                  shrink
                  id="user-alcohol-label"
                >
                  Alcohol
                </InputLabel>
                <Select
                  //  label='Employment'
                  labelid="user-alcohol-label"
                  id="alcohol"
                  onChange={userAlcoholHandler}
                  value={userAlcohol}
                  fullWidth
                >
                  {options.map((o) => (
                    <MenuItem key={o} value={o}>
                      {o}
                    </MenuItem>
                  ))}
                </Select>
              </CardContent>
            </FormControl>
            <FormControl fullWidth>
              <CardContent>
                <InputLabel
                  sx={{ fontSize: 20, textDecoration: "bolt" }}
                  shrink
                  id="kosher-label"
                >
                  Kosher
                </InputLabel>
                <Select
                  label="Kosher"
                  // labelId='smoking-label'
                  id="kosher"
                  value={userKosher}
                  onChange={userKosherHandler}
                  // input={<OutlinedInput label="Smoking" />}
                  fullWidth
                >
                  {yesNoOptions.map((o) => (
                    <MenuItem key={o} value={o}>
                      {o}
                    </MenuItem>
                  ))}
                </Select>
              </CardContent>
            </FormControl>
            <FormControl fullWidth>
              <CardContent>
                <InputLabel
                  sx={{ fontSize: 20, textDecoration: "bolt" }}
                  shrink
                  id="pets-label"
                >
                  Other
                </InputLabel>
                <Select
                  // label='Smoking'
                  // labelId='smoking-label'
                  id="other"
                  value={userOther}
                  onChange={userOtherHandler}
                  // input={<OutlinedInput label="Smoking" />}
                  fullWidth
                >
                  {yesNoOptions.map((o) => (
                    <MenuItem key={o} value={o}>
                      {o}
                    </MenuItem>
                  ))}
                </Select>
              </CardContent>
            </FormControl>
          </Card>
        </Box>

        {/*Third Box photos */}
        <UploadImages setArrayImages={userImagesArrayHandler} />
      </Box>

      {/*4 Box down */}
      <Box
        container="true"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          width: "auto",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 7,
          marginBottom: 10,
        }}
      >
        <Box
          item="true"
          component="form"
          xs={4}
          sx={{ width: 800, marginLeft: "auto", marginRight: "auto" }}
        >
          <FormControl fullWidth>
            <InputLabel
              sx={{ fontSize: 20, textDecoration: "bolt" }}
              shrink
              id="user-additonal-label"
            >
              Additonal Information
            </InputLabel>
            <br />
            <TextField
              labelid="user-additonal-label"
              id="additonal"
              onChange={userAdditonalInformationHandler}
              value={userAdditonal}
              //  multiline
              //  maxRows={3}
            />
          </FormControl>
        </Box>

        <Box
          item="true"
          component="form"
          xs={4}
          sx={{ width: 400, marginLeft: "auto", marginRight: "auto" }}
        >
          <FormControl fullWidth spacing={10}>
            <InputLabel
              sx={{ fontSize: 20, textDecoration: "bolt" }}
              shrink
              id="user-facebook-link-label"
            >
              Facebook Link
            </InputLabel>
            <br />
            <TextField
              labelid="user-facebook-link-label"
              id="fecebookLink"
              onChange={userFacebookLinkHandler}
              value={userFacebookLink}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FacebookIcon />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ marginTop: 3 }}>
            <InputLabel
              sx={{ fontSize: 20, textDecoration: "bolt" }}
              shrink
              id="user-instagram-link-label"
            >
              Instagram Link
            </InputLabel>
            <br />
            <TextField
              labelid="user-instagram-link-label"
              id="instagram"
              onChange={userInstagramLinkHandler}
              value={userInstagramLink}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <InstagramIcon />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
        </Box>
      </Box>

      <Box
        container="true"
        sx={{
          display: "flex",
          flexWrap: "warp",
          width: "auto",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Box
          item="true"
          xs={4}
          sx={{ width: 400, marginLeft: "auto", marginRight: "auto" }}
        >
          <Button
            variant="contained"
            onClick={onSubmitHandler}
            style={btnstyle}
            sx={{ width: "auto", marginLeft: 1 / 2, marginRight: 1 / 2 }}
            xs={4}
          >
            Lets set your prefernces
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default CreateProfile;
