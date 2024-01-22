import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MarkunreadIcon from '@mui/icons-material/Markunread';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useNavigate} from 'react-router-dom';


/**
 *
 * @return {*}
 */
export default function NotFound() {
  const history = useNavigate();

  const goHome = () => {
    history('/');
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <MarkunreadIcon fontSize='large'/>
        <Typography m={2} variant="h6">
          Hmmm.... Can't seem to find that.
        </Typography>
        <Button
          type="submit"
          variant="contained"
          onClick={goHome}
          fullWidth
          margin='normal'
        >
       GO HOME
        </Button>
      </Box>
    </Container>
  );
}
