import { Button as MuiButton, makeStyles } from "@material-ui/core";
import React, { forwardRef } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0.5),
  },
  label: {
    textTransform: "none",
  },
}));

const MatButton = (props, ref) => {
  const { onClick, type, disable, ariaLabel, ariaHasPopUp, variant, color, size, ...other } = props;
  const classes = useStyles();
  return (
    <MuiButton
      aria-controls={ariaLabel}
      aria-haspopup={ariaHasPopUp}
      onClick={onClick}
      disable={disable ? disable : undefined}
      variant={variant}
      type={type}
      color={color || "primary"}
      size={size || "large"}
      {...other}
      classes={{ root: classes.root, label: classes.label }}
    >
      {props.children}
    </MuiButton>
  );
};

export default MatButton;
