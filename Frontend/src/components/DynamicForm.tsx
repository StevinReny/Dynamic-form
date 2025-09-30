import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import {
  AppButton,
  CheckboxGroup,
  FieldTitle,
  FormTextField,
  ReusableDatePicker,
} from "./IndividualComponent";
import type { Dayjs } from "dayjs";

// meta info about the form template
export interface FormMeta {
  id: string;
  name: string;
  formfields: string; // stored as string in DB, needs JSON.parse
}

export interface FormData1 { name: string; fields: FormField[]; }

// one field definition (schema)
export interface FormField {
  id: string;
  type: string;
  value: string | boolean | Dayjs | null;
  label: string;
  options?: string;
}

// possible user input value types
type FormValue = string | boolean | string[] | File[] | null | undefined;

const DynamicForm = ({ id }: { id: string }) => {
  const [currentTemplateId, setCurrentTemplateId] = useState("");
  const [formMeta, setFormMeta] = useState<FormMeta>({
    id: "",
    name: "",
    formfields: "[]",
  });

  // schema of fields
  const [formSchema, setFormSchema] = useState<FormField[]>([]);
  // actual user answers
  const [formValues, setFormValues] = useState<{ [key: string]: FormValue }>({});

  const fetchForm = useCallback(async () => {
    const { data } = await axios.post(
      `http://localhost:8080/getbyId`,
      { id },
      { withCredentials: true }
    );

    setFormMeta(data.info);

    const fields = JSON.parse(data.info.formfields);
    setFormSchema(fields);

    // initialize user answers
    const initialValues: { [key: string]: FormValue } = {};
    fields.forEach((element: FormField) => {
      if (element.type === "checkbox") initialValues[element.id] = [];
      else if (element.type === "file") initialValues[element.id] = [] as File[];
      else initialValues[element.id] = "";
    });
    setFormValues(initialValues);
  }, [id]);

  const handleChange = (id: string, value: FormValue) => {
    setFormValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setFormValues((prev) => ({ ...prev, [id]: files }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formToSend = new FormData();
    formToSend.append("templateId", currentTemplateId);

    formSchema.forEach((field: FormField) => {
      const value = formValues[field.id];

      if (field.type === "checkbox") {
        (value as string[]).forEach((val) => {
          formToSend.append(field.id, val);
        });
      } else if (field.type === "file") {
        (value as File[]).forEach((val) => {
          formToSend.append(field.id, val);
        });
      } else {
        formToSend.append(field.id, value as string);
      }
    });

    const response = await axios.post(
      "http://localhost:8080/responseFromTemplate",
      formToSend,
      { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true }
    );
    console.log(response.data);

    // reset inputs after submit
    const resetValues: { [key: string]: FormValue } = {};
    formSchema.forEach((element: FormField) => {
      if (element.type === "checkbox") resetValues[element.id] = [];
      else if (element.type === "file") resetValues[element.id] = [] as File[];
      else resetValues[element.id] = "";
    });
    setFormValues(resetValues);
  };

  useEffect(() => {
    fetchForm();
    setCurrentTemplateId(id ?? "");
  }, [id, fetchForm]);

  return (
    <Box>
      <Container>
        <Paper sx={{ height: "auto" }} elevation={3} square={false}>
          <Grid container spacing={2}>
            <Grid size={8}>
              <FieldTitle sx={{ textAlign: "center" }}>
                {formMeta?.name}
              </FieldTitle>
              {formSchema.map((f, index: number) => {
                if (f.type === "text") {
                  return (
                    <FormTextField
                      fullWidth
                      key={f.id}
                      label={f.label}
                      onChange={(e) => handleChange(f.id, e.target.value)}
                      placeholder={`Enter your ${f.label}`}
                      value={formValues[f.id] as string | undefined}
                    />
                  );
                } else if (f.type === "button") {
                  return (
                    <AppButton key={f.id} value={formValues[f.id] as string}>
                      {f.label}
                    </AppButton>
                  );
                } else if (f.type === "checkbox") {
                  return (
                    <Box key={index} sx={{ m: 2 }}>
                      <CheckboxGroup
                        label={f.label}
                        value={formValues[f.id] as string[] | undefined}
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
                      value={formValues[f.id] as number | undefined}
                      type="number"
                    />
                  );
                } else if (f.type === "date") {
                  return (
                    <Box key={f.id} sx={{ m: 2 }}>
                      <ReusableDatePicker
                        value={formValues[f.id] as string | null}
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
                        {(formValues[f.id] as File[])?.length} attached
                      </Typography>
                    </Box>
                  );
                }
              })}
            </Grid>
          </Grid>
          <AppButton onClick={handleSubmit}>Submit</AppButton>
        </Paper>
      </Container>
    </Box>
  );
};

export default DynamicForm;
