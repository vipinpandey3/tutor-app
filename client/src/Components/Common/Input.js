import { makeStyles, TextField } from "@material-ui/core";
import React from "react";

const useStyles= makeStyles((theme) => ({
  inputField: {
    '& .MuiOutlinedInput-input': {
      // margin: "10px 0 0 0",
      // padding: 'px 14px',
      // height: "19px"22px
    }
  }
}))

const Input = (props) => {
  // const { value, onChange, type, placeHolder, className } = props;
  const styles = useStyles()
  const { name, label, value, onChange, error = null, size, ...other } = props;
  return (
    // <input
    //   value={value}
    //   onChange={onChange}
    //   type={type}
    //   placeholder={placeHolder}
    //   className={className}
    // />
    <TextField
      variant="outlined"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      siza={size}
      {...other}
      className={styles.inputField}
      {...(error && { error: true, helperText: error })}
    />
  );
};

export default Input;
