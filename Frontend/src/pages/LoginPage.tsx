import { useState } from 'react';

import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Paper, 
  CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { toast} from 'react-toastify';

import axios from 'axios';
import axiosInstance from '../auth/auth';

export default function LoginPage() {



  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  
  const [loading,setLoading]=useState(false);
  
  const navigate=useNavigate()

  const handleSubmit=async(e:React.FormEvent)=>{
    e.preventDefault();
    // setError("");
    setLoading(true);
    try{
      const response=await axios.post("http://localhost:8080/login",{email,password},{withCredentials:true});

      const {accessToken,user}=response.data.info;
      if (!accessToken || !user) {
      throw new Error("Invalid login response");
    }
    localStorage.setItem("accessToken",accessToken)
    localStorage.setItem("user",JSON.stringify(user))

      navigate("/");
    }
    catch(err: any){

     
    if (err?.response?.status === 401) {
      toast.error("Invalid email or password");
    } else if (err?.code === "ECONNABORTED") {
      toast.error("Request timed out. Please try again.");
    } else if (!err?.response) {
      toast.error("Unable to connect to server. Check your network.");
    } else {
      toast.error("Something went wrong. Please try again.");
    }
   
  }
    finally{
      setLoading(false);

    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        bgcolor: 'background.default'
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: 400 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Login
        </Typography>
        
        {/* {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )} */}
        
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Sign In'}
          </Button>
        </Box>
       
      </Paper>
       
    </Box>
  );
}





