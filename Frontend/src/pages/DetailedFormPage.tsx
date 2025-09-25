import { useParams } from "react-router-dom"
// import FieldDisplay from "../components/FieldDisplay"
import { useEffect, useState } from "react"
import axios from "axios"
import { Box } from "@mui/material"
import FieldDisplay from "../components/FieldDisplay"
import { AppButton } from "../components/IndividualComponent"

// interface currentWorflow{
//     id:string,
//     name:string,
//     orders:WorkFlowOrder[]

// }

interface WorkFlowOrder{
    id:string,
    template:Template,
    stepOrder:number,
}

interface Template{
    id:string,
    name:string,
    formfields:string,
}


const DetailedFormPage = () => {
    const {wid}=useParams()
    const [templates,setTemplates]=useState<Template[]>([])
    const [currentIndex,setCurrentIndex]=useState(0);
    // console.log(id)
    useEffect(()=>{
        const fetchCurrentWorkFlow=async()=>{
            const {data}=await axios.get(`http://localhost:8080/getWorkFlowById/${wid}`)
            // const f:currentWorflow=data.info
            const temp=data.info.orders.map((o:WorkFlowOrder)=>o.template)
            console.log(temp)
            setTemplates(temp)
        }
        fetchCurrentWorkFlow()

    },[wid])
  return (
    <Box>
        {templates.length>0 && (  
            <>
            <FieldDisplay id={templates[currentIndex].id}/>
            <Box display={"flex"} gap={2}>
            <AppButton disabled={currentIndex===(templates.length-1)}onClick={ ()=>setCurrentIndex(currentIndex+1)}>Next</AppButton>
            <AppButton disabled={currentIndex===0} onClick={()=>setCurrentIndex(currentIndex-1)}>Prev</AppButton>
            </Box>
            </>
    )}

       
    </Box>
    
  )
}

export default DetailedFormPage