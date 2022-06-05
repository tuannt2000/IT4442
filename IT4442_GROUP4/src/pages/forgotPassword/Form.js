import Input from '../../components/Input';
import Button from '../../components/Button';
import { useThemes } from './style';
import { Grid, Box, FormHelperText, CircularProgress } from '@material-ui/core';
import Title from '../../components/Title';
import PropTypes from 'prop-types';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

const FormComponent = (props) => {
  const {
    valueEmail,
    onChangeEmail,
    errorEmail,
    handleClick,
    isLoading
  } = props;
  const classes = useThemes();
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <Box className={classes.right}>
        <Title
          className={classes.signinText}
          title='Find your account'
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
              label="Email"
              variant="outlined"
              name='email'
              type='email'
              value={valueEmail}
              onChange={onChangeEmail}
            />
            <FormHelperText className={classes.error} >{errorEmail}</FormHelperText>
            <Button
              className={classes.button}
              onClick={handleClick}
              type="submit"
              title={isLoading ? (
                <CircularProgress color="inherit" size={27} />
              ) : (
                <MailOutlineIcon />
              )}
            />
          </Grid>
        </Box>
      </Box>
    </Grid>
  )
}

FormComponent.propTypes = {
  valueEmail: PropTypes.string,
  onChangeEmail: PropTypes.func,
  errorEmail: PropTypes.string,
  handleClick: PropTypes.func,
  isLoading: PropTypes.bool,
}

export default FormComponent;
