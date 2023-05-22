import { Box, Avatar, Badge, Stack, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));
  

function ChatOnline(){

    return(
        <>
        {/*ChatOnline rommates */}
        <Box container="true" 
        sx={{mt:"20px",display:"flex", alignItems:"center", fontWeight:"500", cursor:"pointer", ml:4}}
        >
            {/*Chat online image */}
            <Box item="true"
            sx={{objectFit:"cover", position:"relative"}}
            >
                <Stack direction="row" spacing={4}>
                <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                >
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </StyledBadge>
{/*                     
                    <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right', mt:2 }}
                    sx={{mt:2}}
                    badgeContent={
                    <Avatar alt="user avatar" src="/static/images/avatar/1.jpg" />
                    }/> */}

                    <Typography
                    sx={{marginTop:5}}
                    >
                        user name
                    </Typography>
                </Stack>
               
            </Box>
        </Box>
        
        
        
        </>


    )
};

export default ChatOnline;