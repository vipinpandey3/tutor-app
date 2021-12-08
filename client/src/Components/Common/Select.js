import {
  FormControl,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
} from "@material-ui/core";
import React from "react";

export default function Select(props) {
  const { name, label, value, error = null, onChange, options } = props;
  return (
    <FormControl
      variant="outlined"
      {...(error && { error: true, helpertext: error })}
    >
      <InputLabel id="select-label-text">{label}</InputLabel>
      <MuiSelect label={label} name={name} labelId="select-label-text" id="select-helper" value={value} onChange={onChange}>
        <MenuItem value="">None</MenuItem>
        {options.map((item, index) => {
          return (
            <MenuItem key={index} value={item.type}>
              {item.type}
            </MenuItem>
          );
        })}
      </MuiSelect>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}
