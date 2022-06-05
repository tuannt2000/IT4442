import { makeStyles } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import Background from '../../assets/img/backg.png';

export const useThemes = makeStyles(theme => ({
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    background: `linear-gradient( rgba(0, 0, 0, .6), rgba(0, 0, 0, .6)), url(${Background})`,
    backgroundSize: 'cover',
  },

  rightPadding: {
    padding: '0 150px 0 0px'
  },

  button: {
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.light
    },
    marginTop: theme.spacing(10),
    marginLeft: theme.spacing(4),
    width: '5%',
    height: 57
  },

  input: {
    width: "80%",
    marginTop: theme.spacing(10),
    '&:hover': {
      boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
      borderRadius: 7,
      border: 'none',
    },
  },

  right: {
    padding: "70px 0px 100px 0px",
    borderRadius: 5,
    backgroundColor: 'white',
    boxShadow: '0 0 30px 0 rgba(0, 0, 0, 0.35)',
    height: '80%',
    width: '80%',
    textAlign: 'center',
  },

  singGG: {
    width: '75%',
    marginTop: theme.spacing(8),
  },

  signinText: {
    fontSize: '30px',
    fontWeight: 'bold'
  },

  error: {
    position: "absolute",
    bottom: theme.spacing(-6),
    left: theme.spacing(9),
    color: red[500],
  },

  boxSelect: {
    position: "relative",
    justifyContent: "center",
    textAlign: "center"
  },

  forgotPass: {
    paddingTop: theme.spacing(4),
  },

  form: {
    width: '100%',
    padding: '0px 40px',
    display: 'inline-block',
    boxZizing: 'border-box',
    textAlign: 'center'
  },

  reset: {
    backgroundColor: theme.palette.primary.light,
    '&:hover': {
      backgroundColor: theme.palette.primary.main
    },
    marginTop: theme.spacing(6),
    width: '80%',
  },

}));
