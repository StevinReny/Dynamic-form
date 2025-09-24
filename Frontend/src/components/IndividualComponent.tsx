import {  Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, TextField, Typography, type ButtonProps, type TextFieldProps, type TypographyProps } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";

interface FieldTitleProps extends TypographyProps{
    variant?:"h1"|"h2"|"h3"|"h4"|"h5"|"h6"|"caption"|"body1"|"body2",
    size?:"small"|"medium"|"large",
    children:React.ReactNode
}
type FormTextFieldProps = TextFieldProps & {
  label: string;
};

// interface FormTextFieldProps extends TextFieldProps{
//     variant?:"filled"|"standard"|"outlined",
//     label:string,
//     // children:React.ReactNode
// }

interface AppButtonProps extends ButtonProps {
  color?: "primary" | "secondary" | "success" | "error";
  variant?: "contained" | "outlined" | "text";
  size?: "small" | "medium" | "large";
}

interface ReusableDatePickerProps{
    value:string|null,
    label?:string,
    onChange:(value:string)=>void
}

interface CheckboxGroupProps {
  label: string;
  options: string[];
  value?: string[]; // selected options
  onChange: (newValue: string[]) => void;
}


export const FieldTitle:React.FC<FieldTitleProps>=({
    variant="h2",
    color="primary",
   
    children,
    ...rest
})=>{
    return (
        <Typography color={color} variant={variant} sx={{fontFamily:"monospace" ,m:2}} {...rest}>{children}</Typography>
    )
}

export const FormTextField:React.FC<FormTextFieldProps>=({
    variant="filled",
    // children,
    ...rest
})=>{
    return (
        <TextField variant={variant} sx={{fontFamily:"monospace",m:2}} {...rest}/>
    )
}


// Define props with defaults


export const AppButton: React.FC<AppButtonProps> = ({
  color = "primary",
  variant = "contained",
  size = "medium",
  children,
  ...rest
}) => {
  return (
    <Button
      color={color}
      variant={variant}
      size={size}
      sx={{ borderRadius: 2, textTransform: "none", m:2,fontWeight: 600 }}
      {...rest} // allow additional props like onClick
    >
      {children}
    </Button>
  );
};


export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ label, options, value=[], onChange }) => {
  const handleChange=(option:string)=>{
    
    if(value?.includes(option)){
        onChange(value.filter((f)=>f!==option))
    }
    else{
        onChange([...value,option])
    }
  }

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <FormGroup>
        {options.map((option) => (
          <FormControlLabel
            key={option}
            control={
              <Checkbox
                checked={value?.includes(option)}
                onChange={() => handleChange(option)}
              />
            }
            label={option}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};



export const ReusableDatePicker:React.FC<ReusableDatePickerProps>=({
    value,label,onChange
})=>{
    return (
        
        <DatePicker value={value?dayjs(value):null} sx={{color:"primary"}}label={label} onChange={(newValue:Dayjs|null)=>
            onChange(newValue?newValue.format("YYYY-MM-DD"):"")
        }/>
    )
}