import { Backdrop, MenuItem, Box, Fade, Modal, FormHelperText } from "@material-ui/core";
import { useTheme } from './style';
import Button from '../../components/Button';
import Input from "../../components/InputTitle";
import Select from '../../components/SelectTitle';
import { listStatus, listRoleId, role } from '../../constants/listRole';
import PropTypes from "prop-types";
import { ADD, UPDATE } from '../../constants/category';
import { Add, Edit, Clear } from '@material-ui/icons';

const ModalComponent = (props) => {
  const {
    isOpen,
    onCancel,
    onUpdate,
    valueInput,
    onChangeInput,
    onChangeSelect,
    errorName,
    errorEmail,
    errorDepartment,
    errorRole,
    errorStatus,
    handleClose,
    department,
    action
  } = props;

  const classes = useTheme();

  return (
    <Modal
      className={classes.modal}
      open={isOpen}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpen} >
        <Box className={classes.paper} >
          <form>
            <Box className={classes.boxSelect}>
              <Input
                id="outlined-basic"
                variant="outlined"
                name='email'
                title="Email"
                valueInput={valueInput.email}
                handleChangeInput={(e) => onChangeInput('EMAIL', e)}
                idInput="email"
                typeInput="email"
                type={true}
              />
              <FormHelperText className={classes.error}>{errorEmail}</FormHelperText>
            </Box>
            <Box className={classes.boxInput}>
              <Input
                id="outlined-basic"
                variant="outlined"
                name='name'
                title="Name"
                valueInput={valueInput.name}
                handleChangeInput={(e) => onChangeInput('NAME', e)}
                idInput="name"
                typeInput="text"
                type={true}
              />
              <FormHelperText className={classes.error}>{errorName}</FormHelperText>
            </Box>
            <Box className={classes.boxInput}>
              <Select
                name='deparment'
                title="Deparment"
                handleChangeSelect={(e) => onChangeSelect('DEPARMENT', e)}
                valueSelect={valueInput.deparment}
                idSelect="deparment"
                type={true}
              >
                {department?.map((item) =>
                  <MenuItem key={item.id} value={item.name}>{item.name}</MenuItem>
                )}
              </Select>
              <FormHelperText className={classes.error}>{errorDepartment}</FormHelperText>
            </Box>
            <Box className={classes.boxInput}>
              <Select
                name='role'
                title="Role"
                handleChangeSelect={(e) => onChangeSelect('ROLE', e)}
                valueSelect={valueInput.role_id}
                idSelect="role"
                type={true}
              >
                <MenuItem name="role" value={listRoleId.admin}>{role(listRoleId.admin)}</MenuItem>
                <MenuItem name="role" value={listRoleId.manage}>{role(listRoleId.manage)}</MenuItem>
                <MenuItem name="role" value={listRoleId.user}>{role(listRoleId.user)}</MenuItem>
              </Select>
              <FormHelperText className={classes.error}>{errorRole}</FormHelperText>
            </Box>
            <Box className={classes.boxInput}>
              <Select
                name='status'
                title="Status"
                handleChangeSelect={(e) => onChangeSelect('STATUS', e)}
                valueSelect={valueInput.status}
                idSelect="status"
                type={true}
              >
                <MenuItem value={listStatus.active}>{listStatus.active}</MenuItem>
                <MenuItem value={listStatus.inActive}>{listStatus.inActive}</MenuItem>
              </Select>
              <FormHelperText className={classes.error}>{errorStatus}</FormHelperText>
            </Box>
          </form>
          <Box className={classes.buttonModal}>
            <Box display='flex' gap='20px' justifyContent='space-around'>
              <Button title='Cancel' color='default' onClick={onCancel} startIcon={<Clear />} />
              <Button
                title={action === ADD ? ADD : UPDATE}
                type='submit'
                onClick={onUpdate}
                startIcon={action === ADD ? (<Add />) : (<Edit />)}
              />
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  )
}

ModalComponent.propTypes = {
  errorName: PropTypes.string,
  errorEmail: PropTypes.string,
  errorDepartment: PropTypes.string,
  errorRole: PropTypes.string,
  errorStatus: PropTypes.string,
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
  onUpdate: PropTypes.func,
  onChangeInput: PropTypes.func,
  onChangeSelect: PropTypes.func,
  valueInput: PropTypes.object,
  department: PropTypes.array,
  action: PropTypes.string
};

export default ModalComponent;
