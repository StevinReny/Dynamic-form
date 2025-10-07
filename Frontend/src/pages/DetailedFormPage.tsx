import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

import { AppButton, CheckboxGroup, FieldTitle, FormTextField, ReusableDatePicker } from "../components/IndividualComponent";
import type { Dayjs } from "dayjs";
import { toast } from "react-toastify";

interface FormField {
  id: string;
  type: string;
  value: string;
  label: string;
  options?: string;
}

interface WorkFlowOrder {
  id: string;
  template: Template;
  stepOrder: number;
}

interface Template {
  id: string;
  name: string;
  formfields: string;
}

type FormValue = string | string[] | File[] | null | Dayjs;

const getWorkFlowRunId = (workFlowId: string) => {
  const key = `wkrid_${workFlowId}`;
  const existing = localStorage.getItem(key);
  if (existing) return existing;

  const newId = uuidv4();
  localStorage.setItem(key, newId);
  return newId;
};

const MultiStepWorkFlowPage = () => {
  const { wid } = useParams();
  const navigate = useNavigate();

  const [templates, setTemplates] = useState<Template[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [workFlowRunId, setWorkFlowRunId] = useState("");
  const [currentTemplateName, setCurrentTemplateName] = useState("");
  const [currentStepField, setCurrentStepField] = useState<FormField[]>([]);
  const [currentStepValue, setCurrentStepValue] = useState<Record<string, FormValue>>({});
  const [response, setResponse] = useState<Record<string, string>>({});

  // Fetch workflow and initialize run ID
  useEffect(() => {
    const fetchWorkflow = async () => {
      const { data } = await axios.get(`http://localhost:8080/getWorkFlowById/${wid}`);
      const temp = data.info.orders.map((o: WorkFlowOrder) => o.template);
      setTemplates(temp);
      const wfrid = getWorkFlowRunId(wid!);
      setWorkFlowRunId(wfrid);
    };
    fetchWorkflow();
  }, [wid]);

  // Load current template & reset step values
useEffect(() => {
  if (!templates[currentIndex]) return;

  const template = templates[currentIndex];
  setCurrentTemplateName(template.name);

  // Parse fields
  const fields: FormField[] = JSON.parse(template.formfields);
  setCurrentStepField(fields);

  // Reset currentStepValue **to empty first**
  const initialValue: Record<string, FormValue> = {};
  fields.forEach(f => {
    const key = `${template.id}_${f.id}`;
    if (f.type === "checkbox" || f.type === "file") initialValue[key] = [];
    else initialValue[key] = "";
  });

  // **Overwrite only with saved backend response**
  const fetchResponse = async () => {
    const { data } = await axios.get(
      `http://localhost:8080/getFormResponse/${wid}/${template.id}/${workFlowRunId}`
    );
    if (data.info) {
      const savedResponse = data.info.response;
      fields.forEach(f => {
        const key = `${template.id}_${f.id}`;
        if (savedResponse[f.id] !== undefined) {
          if (f.type === "checkbox") {
            initialValue[key] = Array.isArray(savedResponse[f.id]) ? savedResponse[f.id] : [savedResponse[f.id]];
          } else {
            initialValue[key] = savedResponse[f.id];
          }
        }
      });
    }
    setCurrentStepValue(initialValue); // finally set state
  };

  fetchResponse();
}, [currentIndex, templates, wid, workFlowRunId]);

  // Map backend response to prefixed keys
  useEffect(() => {
    if (!response || Object.keys(response).length === 0) return;
    if (!templates[currentIndex]) return;

    const template = templates[currentIndex];
    const updatedValues: Record<string, FormValue> = {};

    currentStepField.forEach(f => {
      const key = `${template.id}_${f.id}`;
      const val = response[f.id]; // backend uses f.id
      if (f.type === "checkbox") updatedValues[key] = Array.isArray(val) ? val : val ? [val] : [];
      else if (f.type === "file") updatedValues[key] = [];
      else updatedValues[key] = val || "";
    });

    setCurrentStepValue(prev => ({ ...prev, ...updatedValues }));
  }, [response, currentStepField, currentIndex, templates]);

  // Handlers
  const handleTextChange = (field_id: string, value: string) => {
    setCurrentStepValue(prev => ({ ...prev, [field_id]: value }));
  };
  const handleCheckBoxChange = (field_id: string, value: string[]) => {
    setCurrentStepValue(prev => ({ ...prev, [field_id]: value }));
  };
  const handleFileChange = (field_id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setCurrentStepValue(prev => ({ ...prev, [field_id]: files }));
  };

  const handleSubmit = async () => {
    const formToSend = new FormData();
    formToSend.append("isCompleted", currentIndex === templates.length - 1 ? "true" : "false");
    formToSend.append("templateId", templates[currentIndex].id);
    formToSend.append("submittedBy", "ronnie");
    formToSend.append("workFlowId", wid!);
    formToSend.append("workFlowRunId", workFlowRunId);

    currentStepField.forEach(f => {
      const key = `${templates[currentIndex].id}_${f.id}`;
      const value = currentStepValue[key];
      if (f.type === "checkbox" || f.type === "file") {
        (Array.isArray(value) ? value : []).forEach(v => formToSend.append(f.id, v));
      } else {
        formToSend.append(f.id, value as string);
      }
    });

    try {
      const resp=await axios.post("http://localhost:8080/responseFromTemplate", formToSend, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true
      });
      if(formToSend.get("isCompleted")==='true'){

        toast.success("TICKET GENERATED")
        toast.warning(resp.data.info.ticket_number,{autoClose:8000})
      }
      console.log(resp.data)
      setCurrentIndex(prev => prev + 1);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box>
      <Paper sx={{ p: 3, mx: "auto" }}>
        <FieldTitle gutterBottom>{currentTemplateName}</FieldTitle>

        <Grid container spacing={3}>
          {currentStepField.map(f => {
            const key = `${templates[currentIndex]?.id}_${f.id}`;
            return (
              <Grid key={f.id} size={8}>
                {f.type === "text" && (
                  <FormTextField
                    fullWidth
                    value={currentStepValue[key] as string || ""}
                    label={f.label}
                    onChange={e => handleTextChange(key, e.target.value)}
                  />
                )}
                {f.type === "number" && (
                  <FormTextField
                    fullWidth
                    type="number"
                    value={currentStepValue[key] as string || ""}
                    label={f.label}
                    onChange={e => handleTextChange(key, e.target.value)}
                  />
                )}
                {f.type === "checkbox" && (
                  <CheckboxGroup
                    label={f.label}
                    options={f.options?.split(",") || []}
                    value={currentStepValue[key] as string[] || []}
                    onChange={value => handleCheckBoxChange(key, value)}
                  />
                )}
                {f.type === "date" && (
                  <ReusableDatePicker
                    value={currentStepValue[key] as string || ""}
                    onChange={value => handleTextChange(key, value)}
                    label={f.label}
                  />
                )}
                {f.type === "file" && (
                  <Box display={"flex"} alignItems={"center"}>
                    <AppButton component={"label"}>
                      {f.label}
                      <input hidden type="file" onChange={e => handleFileChange(key, e)} />
                    </AppButton>
                    <Typography>{(currentStepValue[key] as File[])?.length || 0} files attached</Typography>
                  </Box>
                )}
              </Grid>
            );
          })}
        </Grid>

        {templates.length > 0 && (
          <Box display={"flex"} gap={2} mt={3}>
            <AppButton disabled={currentIndex === templates.length - 1} onClick={handleSubmit}>
              Next
            </AppButton>
            <AppButton disabled={currentIndex === 0} onClick={() => setCurrentIndex(prev => prev - 1)}>
              Prev
            </AppButton>
            {currentIndex === templates.length - 1 && (
              <AppButton
                onClick={() => {
                  handleSubmit();
                  localStorage.removeItem(`wkrid_${wid}`);
                  navigate("/");
                }}
              >
                Submit
              </AppButton>
            )}
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default MultiStepWorkFlowPage;
