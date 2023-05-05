import { Box, Avatar, Typography, Grid } from "@material-ui/core";
import main_3 from "../images/main_3.jpeg";

const RequestItem = () => {
  return (
    <Grid container>
      <Grid item xs={6}>
        <Avatar
          src={main_3}
          alt="User Avatar"
          sx={{ height: "200", width: "200" }}
        />
        <Typography variant="h6" component="h3" sx={{ mb: 1 }}>
          jsdn
        </Typography>
      </Grid>
    </Grid>
  );
};

export default RequestItem;
