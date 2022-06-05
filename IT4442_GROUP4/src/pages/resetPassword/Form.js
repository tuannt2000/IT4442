import Input from '../../components/Input';
import Button from '../../components/Button';
import { useThemes } from './style';
import { Grid, Box, CircularProgress, FormHelperText } from '@material-ui/core';
import Title from '../../components/Title';
import PropTypes from 'prop-types';

const FormComponent = (props) => {
  const {
    value,
    onChangePassword,
    isLoading,
    errorPassword,
    handleClick,
    handleBack,
    errorConfirm,
    touchedPassword,
    touchedPasswordConfirm
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
          title='New your password'
          variant='h5'
        />
        <Box className={classes.form}>
          <Grid
            component='div'
            className={classes.boxSelect}
          >
            <Input
              className={classes.input}
              id="outlined-basic"
              label="New password"
              variant="outlined"
              name='password'
              type='password'
              value={value.password}
              onChange={onChangePassword}
            />
            <FormHelperText className={classes.error} >{touchedPassword && errorPassword}</FormHelperText>
          </Grid>
          <Grid
            component='div'
            className={classes.boxSelect}
          >
            <Input
              className={classes.input}
              id="outlined-basic-2"
              label="Confirm password"
              variant="outlined"
              name='passwordConfirm'
              type='password'
              value={value.passwordConfirm}
              onChange={onChangePassword}
            />
            <FormHelperText className={classes.error} >{touchedPasswordConfirm && errorConfirm}</FormHelperText>
          </Grid>
          <Button
            onClick={handleClick}
            className={classes.reset}
            type="submit"
            title={isLoading ? (<CircularProgress color="inherit" size={27} />) : 'Reset Password'}
          />
          <Button
            className={classes.goback}
            onClick={handleBack}
            title='Login'
          />
        </Box>
      </Box>
    </Grid>
  )
}

FormComponent.propTypes = {
  value: PropTypes.object,
  onChangePassword: PropTypes.func,
  errorPassword: PropTypes.string,
  handleClick: PropTypes.func,
  handleBack: PropTypes.func,
  errorConfirm: PropTypes.string,
  isLoading: PropTypes.bool
}

export default FormComponent;