import React, { useContext, useEffect } from "react";
import { Grid, Typography, Box, Paper, Button } from "@mui/material";
import { styled } from "@mui/system";
import { pageTitleContext } from "../APP/Utils";

const BigPicture = styled("img")(({ theme }) => ({
    maxWidth: "100%",
    width: "100%",
    height: "auto",
    objectFit: "cover",
    marginBottom: theme.spacing(2),
}));

const SmallPicture = styled("img")(({ theme }) => ({
    maxWidth: "100%",
    width: "100%",
    height: "auto",
    objectFit: "cover",
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(1),
}));

const RoundedPicture = ({ src, alt, text }) => (
    <Box sx={{ position: "relative", display: "inline-block", textAlign: "center", marginRight: 2 }}>
        <Box sx={{ borderRadius: "50%", overflow: "hidden", display: "inline-block" }}>
            <img src={src} alt={alt} style={{ width: "100%", height: "auto" }} />
        </Box>
        <Typography variant="h6" fontWeight="bold" sx={{ marginTop: 1 }}>
            {text}
        </Typography>
    </Box>
);

const btnstyle = {
    background: "#4F4E51",
    height: "50px",
    color: "#D0D2D8",
};

const Topic = ({ label, value }) => (
    <Box sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}>
        <Paper sx={{ padding: "2px 8px", marginRight: 1, bgcolor: "#fff7e9" }}>
            <Typography variant="h6">{label}</Typography>
        </Paper>
        <Typography variant="h6">{value}</Typography>
    </Box>
);

const Apartment = () => {
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
                                <BigPicture
                                    src="https://picsum.photos/300/201"
                                    alt="Profile Picture"
                                />
                                <Grid container justifyContent="center" spacing={2}>
                                    <Grid item xs={3}>
                                        <SmallPicture
                                            src="https://picsum.photos/50"
                                            alt="Profile Picture 1"
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <SmallPicture
                                            src="https://picsum.photos/50"
                                            alt="Profile Picture 2"
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <SmallPicture
                                            src="https://picsum.photos/50"
                                            alt="Profile Picture 3"
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <SmallPicture
                                            src="https://picsum.photos/50"
                                            alt="Profile Picture 4"
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={2} />
                            <Grid item xs={5}>
                                <Box sx={{ height: "fit-content" }}>
                                    <Topic label="Age:" value="24-25" />
                                    <Topic label="Location:" value="New York" />
                                    <Topic label="Price:" value="$2000/month" />
                                    <Topic label="Gender:" value="Male" />
                                    <Topic label="Elevator:" value="Yes" />
                                    <Topic label="Parking:" value="No" />
                                    <Topic label="Pets:" value="Yes" />
                                    <RoundedPicture
                                        src="https://picsum.photos/100"
                                        alt="Profile Picture 5"
                                        text="Noa Sharon, 25"
                                    />
                                    <RoundedPicture
                                        src="https://picsum.photos/101"
                                        alt="Profile Picture 5"
                                        text="Omer Bar, 27"
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Box sx={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
                    <Button
                        variant="contained"
                        // onClick={onSubmitHandler}
                        style={btnstyle}
                        sx={{ width: "300px", marginBottom: "20px" }}
                    >
                        I LOVE THIS APARTMENT, SEND REQUEST
                    </Button>

                </Box>
            </Grid>
        </Grid>
    );
};

export default Apartment;
