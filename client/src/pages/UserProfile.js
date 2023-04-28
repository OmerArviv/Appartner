import React, { useContext, useEffect } from "react";
import { Grid, Typography, Box, Paper, Button } from "@mui/material";
import { styled } from "@mui/system";
import { pageTitleContext } from "../APP/Utils";

const ProfilePicture = styled("img")(({ theme }) => ({
    maxWidth: "100%",
    width: "100%",
    height: "auto",
    objectFit: "cover",
    borderRadius: "50%",
    marginBottom: theme.spacing(2),
}));

const Topic = ({ label, value }) => (
    <Box sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}>
        <Paper sx={{ padding: "2px 8px", marginRight: 1, bgcolor: "#fff7e9" }}>
            <Typography variant="h6">{label}</Typography>
        </Paper>
        <Typography variant="h6">{value}</Typography>
    </Box>
);

const btnstyle = {
    background: "#4F4E51",
    height: "50px",
    color: "#D0D2D8",
};

const UserProfile = () => {
    const { setPageTitle } = useContext(pageTitleContext);

    useEffect(() => {
        setPageTitle("Apartment");
    }, [setPageTitle]);

    return (
        <Grid
            container
            justifyContent="center"
            alignItems="stretch"
            style={{ margin: "0 auto" }}
        >
            <Grid item xs={10} sm={8} md={6}>
                <Grid
                    container
                    alignItems="center"
                    justifyContent="center"
                    spacing={2}
                    marginTop={15}
                >
                    <Grid item xs={12}>
                        <Grid
                            container
                            alignItems="center"
                            justifyContent="center"
                            spacing={2}
                        >
                            <Grid item xs={5}>
                                <ProfilePicture
                                    src="https://picsum.photos/300/201"
                                    alt="Profile Picture"
                                />
                                <Box sx={{ display: "flex", justifyContent: "center", marginTop: "3rem" }}>
                                    <Button
                                        variant="contained"
                                        // onClick={onSubmitHandler}
                                        style={btnstyle}
                                        sx={{ width: "300px", marginBottom: "20px" }}
                                    >
                                        CHANGE PROFILE IMAGE
                                    </Button>

                                </Box>
                            </Grid>
                            <Grid item xs={2} />
                            <Grid item xs={5}>
                                <Box sx={{ height: "fit-content" }}>
                                    <Topic label="Age" value="24-25" />
                                    <Topic label="Gender" value="Female" />
                                    <Topic label="Employment" value="Student" />
                                    <Topic label="Alcohol" value="Sometimes" />
                                    <Topic label="Smoking" value="Sometimes" />
                                    <Topic label="Pets" value="No" />
                                    <Topic label="Additional Information" value="I like to sing and play the guitar" />
                                    <Box sx={{ display: "flex", justifyContent: "center", marginTop: "3rem" }}>
                                        <Button
                                            variant="contained"
                                            // onClick={onSubmitHandler}
                                            style={btnstyle}
                                            sx={{ width: "300px", marginBottom: "20px" }}
                                        >
                                            EDIT PROFILE
                                        </Button>

                                    </Box>
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
