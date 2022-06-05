import {
  Backdrop,
  Box,
  Fade,
  Modal,
  TextField,
  FormHelperText,
  Select,
  OutlinedInput,
  MenuItem,
  CircularProgress,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import { useTheme } from "./style";
import PropTypes from "prop-types";
import { listStatusOfDepartment } from "../../constants/department";
import Button from "../../components/Button";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import ClearIcon from "@material-ui/icons/Clear";

const ModalAddUpdate = (props) => {
  const {
    isLoading,
    isOpen,
    handleCloseModal,
    hasUpdate,
    handleChange,
    name,
    nameValue,
    nameError,
    nameTouched,
    description,
    descriptionValue,
    descriptionError,
    descriptionTouched,
    status,
    statusValue,
    handleUpdate,
    handleCreate,
  } = props;
  const classes = useTheme();

  const returnTitleButton = (condition) => {
    switch (condition) {
      case true:
        return "Update";

      case false:
        return "Add";

      default:
        return condition;
    }
  };

  return (
    <Modal
      className={classes.modal}
      open={isOpen}
      onClose={handleCloseModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpen}>
        <Box className={classes.paper}>
          <Box className={classes.inputArea}>
            <TextField
              className={classes.input}
              label="Name"
              id="title"
              variant="outlined"
              placeholder="name..."
              fullWidth
              autoFocus={true}
              name={name}
              value={nameValue}
              onChange={handleChange}
            />
            {nameTouched && (
              <FormHelperText className={classes.error}>
                {nameError}
              </FormHelperText>
            )}
          </Box>
          <Box className={classes.inputArea}>
            <TextField
              className={classes.input}
              label="Description"
              id="description"
              variant="outlined"
              placeholder="description..."
              fullWidth
              multiline
              minRows={4}
              name={description}
              value={descriptionValue}
              onChange={handleChange}
            />
            {descriptionTouched && (
              <FormHelperText className={classes.error}>
                {descriptionError}
              </FormHelperText>
            )}
          </Box>

          {hasUpdate && (
            <FormControl variant="outlined">
              <InputLabel id="statusLabel" className={classes.label}>
                Status
              </InputLabel>
              <Select
                labelId="statusLabel"
                label="Status"
                MenuProps={{ classes: { paper: classes.list } }}
                name={status}
                value={statusValue}
                onChange={handleChange}
                id="status"
                input={<OutlinedInput />}
                fullWidth
                defaultValue=""
              >
                {listStatusOfDepartment.map((item) => (
                  <MenuItem key={item.id} value={item.id.toString()}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          <Box display="flex" gap="20px" justifyContent="space-around">
            <Button
              className={classes.action}
              title="Cancel"
              color="default"
              startIcon={<ClearIcon />}
              onClick={handleCloseModal}
            />
            <Button
              className={classes.action}
              title={
                isLoading ? (
                  <CircularProgress size={27} color="inherit" />
                ) : (
                  returnTitleButton(hasUpdate)
                )
              }
              startIcon={hasUpdate ? <EditIcon /> : <AddIcon />}
              onClick={hasUpdate ? handleUpdate : handleCreate}
            />
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

ModalAddUpdate.propTypes = {
  isLoading: PropTypes.bool,
  isOpen: PropTypes.bool,
  handleCloseModal: PropTypes.func,
  hasUpdate: PropTypes.bool,
  handleChange: PropTypes.func,
  name: PropTypes.string,
  nameValue: PropTypes.string,
  nameError: PropTypes.string,
  description: PropTypes.string,
  descriptionValue: PropTypes.string,
  descriptionError: PropTypes.string,
  status: PropTypes.string,
  statusValue: PropTypes.string,
  handleUpdate: PropTypes.func,
  handleCreate: PropTypes.func,
};

export default ModalAddUpdate;
