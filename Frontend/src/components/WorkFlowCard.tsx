import { Box, Card, CardActionArea,  Typography } from '@mui/material'

import { useNavigate } from 'react-router-dom'

export interface WorkFlowProp{
    id:string,
    name:string
}

interface WorkFlowCardProps {
  index: number;
  workflow: WorkFlowProp;
  navigateTo: (workflow: WorkFlowProp) => string; // function prop
}



const WorkFlowCard = ({index,workflow,navigateTo}:WorkFlowCardProps) => {
    const navigate=useNavigate()
  return (
    <Box>
        <Card sx={{background:"lightgrey",borderRadius:"10px",width:"250px", height:"100px"}} >
            <CardActionArea onClick={()=>navigate(navigateTo(workflow))} sx={{display:"flex",flexDirection:"column",height:"100%"}}>
                    <Typography variant='h4' sx={{color:"primary"}}>{workflow.name}</Typography>
                    <Typography variant='body1' sx={{color:'secondary'}}>{`Workflow ${index}`}</Typography>
            </CardActionArea>

        </Card>
    </Box>
  )
}

export default WorkFlowCard