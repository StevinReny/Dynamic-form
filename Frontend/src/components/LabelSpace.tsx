// import { Typography } from '@mui/material';
import { FormControl, InputLabel, MenuItem, Select, } from '@mui/material';
// import type { SelectChangeEvent } from '@mui/material/Select';
import axios from 'axios'
import { useEffect, useState, } from 'react'

import FieldDisplay from './FieldDisplay';
// import FieldDisplay from './FieldDisplay';
// import React, { useEffect, useState } from 'react'


export interface FieldInterface{
  id:string,
  name:string,
  formfields:string
}

const LabelSpace = () => {
    const [selectedFieldId,setSelectedFieldId]=useState("");
    const [fields,setField]=useState([]);
    // const navigate=useNavigate()
    // const [selectedField,setSelectedField]=useState<FieldInterface>()
    const getData=async()=>{
        const {data}=await axios.get("http://localhost:8080/getAll")
        // console.log(data)
        
        setField(data.info.map((field:FieldInterface)=>{
          return field
        }))

    }

    // const handleSelectField=(e:SelectChangeEvent)=>{
    //   const id=e.target.value
    //   setSelectedFieldId(id)
    //   navigate(`/change/`)
      
    // }
    useEffect(()=>{
        getData();
    },[])

   
  return (
    <div>
      <FormControl fullWidth>
          <InputLabel id="form-label">Select Form</InputLabel>
          <Select labelId="form-label" value={selectedFieldId} onChange={(e)=>setSelectedFieldId(e.target.value)}>
      {fields.map((field:FieldInterface)=>(
        
            <MenuItem key={field.id} value={field.id}>{field.name}</MenuItem> 
         
      ))}
       </Select>
        </FormControl>
        
        {selectedFieldId && <FieldDisplay id={selectedFieldId}/>}
    </div>
  )
}

export default LabelSpace