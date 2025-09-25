import { useEffect, useState } from "react"
import {  AppButton, FieldTitle, FormTextField } from "../components/IndividualComponent"
import axios from "axios"
import { Box, FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material"
import type { FieldInterface } from "../components/LabelSpace"

const AddWorkFlow = () => {

    const [responseField,setResponseField]=useState<{name:string,forms:string[]}>({name:"",forms:[]})
    const [availableForm,setAvailabelForm]=useState<FieldInterface[]>([])
    const [currentForm,setCurrentForm]=useState<FieldInterface[]>([])
    const getData=async()=>{
        const {data}=await axios.get("http://localhost:8080/getAll")
        setCurrentForm(data.info)
        setAvailabelForm(data.info)
        console.log(data.info)

    }

    useEffect(()=>{
        getData();
    },[])

    const handleNameChange=(value:string)=>{
     
            setResponseField((prev)=>({...prev,name:value}))
    }

    const handleFormChange=(form:FieldInterface)=>{
        setResponseField((prev)=>({...prev,forms:[...prev.forms,form.id]}))
        setAvailabelForm((prev)=>prev.filter((f)=>f.id !== form.id))
    }

    const handleSubmit=async()=>{
        console.log(responseField)
        const {data}=await axios.post("http://localhost:8080/addWorkFlow",responseField)
        console.log(data)
        setResponseField({name:"",forms:[]})
        setAvailabelForm(currentForm)
    }
  return (
    <Box>
        <FormTextField fullWidth label="Enter the name of workflow" value={responseField.name} onChange={(e)=>handleNameChange(e.target.value)} required/>
        <Grid container spacing={2}>
            <Grid size={6}>
            <FormControl fullWidth>
                <InputLabel id="form-label">Select form</InputLabel>
                <Select labelId="form-label" value="">
                {availableForm.map((form)=>(
                    <MenuItem key={form.id} value={form.id} onClick={()=>handleFormChange(form)}>{form.name}</MenuItem> 
                ))}
                </Select>
            </FormControl>    

            </Grid>
            <Grid size={6}>
               <FieldTitle variant="caption">{responseField.forms.length} attached</FieldTitle>
            </Grid>
        </Grid>
        <AppButton onClick={handleSubmit}>Submit</AppButton>
    </Box>
  )
}

export default AddWorkFlow