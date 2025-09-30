import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { FieldTitle } from "./IndividualComponent";
import CloseIcon from "@mui/icons-material/Close";
import type { FormField } from "./DynamicForm";

interface Data1Prop {
  message: string;
  info: [];
}

interface formResponseProp {
  id: string;
  response: Record<string, string | string[]>;
  template: Record<string, string>;
  submittedBy: string;
  createdAt: string;
  workFlowRunId: string;
  isCompleted: boolean;
}

interface DialogProp {
  open: boolean;
  setOpen: (value: boolean) => void;
  setWorkFlowRunId: (value: string) => void;
  data1: Data1Prop;
}

const SummaryPage = ({
  open,
  setOpen,
  data1,
  setWorkFlowRunId,
}: DialogProp) => {
  const handleClose = () => {
    setOpen(false);
    setWorkFlowRunId("");
  };

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: "90vh" } }}
      open={open}
      onClose={handleClose}
    >
      <Box display={"flex"} justifyContent={"space-between"}>
        <DialogTitle>Detailed Response</DialogTitle>
        <IconButton edge="start" color="inherit" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent sx={{ py: "2px" }}>
        <Box sx={{ marginBottom: "10px" }}>
          {data1?.info?.map((formResponse: formResponseProp) => {
            const fields = JSON.parse(formResponse.template.formfields);
            const response = formResponse.response;

            return (
              <Box key={formResponse.id}>
                <FieldTitle
                  variant="h3"
                  sx={{ opacity: "0.7", textAlign: "center" }}
                  padding="1px"
                >
                  {formResponse.template.name}
                </FieldTitle>
                {fields.map((f:FormField) => {
                  let value: string;
                  const fieldValue = response[f.id];

                  if (Array.isArray(fieldValue)) {
                    value = fieldValue.join(", ");
                  } else if (fieldValue) {
                    value = fieldValue;
                  } else {
                    value = "NA";
                  }
                  const label = f.label;
                  return (
                    <Box key={f.id} px={"40px"} py={"2px"}>
                      <Typography textAlign={"left"}>
                        {label}:{value}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
            );
          })}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default SummaryPage;
