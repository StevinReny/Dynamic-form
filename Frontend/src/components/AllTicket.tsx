import {  Chip, CircularProgress, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"
import SummaryPage from "./SummaryPage"

interface TicketResponse{
    id:string,
    ticket_number:string,
    workFlowRunId:string,
    status:string,
    priority:string,
    subject:string
}


 const fetchAllTicket=async()=>{
        const response=await axios.get("http://localhost:8080/getAllTicket")
        return response.data
}


const fetchResponses=async(id:string)=>{
    const response=await axios.get(`http://localhost:8080/getResponseFromWorkFlowRunId/${id}`)
    return response.data
}


const AllTicket = () => {

    const [workFlowRunId,setWorkFlowRunId]=useState<string>("")
    const [open,setOpen]=useState<boolean>(false)
    const {data,isLoading}=useQuery({
        queryKey:['ticket'],
        queryFn:()=>fetchAllTicket()
    })

    const {data:data1,isLoading:isLoading1}=useQuery({
        queryKey:['responsesWorkFlowRunId',workFlowRunId],
        queryFn:()=>fetchResponses(workFlowRunId),
        enabled:workFlowRunId.length!==0,
    })

    if(isLoading) return <CircularProgress/>
      if(isLoading1) return <CircularProgress/>
  return (
    <div>
        {data1 && <SummaryPage open={open} setOpen={setOpen} data1={data1} setWorkFlowRunId={setWorkFlowRunId}/>}
        <Container>
            <TableContainer>
                <Table sx={{bgcolor:"whitesmoke"}}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{fontWeight:"bold"}}>SI.No</TableCell>
                            <TableCell sx={{fontWeight:"bold"}}>Ticket Number</TableCell>
                            <TableCell sx={{fontWeight:"bold"}}>WorkFlow</TableCell>
                            <TableCell sx={{fontWeight:"bold"}}>Status</TableCell>
                            <TableCell sx={{fontWeight:"bold"}}>Priority</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.info.map((ticket:TicketResponse,index:number)=>{
                            return (
                                <TableRow onClick={()=>{setWorkFlowRunId(ticket.workFlowRunId)
                                setOpen(true)}}  sx={{ cursor: "pointer", "&:hover": { backgroundColor: "rgba(0,0,0,0.04)" } }}>
                                    <TableCell>{index+1}</TableCell>
                                    <TableCell>{ticket.ticket_number}</TableCell>
                                    <TableCell>{ticket.subject.split("_")[0]}</TableCell>
                                    <TableCell>{ticket.status==="closed"||ticket.status==='resolved'?<Chip color="success" label={ticket.status.toUpperCase()}/>:<Chip color='error' label={ticket.status.toUpperCase()}/>}</TableCell>
                                    <TableCell>
                                        <Chip color={["medium","high","critical"].includes(ticket.priority)?"error":"warning"} label={ticket.priority.toUpperCase()}/>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    </div>
  )
}

export default AllTicket