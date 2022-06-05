import {
  Backdrop,
  Box,
  CircularProgress,
  Fade,
  MenuItem,
  Modal,
} from "@material-ui/core";
import Button from "../../../components/Button";
import SelectTitle from "../../../components/SelectTitle";
import { useTheme } from "./style";
import PropTypes from "prop-types";
import { levelOfRequest, statusRequest } from "../../../constants/request";
import EditIcon from "@material-ui/icons/Edit";
import ClearIcon from "@material-ui/icons/Clear";

const ModalUpdate = (props) => {
  const {
    listCategory,
    listAssignee,
    isLoading,
    isOpen,
    handleCloseModal,
    handleChange,
    status,
    statusValue,
    statusError,
    level,
    levelValue,
    levelError,
    category,
    categoryValue,
    assignee,
    assigneeValue,
    assigneeError,
    handleSubmitModal,
  } = props;
  const classes = useTheme();

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
          {/* STATUS_REQUEST */}
          <Box>
            <SelectTitle
              type={true}
              title="Status"
              idSelect="status_request"
              name={status}
              valueSelect={statusValue}
              handleChangeSelect={handleChange}
              error={statusError}
            >
              {statusRequest.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </SelectTitle>
          </Box>
          {/* PRIORITY */}
          <Box>
            <SelectTitle
              type={true}
              title="Priority"
              idSelect="level"
              name={level}
              valueSelect={levelValue}
              handleChangeSelect={handleChange}
              error={levelError}
            >
              {levelOfRequest.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </SelectTitle>
          </Box>
          {/* CATEGORY */}
          <Box>
            <SelectTitle
              type={true}
              title="Category"
              idSelect="category"
              name={category}
              valueSelect={categoryValue}
              handleChangeSelect={handleChange}
              isDisabled={true}
            >
              {listCategory.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </SelectTitle>
          </Box>
          {/* ASSIGNEE */}
          <Box>
            <SelectTitle
              type={true}
              title="Assignee"
              idSelect="assignee"
              name={assignee}
              valueSelect={assigneeValue}
              handleChangeSelect={handleChange}
              error={assigneeError}
            >
              {listAssignee.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </SelectTitle>
          </Box>
          <Box>
            <Box display="flex" gap="20px" justifyContent="space-around">
              <Button
                className={classes.btn}
                title={
                  isLoading ? (
                    <CircularProgress size={27} color="inherit" />
                  ) : (
                    "Update"
                  )
                }
                startIcon={<EditIcon />}
                onClick={handleSubmitModal}
              />
              <Button
                className={classes.btn}
                title="Cancel"
                color="default"
                startIcon={<ClearIcon />}
                onClick={handleCloseModal}
              />
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

ModalUpdate.defaultProps = {
  listCategory: [],
  listAssignee: [],
};

ModalUpdate.propTypes = {
  listCategory: PropTypes.array,
  listAssignee: PropTypes.array,
  isOpen: PropTypes.bool,
  isLoading: PropTypes.bool,
  handleCloseModal: PropTypes.func,
  handleChange: PropTypes.func,
  status: PropTypes.string,
  statusValue: PropTypes.node,
  statusError: PropTypes.string,
  level: PropTypes.string,
  levelValue: PropTypes.node,
  levelError: PropTypes.string,
  handleSubmitModal: PropTypes.func,
};

export default ModalUpdate;
