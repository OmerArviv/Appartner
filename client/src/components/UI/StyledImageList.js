import { CardMedia } from "@material-ui/core";
import { ImageList, ImageListItem, Box } from "@mui/material";
import { useEffect, useState } from "react";

function srcset(image, size, rows = 1, cols = 1) {
  if (image.includes("?")) {
    image = image.split("?")[0];
  }
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const StyledImageList = (props) => {
  const [images, setImages] = useState([]);
  const apartmentImages = props.images;
  var tmpImages = [];

  const styleImages = () => {
    if (apartmentImages) {
      if (apartmentImages.length == 4) {
        let img1 = {
          alt: "image 1",
          src: apartmentImages[0],
          rows: 2,
          cols: 2,
        };
        tmpImages.push(img1);
        let img2 = {
          alt: "image 1",
          src: apartmentImages[1],
        };
        tmpImages.push(img2);
        let img3 = {
          alt: "image 3",
          src: apartmentImages[2],
        };
        tmpImages.push(img3);
        let img4 = {
          alt: "image 4",
          src: apartmentImages[3],
          cols: 2,
        };
        tmpImages.push(img4);
      }
      if (apartmentImages.length == 3) {
        console.log("in function");
        let img1 = {
          alt: "image 1",
          src: apartmentImages[0],
          rows: 2,
          cols: 2,
        };
        tmpImages.push(img1);
        let img2 = {
          alt: "image 1",
          src: apartmentImages[1],
        };
        tmpImages.push(img2);
        let img3 = {
          alt: "image 3",
          src: apartmentImages[2],
        };
        tmpImages.push(img3);
      }
      if (apartmentImages.length == 2) {
        let img1 = {
          alt: "image 1",
          src: apartmentImages[0],
          rows: 2,
          cols: 2,
        };
        tmpImages.push(img1);
        let img2 = {
          alt: "image 1",
          src: apartmentImages[1],
          rows: 2,
          cols: 2,
        };
        tmpImages.push(img2);
      }
      if (apartmentImages.length == 1) {
        let img1 = {
          alt: "image 1",
          src: apartmentImages[0],
          rows: 2,
          cols: 2,
        };
        tmpImages.push(img1);
      }
      if (tmpImages) {
        setImages(tmpImages);
      }
    }
  };

  useEffect(() => {
    styleImages();
  }, [apartmentImages]);
  // console.log(images);
  // console.log(props.images);

  return (
    <>
      {/* <Box item="true" sx={{display:"flex", alignItems:"center", justifyContent:"center"}}> */}
      <ImageList
        sx={{
          width: "80%",
          height: "80%",
          marginRight: "auto",
          marginLeft: "auto",
        }}
        variant="quilted"
        cols={4}
        rowHeight={"auto"}
      >
        {images?.map((item, index) => {
          return (
            <ImageListItem
              key={item.src}
              cols={item.cols || 1}
              rows={item.rows || 1}
            >
              <img
                {...srcset(item.src, 121, item.rows, item.cols)}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          );
        })}
      </ImageList>

      {/* </Box> */}
    </>
  );
};

export default StyledImageList;
