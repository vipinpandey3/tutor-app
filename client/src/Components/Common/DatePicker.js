import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import React from "react";

export default function DatePicker(props) {
  const { name, value, label, onChange } = props;

  const convertToDefaultPara = (name, value) => ({
    target: {
      name,
      value,
    },
  });

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        inputVariant="outlined"
        label={label}
        format="yyyy/MM/dd"
        name={name}
        value={value}
        onChange={(date) => onChange(convertToDefaultPara(name, date))}
      />
    </MuiPickersUtilsProvider>
  );
}


// import TextField from '@mui/material/TextField';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import DatePicker from '@mui/lab/DatePicker';

// export default function BasicDatePicker(props) {
//   const { name, value, label, onChange } = props;

//   // const [value, setValue] = React.useState(null);

//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <DatePicker
//         label={label}
//         value={value}
//         onChange={onChange}
//         renderInput={(params) => <TextField {...params} />}
//         name={name}
//       />
//     </LocalizationProvider>
//   );
// }
