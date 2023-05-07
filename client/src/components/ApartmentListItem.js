import {
  CardContent,
  CardActionArea,
  Typography,
  CardMedia,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Stack } from "@mui/material";
import RoomateAvatar from "./RoomateAvatar";
import { useNavigate } from "react-router";

function ApartmentListItem(props) {
  const { data } = props;
  const navigate = useNavigate();
  const showApartmentHandler = () => {
    console.log("show apartement");
    console.log(data._id);
    navigate(`/apartment/${data._id}`);
  };

  return (
    <>
      {/* <Box container="true" sx={{ height: 200, width: 300,display: 'inline-flex', flexDirection: 'column', flexWrap: "wrap", alignItems: 'center' }}> */}

      {/* <Box item="true" sx={{ height: "fit-content", width: "fit-content"}}> */}
      <CardActionArea
        sx={{ width: "fit-content" }}
        onClick={showApartmentHandler}
      >
        <CardContent>
          <CardMedia
            component="img"
            height="250"
            width="250"
            src={data.images[0]}
            alt="home image"
            sx={{ borderRadius: 3, boxShadow: 5 }}
            variant="rounded"
          />
        </CardContent>
      </CardActionArea>

      {/* </Box> */}
      {/* <Box item="true" sx={{ height: "fit-content", width: "fit-content"}} > */}
      <Stack direction="column">
        <CardContent>
          <Typography variant="h5">
            <LocationOnIcon /> {data.location}
          </Typography>
        </CardContent>
        <CardContent>
          <Typography variant="h6">
            Price:{data.price_range[0] + "$ - " + data.price_range[1] + "$"}
            {"   "}
          </Typography>
        </CardContent>
        <CardContent>
          <Stack direction="row" spacing={2}>
            {data.roomates.length != 0
              ? data.roomates.map((item, index) => {
                  return (
                    <RoomateAvatar email={item} key={index}></RoomateAvatar>
                  );
                })
              : ""}
          </Stack>
        </CardContent>
      </Stack>
      {/* </Box> */}
      {/* </Box> */}
    </>
  );
}

export default ApartmentListItem;
