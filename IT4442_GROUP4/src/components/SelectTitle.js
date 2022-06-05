import {
  Box,
  FormHelperText,
  makeStyles,
  OutlinedInput,
  Paper,
  Select,
} from "@material-ui/core";
import Title from "./Title";
import PropTypes from "prop-types";
import { red } from "@material-ui/core/colors";
const useTheme = makeStyles((theme) => ({
  box: {
    width: "100%",
  },
  title: {
    display: "inline-block",
    width: "40%",
    height: "100%",
  },
  boxSelect: {
    width: "60%",
    position: "relative",
  },
  input: {
    display: "inline-block",
    height: "100%",
    width: "100%",
  },
  error: {
    position: "absolute",
    bottom: theme.spacing(-5),
    left: "0",
    color: red[500],
  },
  select: {
    width: "unset",
    height: "100%",
  },
  list: {
    maxHeight: theme.spacing(75),
  },
}));
const SelectTitle = (props) => {
  const {
    type,
    title,
    children,
    handleChangeSelect,
    valueSelect,
    idSelect,
    style,
    error,
    name,
    isDisabled,
  } = props;
  const classes = useTheme();
  return type === true ? (
    <Box
      display="flex"
      direction="row"
      justifyContent="center"
      alignItems="center"
      className={classes.box}
    >
      <Title title={title} variant="h6" className={classes.title} />
      <Box className={classes.boxSelect}>
        <Select
          className={classes.input}
          classes={{ root: classes.select }}
          value={valueSelect}
          onChange={handleChangeSelect}
          id={idSelect}
          input={<OutlinedInput />}
          MenuProps={{ classes: { paper: classes.list } }}
          defaultValue=""
          name={name}
          disabled={isDisabled}
        >
          {children}
        </Select>
        <FormHelperText className={classes.error}>{error}</FormHelperText>
      </Box>
    </Box>
  ) : (
    <Paper elevation={0} className={style}>
      <Title title={title} />
      <Select
        MenuProps={{ classes: { paper: classes.list } }}
        value={valueSelect}
        onChange={handleChangeSelect}
        id={idSelect}
        input={<OutlinedInput />}
        fullWidth
        defaultValue=""
      >
        {children}
      </Select>
    </Paper>
  );
};

SelectTitle.propTypes = {
  type: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  style: PropTypes.node,
  handleChangeSelect: PropTypes.func.isRequired,
  valueSelect: PropTypes.node,
  idSelect: PropTypes.string,
  error: PropTypes.string,
  isDisabled: PropTypes.bool,
};

export default SelectTitle;
