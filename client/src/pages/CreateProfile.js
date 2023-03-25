import {Grid, Paper, Box, Container,FormControl, TextField, Autocomplete,OutlinedInput, InputLabel, Select, Typography, CardContent, Card, MenuItem, Button } from '@mui/material';
import { fontSize } from '@mui/system';
import { CardActionArea, CardMedia } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useState } from 'react';


const options=['Yes', 'No', "Sometimes"];
const yesNoOptions=['Yes', 'No'];
const genderOptions=['Male', 'Female', 'Other'];

const CreateProfile= () =>{
    const [userBirthday, setUserBirthday]=useState('');
    const [userEmployment, setUserEmployment]=useState('');
    const [userSmoking, setUserSmoking]=useState(null);
    const [userPets, setUserPets]=useState(null);
    const [userGender, setUserGender]=useState('');
    const [userAlcohol, setUserAlcohol]=useState('')
    const [userKosher, setUserKosher]=useState(null);
    // const [userSmoking, setUserSmoking]=useState(null);
    const [userAdditonal, setUserAdditonalInformation]=useState(null);
    const [userFacebookLink, setUserFacebookLink]=useState(null);
    const [userInstagramLink, setUserInstagramLink]=useState(null);

    function userBirthdayHandler(event) {
        console.log('birthday');
        console.log(event.target.value);
        setUserBirthday(event.target.value);
        console.log(userBirthday);

      };

    function userEmploymentHandler(event) {
        console.log('employment');
        setUserEmployment(event.target.value);
        console.log(userEmployment);

      };

      function userSmokingHandler(event) {

        console.log('userSmoking');
        setUserSmoking(event.target.value);
        console.log(event.target.value);
        console.log(userSmoking);
     
      };

      function userPetsHandler(event) {
        console.log('pets');
        setUserPets(event.target.value);
        console.log(event.target.value);
        console.log(userPets);
     
      };

      function userGenderHandler(event) {
        console.log('gender');
        setUserGender(event.target.value);
        console.log(userGender);
      };

      function userAlcoholHandler(event) {
        console.log('alcohol');
        setUserAlcohol(event.target.value);
        console.log(userAlcohol);
      };

      function userKosherHandler(event) {
        console.log('kosher');
        setUserKosher(event.target.value);
        console.log(userKosher);
        
      };

      function userAdditonalInformationHandler(event) {
        console.log('additional');
        setUserAdditonalInformation(event.target.value);
        console.log(userAdditonal);
        
      };

      function userFacebookLinkHandler(event) {
        console.log('facebook');
        setUserFacebookLink(event.target.value);
        console.log(userFacebookLink);
        
      };

      function userInstagramLinkHandler(event) {
        console.log('instagram');
        setUserFacebookLink(event.target.value);
        console.log(userInstagramLink);
        
      };

    return(
        <>
        <h1>create profile</h1>
        
        <Box container spacing={50} sx={{display:'flex', flexWrap: 'wrap', margin: '10'}}>
            <Box item component="form" xs={4} sx={{width: 400, marginLeft:"auto", marginRight:'auto'}} >
                <Card>
                    <FormControl fullWidth sx={{marginTop:3}} >
                    <CardContent>
                        <InputLabel sx={{fontSize:20, textDecoration:'bolt'}} shrink id='user-birthday-label'>Birth Day date</InputLabel>
                        <TextField
                        labelId="user-birthday-label"
                         id='birthday' 
                         type='date' 
                         onChange={userBirthdayHandler}
                         value={userBirthday}
                         fullWidth 
                         required
                         min="2017-04-01" max="2017-04-30"
                        // max="2023-03-25" min="2023-03-20"
                        />
                    </CardContent>
                    </FormControl>
                    <FormControl fullWidth>
                    <CardContent >
                        <InputLabel sx={{fontSize:20, textDecoration:'bolt'}} shrink id='user-employment-label'>Employment</InputLabel>
                        <TextField
                        //  label='Employment'
                         labelId='user-employment-label'
                         id='employment'
                         onChange={userEmploymentHandler}
                         value={userEmployment}
                         fullWidth/>
                    </CardContent>
                    </FormControl>
                    <FormControl fullWidth >
                    <CardContent >
                        <InputLabel sx={{fontSize:20, textDecoration:'bolt'}} shrink id='smoking-label'>Smoking</InputLabel>
                        <Select 
                        label='Smoking'
                        // labelId='smoking-label'
                        id='smoking'
                        value={userSmoking}
                        onChange={userSmokingHandler}
                        // input={<OutlinedInput label="Smoking" />}
                        fullWidth
                        >
                            {options.map((o)=><MenuItem key={o} value={o}>{o}</MenuItem>)}
                        </Select>
                    </CardContent>
                    </FormControl>
                    <FormControl fullWidth>
                    <CardContent>
                        <InputLabel sx={{fontSize:20, textDecoration:'bolt'}} shrink id='pets-label'>Pets</InputLabel>
                        <Select 
                        // label='Smoking'
                        // labelId='smoking-label'
                        id='pets'
                        value={userPets}
                        onChange={userPetsHandler}
                        // input={<OutlinedInput label="Smoking" />}
                        fullWidth
                        >
                            {yesNoOptions.map((o)=><MenuItem key={o} value={o}>{o}</MenuItem>)}
                        </Select>
                    </CardContent>
                    </FormControl>
                </Card>


            </Box>

            {/*Second Box Form */}
            <Box item component="form" xs={4} sx={{width: 400, marginLeft:"auto", marginRight:'auto'}} >
                <Card>
                    <FormControl fullWidth sx={{marginTop:3}} >
                    <CardContent>
                        <InputLabel sx={{fontSize:20, textDecoration:'bolt'}} shrink id='user-gender-label'>Gender</InputLabel>
                        <Select 
                        label='Gender'
                        // labelId='smoking-label'
                        id='gender'
                        value={userGender}
                        onChange={userGenderHandler}
                        // input={<OutlinedInput label="Smoking" />}
                        fullWidth
                        >
                            {genderOptions.map((o)=><MenuItem key={o} value={o}>{o}</MenuItem>)}
                        </Select>
                    </CardContent>
                    </FormControl>
                    <FormControl fullWidth>
                    <CardContent >
                        <InputLabel sx={{fontSize:20, textDecoration:'bolt'}} shrink id='user-alcohol-label'>Alcohol</InputLabel>
                        <Select
                        //  label='Employment'
                         labelId='user-alcohol-label'
                         id='alcohol'
                         onChange={userAlcoholHandler}
                         value={userAlcohol}
                         fullWidth>
                                {options.map((o)=><MenuItem key={o} value={o}>{o}</MenuItem>)}
                        </Select>
                    </CardContent>
                    </FormControl>
                    <FormControl fullWidth >
                    <CardContent >
                        <InputLabel sx={{fontSize:20, textDecoration:'bolt'}} shrink id='kosher-label'>Kosher</InputLabel>
                        <Select 
                        label='Kosher'
                        // labelId='smoking-label'
                        id='kosher'
                        value={userKosher}
                        onChange={userKosherHandler}
                        // input={<OutlinedInput label="Smoking" />}
                        fullWidth
                        >
                            {yesNoOptions.map((o)=><MenuItem key={o} value={o}>{o}</MenuItem>)}
                        </Select>
                    </CardContent>
                    </FormControl>
                    <FormControl fullWidth>
                    <CardContent>
                        <InputLabel sx={{fontSize:20, textDecoration:'bolt'}} shrink id='pets-label'>Other</InputLabel>
                        <Select 
                        // label='Smoking'
                        // labelId='smoking-label'
                        id='pets'
                        value={userPets}
                        onChange={userPetsHandler}
                        // input={<OutlinedInput label="Smoking" />}
                        fullWidth
                        >
                            {yesNoOptions.map((o)=><MenuItem key={o} value={o}>{o}</MenuItem>)}
                        </Select>
                    </CardContent>
                    </FormControl>
                </Card>
            </Box>


        {/*Third Box photos */}
        <Box item xs={4} sx={{display:'flex',flexWrap: 'wrap', width: "auto", marginLeft:"auto", marginRight:'auto'}} >
        <Box item xs={4} sx={{ width: "auto", marginLeft:"auto", marginRight:'auto'}} >
            <Card  xs={2} sx={{height: 'fit-content', width: 'fit-content', marginLeft:"auto", marginRight:'auto', marginRight:10}}>
                <CardActionArea>
                    <CardMedia
                    component="img"
                    height="200"
                    width="200"
                    // image="https://i0.wp.com/getstamped.co.uk/wp-content/uploads/WebsiteAssets/Placeholder.jpg"
                    alt="upload image 1">
                    </CardMedia>
                </CardActionArea>
            </Card>
            <Card  xs={2} sx={{height: 'fit-content', width: 'fit-content', marginRight:'auto', marginTop:1}}>
                <CardActionArea>
                    <CardMedia
                    component="img"
                    height="200"
                    width="200"
                    // image="https://i0.wp.com/getstamped.co.uk/wp-content/uploads/WebsiteAssets/Placeholder.jpg"
                    alt="upload image 3">
                    </CardMedia>
                </CardActionArea>
            </Card>
           </Box>

            <Box item xs={4} sx={{ width: "auto", marginLeft:"auto", marginRight:'auto'}} >
            <Card  xs={2} sx={{height: 'fit-content', width: 'fit-content', marginLeft:"auto", marginRight:'auto',}}>
                <CardActionArea>
                    <CardMedia
                    component="img"
                    height="200"
                    width="200"
                    // image="https://i0.wp.com/getstamped.co.uk/wp-content/uploads/WebsiteAssets/Placeholder.jpg"
                    alt="upload image 2">
                    </CardMedia>
                </CardActionArea>
            </Card>
            <Card  xs={2} sx={{height: 'fit-content', width: 'fit-content', marginRight:'auto', marginTop:1}}>
                <CardActionArea>
                    <CardMedia
                    component="img"
                    height="200"
                    width="200"
                    // image="https://i0.wp.com/getstamped.co.uk/wp-content/uploads/WebsiteAssets/Placeholder.jpg"
                    alt="upload image 4">
                    </CardMedia>
                </CardActionArea>
            </Card>
    
        </Box>

        </Box>
        </Box>

        {/*4 Box down */}
        <Box container sx={{display:'flex',flexWrap: 'wrap', width: "auto", marginLeft:"auto", marginRight:'auto', marginTop:7, marginBottom:10}} >
            <Box item component="form" xs={8} sx={{width: "auto", marginLeft:"auto", marginRight:'auto'}} >
                <FormControl sx={{marginTop:3}} fullWidth >
                    <InputLabel sx={{fontSize:20, textDecoration:'bolt'}} shrink id='user-additonal-label'>Additonal Information</InputLabel>
                        <br/>
                        <TextField
                        labelId="user-additonal-label"
                         id='additonal' 
                         onChange={userAdditonalInformationHandler}
                         value={userAdditonal}
                         fullWidth 
                         multiline
                         maxRows={3}
                        /> 
                    </FormControl>
                    </Box>

           <Box item component="form" xs={4} sx={{width: 400, marginLeft:"auto", marginRight:'auto'}} >
            
                <FormControl fullWidth sx={{marginTop:3}} >
                <FacebookIcon></FacebookIcon>
                    <InputLabel sx={{fontSize:20, textDecoration:'bolt'}} shrink id='user-facebook-link-label'>Facebook Link</InputLabel>
                        <TextField
                        labelId="user-facebook-link-label"
                         id='fecebookLink' 
                         onChange={userFacebookLinkHandler}
                         value={userFacebookLink}
                         fullWidth 
                        /> 
                    </FormControl>
                    <FormControl fullWidth sx={{marginTop:3}} >
                    <InputLabel sx={{fontSize:20, textDecoration:'bolt'}} shrink id='user-instagram-link-label'>Instagram Link</InputLabel>
                        <InstagramIcon></InstagramIcon>
                        <TextField
                        labelId="user-instagram-link-label"
                         id='instagram' 
                         onChange={userInstagramLinkHandler}
                         value={userInstagramLink}
                         fullWidth 
                        /> 
                    </FormControl>
                    </Box>
        </Box>

        <Button variant='contained'>Lets set your prefernces</Button>
       
    </>
    );
};

export default CreateProfile;

