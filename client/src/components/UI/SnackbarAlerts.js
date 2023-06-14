import { Snackbar, Alert, AlertTitle } from "@mui/material";
import { useState, useEffect, React } from "react";
import { useHistory } from "react-router-dom";

// const Alert = React.forwardRef(function Alert(props, ref) {
//     return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
//   });


const SnackBarAlerts = (props)=>{
    const [open, setOpen] = useState(props.open);
    const handleClick = () => {
        setOpen(true);
      };
    
      const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
      );



      console.log(props);

    return(
    <>
        <Snackbar open={open} autoHideDuration={6000} sx={{ width: '100%', marginTop: 5 }}>
            <Alert severity={props.severity} sx={{ width: '100%', marginTop:5 }}>
                <AlertTitle>
                    {props.severity}
                </AlertTitle>
                {props.snackbarMessage}
            </Alert>
        </Snackbar>
       </>
       );
}

export default SnackBarAlerts;