import {
  CardContent,
  CardActionArea,
  Typography,
  CardMedia,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Stack } from "@mui/material";
import RoomateAvatar from "./RoomateAvatar";
import { useNavigate } from "react-router";

function ApartmentListItem(props) {
  const { data } = props;
  const navigate = useNavigate();
  const showApartmentHandler = () => {
    navigate(`/apartment/${data._id}`);
  };

  return (
    <>
      <CardActionArea sx={{ width: 350 }} onClick={showApartmentHandler}>
        <CardContent>
          <CardMedia
            component="img"
            height="250"
            width="250"
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
        </CardContent>
      </CardActionArea>
      <Stack direction="column" sx={{ width: 370 }}>
        <CardContent sx={{ marginTop: "20px" }}>
          <Typography variant="h5">
            <LocationOnIcon /> {data.location.name}
          </Typography>
        </CardContent>
        <CardContent>
          <Typography variant="h6">
            Price: {data.price_range[0] + "$ - " + data.price_range[1] + "$"}
          </Typography>
        </CardContent>
        <CardContent>
          <Stack direction="row" spacing={2}>
            {data.roomates.length > 0
              ? data.roomates.map((item, index) => {
                  return (
                    <RoomateAvatar email={item} key={index}></RoomateAvatar>
                  );
                })
              : ""}
          </Stack>
        </CardContent>
      </Stack>
    </>
  );
}

export default ApartmentListItem;
