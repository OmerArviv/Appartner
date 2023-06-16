import { ImageList, ImageListItem } from "@mui/material";

function srcset(image, size, rows = 1, cols = 1) {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${
        size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    };
  }


const StyledImageList=(props)=>{

return(
    <>
        <ImageList
        sx={{ width: 500, height: 450 }}
        variant="quilted"
        cols={4}
        rowHeight={121}>
            {props.images?.map((item)=>{
                return(<ImageListItem>
                    <img
                        {...srcset(item.img, 121, item.rows, item.cols)}
                        alt={item.title}
                        loading="lazy"
                    />

                </ImageListItem>)

            })}
            <ImageListItem>

            </ImageListItem>
        </ImageList>

    </>



);



}

export default StyledImageList; 