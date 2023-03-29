import {Button} from '@mui/material';
import React from 'react';
import axios from 'axios';

export default function Logout() {
  const logOut = () => { // Post to logout and lose the cookie
    axios.post('http://' + window.location.hostname + ':3000/auth/logout', {data: 'data'}, {withCredentials: true});
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  return (
    <Button
      variant="text"
      onClick={logOut}
      sx={{
        color: '#FFFFFE',
        textTransform: 'none',
        fontSize: '18px',
        fontWeight: 'medium',
        ml: '30px',
        bottom: '30px',
        position: 'absolute',
      }}
    >Logout</Button>
  );
}
