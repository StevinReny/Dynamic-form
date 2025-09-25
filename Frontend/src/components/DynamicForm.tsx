import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { Box, Grid, } from "@mui/material";
import {  useState } from "react";
import PrebuiltButton from "./PrebuiltButton";
import Formpart from "./Formpart";
import { Dayjs } from "dayjs";
import axios from "axios";
import { socket } from "../socket/socket";
import { AppButton } from "./IndividualComponent";
import { useNavigate } from "react-router-dom";
import CardsWorkFlow from "./CardsWorkFlow";




const DynamicForm = () => {
  // const [selectedField, setSelectedField] = useState("");
  const [fields, setFields] = useState<string[]>([]);
  const [formData,setFormData]=useState({name:"",fields:[]as { id: string; type: string; value: string|boolean|Dayjs|null ,label:string,options?:string}[]})
  const prebuild = ["text", "checkbox", "number","button","date","file"];
  const navigate=useNavigate()


  const handleClick=(element:string)=>{
    const field_key=`${element}_${formData.fields.length}`
    // setSelectedField(element);
    setFields([...fields,element])
    setFormData({...formData,fields:[...formData.fields,{id:field_key,type:element,value:element==='checkbox'?false:"",label:""}]})
    // setSelectedField("")
    
  }

  const handleDelete=(id:string)=>{
    setFormData({...formData,fields:formData.fields.filter((element)=>
    element.id!==id
    )})
  }

  const handleNameChange=(value:string)=>{
    setFormData({...formData,name:value})
  }
  const handleChange=(field_key:string,  property: "value"|"label"|"options",value:string|boolean|Dayjs|null)=>{
    setFormData({...formData,fields:formData.fields.map((f)=>
      f.id===field_key?{...f,[property]:value}:f
    )})
  }

  const handleClick1=async(e:React.FormEvent)=>{
    e.preventDefault()
    try{
      const payload={name:formData.name,fields:formData.fields}
      const response=await axios.post("http://localhost:8080/insert",payload,{withCredentials:true })

      console.log(response.data)
      socket.emit("sendNotification",{message:"Form created"})
      console.log(formData)
      setFormData({name:"",fields:[]})
    }
    catch(err:unknown){
       if (err instanceof Error) {
      console.log(err.message)
    } else {
      console.log('An unknown error occurred')
    }
    }
    
  }
  const handleDrag=(event:DragEndEvent)=>{
    const {active,over}=event
    if(!over){
      return 
    }
    if(over && over.id==='formArea' )
    handleClick(String(active.id))
  }

  return (
    <DndContext onDragEnd={handleDrag}>
    <Box>
      <Box display={"flex"} justifyContent={"flex-end"}>
        <AppButton onClick={()=>navigate("/addWorkFlow")}>Add workFlow</AppButton>
      </Box>
      <Grid container spacing={2}>
        <Grid size={2}>
      <Box display={"flex"} flexDirection={"column"} sx={{backgroundColor:"lightgrey", padding:2}} >

        {prebuild.map((element,index) => (
          <PrebuiltButton element={element} key={index} handleClick={handleClick} />
        ))}
      </Box>
      </Grid>
      <Grid size={8}>
        <Formpart formData={formData} handleChange={handleChange} handleClick1={handleClick1} handleNameChange={handleNameChange} handleDelete={handleDelete}/>
      </Grid>
      </Grid>
    </Box>
    <Box>
      <CardsWorkFlow/>
    </Box>
    </DndContext>
  );
};

export default DynamicForm;
