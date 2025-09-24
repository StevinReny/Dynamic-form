import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  AppButton,
  CheckboxGroup,
  FieldTitle,
  FormTextField,
  ReusableDatePicker,
} from "./IndividualComponent";
import type { Dayjs } from "dayjs";

export interface selectedFieldInterface {
  id: string;
  name: string;
  formfields: string;
}
export interface FormField {
  id: string;
  type: string;
  value: string | boolean | Dayjs | null;
  label: string;
  options?: string;
}

export interface FormData1 {
  name: string;
  fields: FormField[];
}

type FormValue = string | boolean | string[] | File[] | null | undefined;

const FieldDisplay = () => {
  const { id } = useParams();
  const [currentFormTemplate,setCurrentFormTemplate]=useState("")
  const [field, setField] = useState<selectedFieldInterface>({
    id: "",
    name: "",
    formfields: "[]",
  });
  const [formfields, setFormFields] = useState<FormField[]>([]);
  const [formData, setFormData] = useState<{ [key: string]: FormValue }>({});
    const fetchForm = useCallback(async () => {
    const { data } = await axios.post(
      `http://localhost:8080/getbyId`,
      { id },
      { withCredentials: true }
    );
    console.log(data.info);
    setField(data.info);
    console.log(data.info.name);
    const fields = JSON.parse(data.info.formfields);
    setFormFields(fields);
    console.log(JSON.parse(data.info.formfields));

    const initialData: { [key: string]: FormValue } = {};
    fields.forEach((element: FormField) => {
      if (element.type === "checkbox") initialData[element.id] = [];
      else if (element.type === "file") initialData[element.id] = [] as File[];
      else initialData[element.id] = "";
    });
    setFormData(initialData);
  }, [id]); 

  const handleChange = (id: string, value: FormValue) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setFormData((prev) => ({ ...prev, [id]: files }));
  };
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    const formToSend=new FormData()
    formToSend.append("templateId",currentFormTemplate)
    formfields.forEach((field:FormField)=>{
      const value=formData[field.id];

      if(field.type==="checkbox"){
        (value as string[]).forEach((val)=>{
          formToSend.append(field.id,val)
        })
      }
      else if(field.type==='file'){
        (value as File[]).forEach((val)=>{
          formToSend.append(field.id,val)
        })
      }
      else{
        formToSend.append(field.id,value as string)
      }


    })

    // const payload={templateId:currentFormTemplate,formToSend}
    const response=await axios.post("http://localhost:8080/responseFromTemplate",formToSend,{headers:{"Content-Type":"multipart/form-data"},withCredentials:true})
    console.log(response.data)


     const resetData: { [key: string]: FormValue } = {};
  formfields.forEach((element: FormField) => {
    if (element.type === "checkbox") resetData[element.id] = [];
    else if (element.type === "file") resetData[element.id] = [] as File[];
    else resetData[element.id] = "";
  });
  setFormData(resetData);
  console.log(formData);




  };
  useEffect(() => {
    fetchForm();
    setCurrentFormTemplate(id??"")
    // console.log(id)
  }, [id,fetchForm]);

  // const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  // const [selectedDate,setSelectedDate]=useState<string>("")
  return (
    <Box>
      <Container>
        <Paper sx={{ height: "100vh" }} elevation={3} square={false}>
          <Grid container spacing={2}>
            <Grid size={8}>
              <FieldTitle sx={{ textAlign: "center" }}>
                {field?.name}
              </FieldTitle>
              {formfields.map((f, index: number) => {
                if (f.type === "text") {
                  return (
                    <FormTextField
                      fullWidth
                      key={f.id}
                      label={f.label}
                      onChange={(e) => handleChange(f.id, e.target.value)}
                      placeholder={`Enter your ${f.label}`}
                      value={formData[f.id] as string|undefined}
                    />
                  );
                } else if (f.type === "button") {
                  return (
                    <AppButton key={f.id} value={formData[f.id] as string}>
                      {f.label}
                    </AppButton>
                  );
                } else if (f.type === "checkbox") {
                  return (
                    <Box key={index} sx={{ m: 2 }}>
                      <CheckboxGroup
                        label={f.label}
                        value={formData[f.id] as string[]|undefined}
                        onChange={(value: string[]) =>
                          handleChange(f.id, value)
                        }
                        options={f.options?.split(",") || []}
                      />
                    </Box>
                  );
                } else if (f.type === "number") {
                  return (
                    <FormTextField
                      fullWidth
                      key={f.id}
                      onChange={(e) => handleChange(f.id, e.target.value)}
                      label={f.label}
                      placeholder={`Enter your ${f.label}`}
                      value={formData[f.id] as number|undefined}
                      type="number"
                    />
                  );
                } else if (f.type === "date") {
                  return (
                    <Box key={f.id} sx={{ m: 2 }}>
                      <ReusableDatePicker
                        value={formData[f.id] as string|null}
                        label={f.label}
                        onChange={(value) => handleChange(f.id, value)}
                      />
                    </Box>
                  );
                } else if (f.type === "file") {
                  return (
                    <Box
                      key={f.id}
                      sx={{ m: 3 }}
                      display={"flex"}
                      alignItems={"center"}
                    >
                      <AppButton
                        component="label"
                        variant="contained"
                        sx={{ m: 0 }}
                      >
                        {f.label}
                        <input
                          type="file"
                          hidden
                          onChange={(e) => handleFileChange(e, f.id)}
                        />
                      </AppButton>
                      <Typography sx={{ ml: 2 }}>
                        {(formData[f.id] as File[])?.length } attached
                      </Typography>
                    </Box>
                  );
                }
              })}
            </Grid>
          </Grid>
          <AppButton onClick={handleSubmit}>Give</AppButton>
        </Paper>
      </Container>
    </Box>
  );
};

export default FieldDisplay;
