import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import { AppButton } from '../components/IndividualComponent'
import axios from 'axios'

const ProfilePage = () => {
    
    const handleCheckOut=async()=>{
        try{
            const  product={
                "name":"Subscribe",
                "price":"100"
                }
            const {data}=await axios.post("http://localhost:8080/subscribe",{product})
            window.location.href=data.url
        }
        catch(error){
            console.log(error)
        }
    }

  return (
    <Box width={"100%"} height={"100vh"} >
        <Grid container sx={{height:"100%"}} spacing={2} >
            <Grid size={6} bgcolor={"wheat"} height={"100%"} sx={{display:"flex",justifyContent:"center",alignItems:"center"}} >
               <Box display={'flex'} height={"25%"} width={"50%"} justifyContent={"center"} alignItems={'center'} borderRadius={"50%"} borderColor={'black'} border={"2px"} bgcolor={'silver'} sx={{ transition: "all 0.3s ease",":hover":{transform:"scale(1.2) translateY(-10px) "}}}>
                <Typography fontSize={'23px'}>Have you not Subscribed</Typography>
                <AppButton onClick={handleCheckOut}>Subscribe</AppButton>
               </Box>
            </Grid>
            <Grid size={6}>
                <Box>

                </Box>
            </Grid>
        </Grid>
    </Box>
  )
}

export default ProfilePage