import { Box, Card, CardActionArea,  Typography } from '@mui/material'

import { useNavigate } from 'react-router-dom'

export interface WorkFlowProp{
    id:string,
    name:string
}

const WorkFlowCard = ({index,workflow}:{index:number,workflow:WorkFlowProp}) => {
    const navigate=useNavigate()
  return (
    <Box>
        <Card sx={{background:"lightgrey",borderRadius:"10px",width:"250px", height:"100px"}} >
            <CardActionArea onClick={()=>navigate(`/workflow/${workflow.id}`)} sx={{display:"flex",flexDirection:"column",height:"100%"}}>
                    <Typography variant='h4' sx={{color:"primary"}}>{workflow.name}</Typography>
                    <Typography variant='body1' sx={{color:'secondary'}}>{`Workflow ${index}`}</Typography>
            </CardActionArea>

        </Card>
    </Box>
  )
}

export default WorkFlowCard