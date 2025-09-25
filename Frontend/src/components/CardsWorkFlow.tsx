import {  useEffect, useState } from 'react'
import type { WorkFlowProp } from './WorkFlowCard'
import axios from 'axios'
import { Box } from '@mui/material'
import WorkFlowCard from './WorkFlowCard'

const CardsWorkFlow = () => {
    const [workFlows,setWorkFlows]=useState<WorkFlowProp[]>([])

    const fetchWorkFlow=async()=>{
        const{data} =await axios.get("http://localhost:8080/getAllWorkFlow")
        setWorkFlows(data.info)
        console.log(data.info)
    }

    useEffect(()=>{
        fetchWorkFlow();
    },[]);


    return (
        <Box display={'flex'} sx={{overflowX:"auto",gap:2,m:2,}}>
            {workFlows.map((workflow,index)=>(
                <WorkFlowCard key={workflow.id} index={index} workflow={workflow}/>
            ))}
        </Box>
    )


}

export default CardsWorkFlow