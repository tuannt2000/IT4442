import { Backdrop, Box, Fade, FormHelperText, MenuItem, Modal, TextField } from "@material-ui/core";
import { useTheme } from './style';
import PropTypes from "prop-types";
import Button from '../../components/Button';
import Input from "../../components/InputTitle";
import Select from '../../components/SelectTitle';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Title from '../../components/Title';
import { statusCategory } from '../../constants/listRole';
import { Add, Edit, Clear } from '@material-ui/icons';
import { ADD } from '../../constants/category';

const ModalComponent = (props) => {
  const classes = useTheme();
  const {
    isOpen,
    handleClose,
    values,
    action,
    assignee,
    handleAutocomplate,
    errorName,
    errorDescription,
    errorAssignee,
    errorStatus,
    onUpdate,
    onCancel,
    onChangeInput,
    onChangeSelect,
    defaultvalue
  } = props;

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
            <Box className={classes.inputName}>
              <Input
                id="outlined-basic"
                variant="outlined"
                name='name'
                title="Name"
                valueInput={values.name}
                handleChangeInput={(e) => onChangeInput('NAME', e)}
                idInput="name"
                typeInput="text"
                type={true}
              />
              <FormHelperText className={classes.error}>{errorName}</FormHelperText>
            </Box>
            <Box className={classes.boxInputAra}>
              <Title variant="h6" title='Description' />
              <TextField
                className={classes.textAra}
                id="outlined-multiline-static"
                multiline
                minRows={4}
                variant="outlined"
                name='description'
                value={values.description}
                onChange={(e) => onChangeInput('DESCRIPTION', e)}
              />
              <FormHelperText className={classes.error}>{errorDescription}</FormHelperText>
            </Box>
            <Box className={classes.Autocomplete}>
              <Title title='Assignee' variant="h6" className={classes.title} />
              <Autocomplete
                name='assignee'
                onChange={handleAutocomplate}
                id="assignee"
                options={assignee}
                getOptionLabel={(option) => option.name}
                defaultValue={defaultvalue}
                style={{ width: 385 }}
                renderInput={
                  (params) => <TextField {...params} className={classes.inputAuto} variant="outlined" />}
              />
              <FormHelperText className={classes.error}>{errorAssignee}</FormHelperText>
            </Box>
            <Box className={classes.boxInput}>
              <Select
                id='status'
                name='status'
                title="Status"
                handleChangeSelect={onChangeSelect}
                valueSelect={values.status}
                idSelect="Status"
                type={true}
              >
                <MenuItem value={statusCategory.disabled}>{statusCategory.disabled}</MenuItem>
                <MenuItem value={statusCategory.enable}>{statusCategory.enable}</MenuItem>
              </Select>
              <FormHelperText className={classes.error}>{errorStatus}</FormHelperText>
            </Box>
          </form>
          <Box className={classes.buttonModal}>
            <Box display='flex' gap='20px' justifyContent='space-around'>
              <Button title='Cancel' color='default' onClick={onCancel} startIcon={<Clear />} />
              <Button
                title={action === ADD ? 'Add' : 'Update'}
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
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
  values: PropTypes.object,
  action: PropTypes.string,
  assignee: PropTypes.array,
  handleAutocomplate: PropTypes.func,
  errorName: PropTypes.string,
  errorDescription: PropTypes.string,
  errorAssignee: PropTypes.string,
  errorStatus: PropTypes.string,
  onUpdate: PropTypes.func,
  onCancel: PropTypes.func,
  onChangeInput: PropTypes.func,
  onChangeSelect: PropTypes.func,
  defaultvalue: PropTypes.object
}

export default ModalComponent;
