import {
  CardContent,
  CardActionArea,
  Typography,
  CardMedia,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Stack, Grid } from "@mui/material";
import RoomateAvatar from "./RoomateAvatar";
import { useNavigate } from "react-router";

function ApartmentListItem(props) {
  const { data } = props;
  const navigate = useNavigate();
  const showApartmentHandler = () => {
    navigate(`/apartment/${data._id}`);
  };

  return (
    <Grid sm={3} xs={12} sx={{ width: 1200, mx: 2 }}>
      <CardActionArea onClick={showApartmentHandler}>
        <CardMedia
          component="img"
          height="306"
          src={
            data.images[0]
              ? data.images[0]
              : "https://www.easylinedrawing.com/wp-content/uploads/2019/07/house_drawing_tutorial.png"
          }
          alt="home image"
          sx={{ borderRadius: 3, boxShadow: 5 }}
          variant="rounded"
          onError={(e) => {
            e.target.src =
              "https://www.easylinedrawing.com/wp-content/uploads/2019/07/house_drawing_tutorial.png";
          }}
        />
      </CardActionArea>
      <Stack direction="column" sx={{ width: 322, py: 3 }}>
        <Typography variant="h7" sx={{ fontWeight: "bold" }} noWrap={true}>
          <LocationOnIcon /> {data.location.name}
        </Typography>
        <Typography variant="h7" marginTop={2}>
          {data.price_range[0] + "$ - " + data.price_range[1] + "$"}
        </Typography>
        <Stack direction="row" spacing={2} marginTop={2}>
          {data.roomates.length > 0
            ? data.roomates.map((item, index) => {
                return <RoomateAvatar email={item} key={index}></RoomateAvatar>;
              })
            : ""}
        </Stack>
      </Stack>
    </Grid>
  );
}

export default ApartmentListItem;
