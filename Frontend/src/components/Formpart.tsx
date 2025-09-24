import { useDroppable } from "@dnd-kit/core";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import type React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import LabelSpace from "./LabelSpace";
import type { FormData1, FormField } from "./FieldDisplay";



const Formpart = ({
  formData,
  handleNameChange,
  handleChange,
  handleClick1,
  handleDelete,
}: {
  formData:FormData1
  handleNameChange: (value: string) => void;
  handleChange: (field_id: string,property:"value"|"label"|"options", value: string | boolean|Dayjs|null) => void;
  handleClick1: (e: React.FormEvent) => void;
  handleDelete:(field_id:string)=>void
}) => {
  const { setNodeRef, isOver } = useDroppable({ id: "formArea" });
  return (
    <Box>
      <form>
        <FormControl fullWidth>
          <TextField
            value={formData.name}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder="Enter the name of form"
            sx={{ mb: 2 }}
          />
          <Grid container spacing={2}>
            <Grid size={8}>
          <Box
            minHeight={"200px"}
            ref={setNodeRef}
            sx={{ bgcolor: isOver ? "whitesmoke" : "transparent" }}
          >
            {formData.fields.length === 0 && (
              <Typography variant="h6" sx={{ textAlign: "center" }}>
                Drag your element here
              </Typography>
            )}
            {formData.fields.map((field:FormField, index: number) => {
              // const field_key=`${field.id}`
              if (field.type === "text") {
                return (
                  <Box key={index} sx={{ mt: 2 }} display={"flex"}>
                  <TextField value={field.label} onChange={(e)=>handleChange(field.id,"label",e.target.value)} placeholder="Enter the label" fullWidth/> 
                  <TextField
                    value={field.value}
                    onChange={(e) => handleChange(field.id,"value" ,e.target.value)}
                    fullWidth
                    label={field.label}
                    placeholder="Enter the field"
                   
                  />
                  <IconButton color="primary" size="large" onClick={()=>handleDelete(field.id)}>
                    <DeleteIcon/>
                  </IconButton>
                  </Box>
                );
              } else if (field.type === "number") {
                return (
                  <Box  key={index} sx={{ mt: 2 }} display={"flex"}>
                    <TextField value={field.label} onChange={(e)=>handleChange(field.id,"label",e.target.value)} placeholder="Enter the label" fullWidth/> 
                  <TextField
                    type="number"
                    value={field.value}
                    onChange={(e) => handleChange(field.id,"value", e.target.value)}
                    label={field.label}
                    fullWidth
                    placeholder="Enter the data"
                   
                  />
                  <IconButton size="large" color="primary" onClick={()=>handleDelete(field.id)}>
                    <DeleteIcon/>
                  </IconButton>
                  </Box>
                );
              } else if (field.type === "button") {
                return (
                  <Box key={index} mt={2}>
                    <TextField value={field.label} onChange={(e)=>handleChange(field.id,"label",e.target.value)} placeholder="Enter the label" fullWidth/> 
                    <Button variant="contained">{`${field.label}`}</Button>
                    <IconButton size="large" color="primary" onClick={()=>handleDelete(field.id)}>
                    <DeleteIcon/>
                  </IconButton>
                  </Box>
                );
              } else if (field.type === "checkbox") {
                return (
                  <Box  key={index} sx={{ mt: 2 }}>
                    <TextField value={field.label} onChange={(e)=>handleChange(field.id,"label",e.target.value)} placeholder="Enter the label" fullWidth/> 
                    <TextField value={field.options} onChange={(e)=>handleChange(field.id,"options",e.target.value)} label="Enter your options seperated by comma"/>


                      {field.options && field.options.split(",").map((option:string,index:number)=>(

                  <FormControlLabel key={index}
                    control={
                      <Checkbox
                        value={field.value}
                        onChange={(e) =>
                          handleChange(field.id,"value", e.target.checked)
                          
                        }
                      />
                    }
                   
                    label={option}
                    />
                   
                      ))}
                  <IconButton size="large" color="primary" onClick={()=>handleDelete(field.id)}>
                    <DeleteIcon/>
                  </IconButton>
                  </Box>
                );
              }
              else if(field.type==='date'){
                return (
                  <Box key={index} sx={{mt:2}}>
                    <TextField value={field.label} onChange={(e)=>handleChange(field.id,"label",e.target.value) } placeholder="Enter the label"/>
                     <DatePicker value={field.value && typeof field.value === 'string' ? dayjs(field.value as string) : null} label={field.label} onChange={(newValue:Dayjs|null)=>handleChange(field.id,"value",newValue?newValue.format("YYYY-MM-DD"):"")}/>
                      <IconButton size="large" color="primary" onClick={()=>handleDelete(field.id)}>
                    <DeleteIcon/>
                  </IconButton>
                  </Box>
                )
              }
              else if(field.type==='file'){
                return (
                  <Box key={index} sx={{mt:2}}>
                    <TextField value={field.label} onChange={(e)=>handleChange(field.id,"label",e.target.value)} placeholder="Enter the label"/>
                      <Button variant="contained" component="label" >
                        {field.label}
                      <input type="file" hidden onChange={()=>handleChange(field.id,"value",null)}/>
                      </Button>
                      <IconButton size="large" color="primary" onClick={()=>handleDelete(field.id)}>
                    <DeleteIcon/>
                  </IconButton>
                  </Box>
                )
              }
            })}
          </Box>
          </Grid>
          <Grid size={4}>
            <LabelSpace/>
          </Grid>
            </Grid>
          <Box>
            <Button variant="outlined" sx={{ mt: 2 }} onClick={handleClick1}>
              Click
            </Button>
          </Box>
        </FormControl>
      </form>
    </Box>
  );
};

export default Formpart;
