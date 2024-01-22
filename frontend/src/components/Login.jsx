import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import MarkunreadIcon from '@mui/icons-material/Markunread';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useNavigate} from 'react-router-dom';

/**
 * Login Page based on canvas announcement:
 * Assignment 8 - Login Test with Mock API
 * https://canvas.ucsc.edu/courses/57262/discussion_topics/427805
 * @return {*}
 */
export default function SignIn() {
  const [user, setUser] = React.useState({email: '', pass: ''});
  const history = useNavigate();

  React.useEffect(() => {
    localStorage.removeItem('user');
  }, []);

  const handleInputChange = (event) => {
    const {value, name} = event.target;
    const u = user;
    u[name] = value;
    setUser(u);
    // console.log(user);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:3010/v0/login', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then((json) => {
        localStorage.setItem('user', JSON.stringify(json));
        history('/');
      })
      .catch((err) => {
        alert('Error logging in, please try again');
      });
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
        <Typography component="h1" variant="h5" aria-label='title'>
            CSE186 Mail
        </Typography>
        <TextField
          onChange={handleInputChange}
          margin="normal"
          name="email"
          label="Email Address"
          fullWidth
          role='textbox'
          autoFocus
        />
        <TextField
          onChange={handleInputChange}
          margin="normal"
          name="pass"
          type="password"
          fullWidth
          label="Password"
        />
        <Button
          type="submit"
          variant="contained"
          aria-label='log in'
          role='button'
          onClick={onSubmit}
          fullWidth
        >
       Log In
        </Button>
      </Box>
    </Container>
  );
}
