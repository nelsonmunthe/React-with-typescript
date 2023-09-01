
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSnackbar } from "notistack";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserLogin from '../../models/UserLogin';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const Login:React.FC = () => {
  const API_URL = `${process.env.REACT_APP_API_URL}`;
  const navigate =  useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [loginData, setLoginData] = useState<UserLogin>({username: '', password: ''});

  const loginHandler = async () => {
    try {
        const login = await axios.post(`${API_URL}/login`, loginData);
        if(login.status === 200){
          localStorage.setItem('token', login.data.access_token);
          navigate('/dashboard')
          return enqueueSnackbar('login Succeed', { variant: "success"});
        };

    } catch (error: any) {
      if(error.response.status === 422) return enqueueSnackbar(error.response.data.message[0], { variant: "error"});
      return enqueueSnackbar(error.response.data.message, { variant: "error"});
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(!loginData.password || !loginData.username) return enqueueSnackbar("Username or password is Empty", { variant: "error"});
    loginHandler()
  };

  const onChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData(prev => {
      return{
        ...prev,
        username: event.target.value
      }
    })
  };

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData(prev => {
      return{
        ...prev,
        password: event.target.value
      }
    })
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                value={loginData.username}
                onChange={onChangeUsername}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={loginData.password}
                onChange={onChangePassword}
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </Grid>
    </ThemeProvider>
  );
};


export default Login;