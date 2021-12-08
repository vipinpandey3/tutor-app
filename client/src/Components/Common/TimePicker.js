import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {TimePicker as MuiTimePicker} from '@mui/lab';

export default function TimePicker(props) {
  const {value, onChange, name, label} = props

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MuiTimePicker
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}