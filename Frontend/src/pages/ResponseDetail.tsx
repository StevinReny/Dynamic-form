import { CircularProgress, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
// import { useNavigate, useParams } from 'react-router-dom'
import { AppButton } from '../components/IndividualComponent'
import {  useState } from 'react'
import { useParams } from 'react-router-dom'
import SummaryPage from '../components/SummaryPage'



interface ResponseDetails{
    id:string,
    response:Record<string,string|[]>,
    submittedBy:string,
    createdBy:string,
    workFlowRunId:string,
    isCompleted:string
}
const fetchResponse=async(id:string)=>{
    const response=await axios.get(`http://localhost:8080/getAllResponseOfWorkFlow/${id}`)
    return response.data
}

const fetchResponses=async(id:string)=>{
    const response=await axios.get(`http://localhost:8080/getResponseFromWorkFlowRunId/${id}`)
    return response.data
}


const ResponseDetail = () => {
    const {id}=useParams() 
    const [workFlowRunId,setWorkFlowRunId]=useState<string>("")
    const[open,setOpen]=useState(false)
    // const [formfields,setFormFields]=useState()
    // const navigate=useNavigate();
    const {data,isLoading}=useQuery({
        queryKey:['responses'],
        queryFn:()=>fetchResponse(id!)
    })


    const {data:data1,isLoading:isLoading1}=useQuery({
        queryKey:['responsesWorkFlowRunId',workFlowRunId],
        queryFn:()=>fetchResponses(workFlowRunId),
        enabled:workFlowRunId.length!==0,
    })


    
    // console.log(JSON.parse(data1.info[0].template.formfields))

  if(isLoading) return <CircularProgress/>
  if(isLoading1) return <CircularProgress/>

  return (
    <div>
        {data1 && <SummaryPage open={open} setOpen={setOpen} data1={data1} setWorkFlowRunId={setWorkFlowRunId}/>}
        <Container>
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: "bold" }}>Responses</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Submitted By</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                        {data.info.map((response:ResponseDetails,index:number)=>{
                            return (<TableRow key={index}>
                                <TableCell>{`Response${index}`}</TableCell>
                                <TableCell>{response.submittedBy}</TableCell>
                                <TableCell>Open</TableCell>
                                <TableCell><AppButton onClick={()=>{
                                    setWorkFlowRunId(response.workFlowRunId)
                                    setOpen(true)
                                }}>View</AppButton></TableCell>
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

export default ResponseDetail