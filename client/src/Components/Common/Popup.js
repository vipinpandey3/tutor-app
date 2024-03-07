import {
  Dialog,
  DialogContent,
  DialogTitle,
  makeStyles,
  Typography,
  DialogActions
} from "@material-ui/core";
import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import ActionButton from "./ActionButton";
import Button from '@mui/material/Button';

const useStyle = makeStyles((theme) => ({
  dialogWrapper: {
    padding: theme.spacing(2),
    position: "absolute",
    top: theme.spacing(5),
  },
  dialogTitle: {
    paddingRight: "0px",
  },
  title: {
    display: "flex",
  },
}));

export default function Popup(props) {
  const { title, children, openPopup, setOpenPopup, handleSuccess } = props;
  const classes = useStyle();

  return (
    <Dialog
      open={openPopup}
      maxWidth="xs"
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      classes={{ paper: classes.dialogWrapper }}
    >
      <DialogTitle className={classes.dialogTitle}>
        <div className={classes.title}>
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <ActionButton
            color="secondary"
            onClick={() => setOpenPopup(false)}
          >
            <CloseIcon />
          </ActionButton>
        </div>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions>
        <Button autoFocus onClick={() => setOpenPopup(false)}>
          Cancel
        </Button>
        <Button onClick={handleSuccess}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
}
