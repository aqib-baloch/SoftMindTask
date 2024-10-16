import { TextField, Typography } from "@mui/material";
import React from "react";

const GlobalInput = ({
  color = "primary",
  name = "textfield",
  label = "TextField",
  type = "text",
  onChange,
  onBlur,
  value,
  helperText,
}) => {
  return (
    <TextField
      name={name}
      value={value}
      type={type}
      label={label}
      color={color}
      onChange={onChange}
      onBlur={onBlur}
      helperText={
        <Typography sx={{ fontSize: "15px", color: "#f84d4d" }}>
          {helperText}
        </Typography>
      }
      sx={{ width: "100%", marginBottom: 2 }}
    />
  );
};

export default GlobalInput;
