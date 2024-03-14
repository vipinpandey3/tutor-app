import React from 'react';
import TextField from '@material-ui/core/TextField';

const TextArea = ({ label, value, onChange }) => {
  return (
    <TextField
      label={label}
      multiline
      rows={4}
      variant="outlined"
      value={value}
      onChange={onChange}
      fullWidth
    />
  );
};

export default TextArea;
