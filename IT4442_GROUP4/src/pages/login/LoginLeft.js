import Logo from '../../assets/img/login.png';
import { Grid, Box } from '@material-ui/core';
import { useThemes } from './style';
import Title from '../../components/Title';

const LoginLeft = () => {
  const classes = useThemes();
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
    >
      {/* <Box className={classes.logoLogin}>
        <Title className={classes.welcame} variant='h4' title='Electric Task Management' /> */}
        {/* <img alt="#" src={Logo} className={classes.img} /> */}
      {/* </Box> */}
    </Grid>
  )
}

export default LoginLeft;
