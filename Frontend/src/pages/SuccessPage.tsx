import { Box, CircularProgress, Container, Typography } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const SuccessPage = () => {
    const location=useLocation()
    const navigate=useNavigate()
    const [status,setStatus]=useState( {cstatus: 'loading',  // ← Add loading state
        message: "Verifying your payment..."} );
    useEffect(()=>{
      const verifyPayment=async()=>{
        const urlParams=new URLSearchParams(location.search);
        const sessionId=urlParams.get("session_id")

        if(!sessionId){
          navigate('/',{replace:true})
          return 
        }
        try {
          const {data}=await axios.post("http://localhost:8080/verify-payment",{sessionId})  

          if(data.info){
            setStatus({cstatus:"success",message:"Payment Successful! Thank you for your purchase"})
          }
          else{
            setStatus({ 
                        cstatus: 'cancel', 
                        message: 'Payment verification failed. Please try again.' 
                    });
          }
        } catch (error) {
          console.log(error)
            setStatus({ 
                    cstatus: 'cancel', 
                    message: 'Payment verification failed. Please contact support.' 
                });
        }

      }
      verifyPayment();
    },[location,navigate])

//   return (
//     <Box sx={{height:"100vh"}}>
//         <Container sx={{width:"100%",height:"100%",display:'flex',justifyContent:"center",alignItems:"center"}} >
//             <Box bgcolor={status.cstatus==='success'?'green':'orangered'} width={"500px"} height={'200px'} display={'flex'} alignItems={'center'} justifyContent={'center'} borderRadius={"50px"} sx={{opacity:0.8,":hover":{opacity:0.5,scale:1.20}} }>
//                 <Typography sx={{fontSize:"30px"}}>{status.message}</Typography>
//             </Box>
//         </Container>    
//     </Box>
//   )
// }
  return (
        <Box sx={{ height: "100vh" }}>
            <Container sx={{ 
                width: "100%", 
                height: "100%", 
                display: 'flex', 
                justifyContent: "center", 
                alignItems: "center" 
            }}>
                <Box 
                    bgcolor={
                        status.cstatus === 'success' ? 'green' : 
                        status.cstatus === 'cancel' ? 'orangered' : 'gray'  // ← Gray for loading
                    } 
                    width={"500px"} 
                    height={'200px'} 
                    display={'flex'} 
                    alignItems={'center'} 
                    justifyContent={'center'} 
                    borderRadius={"50px"} 
                    sx={{ 
                        opacity: 0.8, 
                        ":hover": { opacity: 0.5, scale: 1.20 },
                        transition: "all 0.3s ease"
                    }}
                >
                    {status.cstatus === 'loading' ? (
                        <Box textAlign="center">
                            <CircularProgress sx={{ color: 'white', mb: 2 }} />
                            <Typography sx={{ fontSize: "20px", color: 'white' }}>
                                {status.message}
                            </Typography>
                        </Box>
                    ) : (
                        <Typography sx={{ fontSize: "23px", color: 'white', textAlign: 'center' }}>
                            {status.message}
                        </Typography>
                    )}
                </Box>
            </Container>    
        </Box>
    )
}

export default SuccessPage