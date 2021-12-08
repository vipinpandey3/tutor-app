import React from 'react'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


const MultiSelect = (props) => {
    const { value, onChange, options, label } = props
    return (
        <div>
            <FormControl>
                <InputLabel id="multiple-checkbox-label">{label}</InputLabel>
                <Select
                  labelId="multiple-checkbox-label"
                  id="multiple-checkbox"
                  multiple
                  value={value}
                  onChange={onChange}
                  input={<OutlinedInput label="Tag" />}
                  renderValue={(selected) => selected.join(', ')}
                  MenuProps={MenuProps}
                >
                {
                  options.length > 0 && options.map((option) => (
                    <MenuItem key={option.id} value={option.type}>
                      <Checkbox checked={value.indexOf(option) > -1} />
                      <ListItemText primary={option.type} />
                    </MenuItem>
                  ))
                }
                </Select>
            </FormControl>
        </div>
    )
}

export default MultiSelect
