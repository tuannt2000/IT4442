import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";
import Button from "../../../components/Button";
import { useTheme } from "./style";

const ModalDelete = (props) => {
  const { open, handleDisagreeDelete, handleAgreeDelete } = props;
  const classes = useTheme();
  return (
    <Dialog open={open} keepMounted onClose={handleDisagreeDelete}>
      <DialogTitle id="alert-dialog-slide-title">Delete request</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Do you want delete this request?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          title="Disagree"
          onClick={handleDisagreeDelete}
          color="default"
          variant="text"
          className={classes.btn}
        />
        <Button
          title="Agree"
          onClick={handleAgreeDelete}
          color="primary"
          variant="text"
          className={classes.btn}
        />
      </DialogActions>
    </Dialog>
  );
};

ModalDelete.propTypes = {
  open: PropTypes.bool,
  handleDisagreeDelete: PropTypes.func,
  handleAgreeDelete: PropTypes.func,
};

export default ModalDelete;
