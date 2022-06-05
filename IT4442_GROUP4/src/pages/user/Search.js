import { Box, TextField } from "@material-ui/core";
import ButtonComponent from "../../components/Button";
import { useTheme } from "./style";
import PropTypes from "prop-types";
import { Home, Add } from "@material-ui/icons";

const Header = (props) => {
  const { valueSearch, handleChangeInput, handleAddUser, goHome } = props;
  const classes = useTheme();
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      gridGap="45px"
      height="100%"
    >
      <TextField
        className={classes.input}
        variant="outlined"
        placeholder="Search by name..."
        value={valueSearch}
        onChange={handleChangeInput}
      />
      <ButtonComponent
        title="Add"
        className={classes.button}
        onClick={handleAddUser}
        startIcon={<Add />}
      />
      <ButtonComponent
        name="Return"
        title="Home"
        className={classes.button}
        startIcon={<Home />}
        onClick={goHome}
      />
    </Box>
  );
};

Header.propTypes = {
  valueSearch: PropTypes.string,
  handleChangeInput: PropTypes.func,
  handleAddUser: PropTypes.func,
  goBack: PropTypes.func,
};

export default Header;
