import Input from '../../components/Input';
import Button from '../../components/Button';
import { useThemes } from './style';
import { Grid, Box, CircularProgress, FormHelperText } from '@material-ui/core';
import Title from '../../components/Title';
import PropTypes from 'prop-types';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';

const FormComponent = (props) => {
  const {
    value,
    onChange,
    isLoading,
    handleClick,
    errorComfirm,
    errorPassword,
    errorNewPassword,
    handleBack,
    touchedPassword,
    touchednewPassword,
    touchedConfirm,

  } = props;
  const classes = useThemes();
  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
    >
      <Box className={classes.right}>
        <Title
          className={classes.signinText}
          title='Change Your Password'
          variant='h5'
        />
        <Box className={classes.form}>
          <Grid
            container
            justifyContent="center"
            component='div' className={classes.boxSelect}
          >
            <Input
              className={classes.input}
              id="outlined-basic-1"
              label="Old password"
              variant="outlined"
              name='password'
              type='password'
              value={value.password}
              onChange={onChange}
            />
            <FormHelperText className={classes.error} >{touchedPassword && errorPassword}</FormHelperText>
          </Grid>
          <Grid
            container
            justifyContent="center"
            component='div' className={classes.boxSelect}
          >
            <Input
              className={classes.input}
              id="outlined-basic-2"
              label="New password"
              variant="outlined"
              name='newPassword'
              type='password'
              value={value.newPassword}
              onChange={onChange}
            />
            <FormHelperText className={classes.error} >{touchednewPassword && errorNewPassword}</FormHelperText>
          </Grid>
          <Grid
            container
            justifyContent="center"
            component='div' className={classes.boxSelect}
          >
            <Input
              className={classes.input}
              id="outlined-basic"
              label="Confirm password"
              variant="outlined"
              name='newPasswordConfirm'
              type='password'
              value={value.newPasswordConfirm}
              onChange={onChange}
            />
            <FormHelperText className={classes.error} >{touchedConfirm && errorComfirm}</FormHelperText>
          </Grid>
          <Button
            onClick={handleClick}
            className={classes.reset}
            type="submit"
            title={isLoading ? (<CircularProgress />) : 'Change Password'}
          />
          <Button
            className={classes.goback}
            onClick={handleBack}
            color='default'
            title='Back'
            startIcon={<KeyboardReturnIcon />}
          />
        </Box>
      </Box>
    </Grid>
  )
}

FormComponent.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func,
  isLoading: PropTypes.bool,
  handleClick: PropTypes.func,
  errorComfirm: PropTypes.string,
  errorPassword: PropTypes.string,
  errorNewPassword: PropTypes.string,
  handleBack: PropTypes.func,
}

export default FormComponent;