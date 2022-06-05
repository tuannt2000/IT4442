import { Box, TextField } from "@material-ui/core";
import ButtonComponent from "../../components/Button";
import { useTheme } from "./style";
import PropTypes from "prop-types";
import { Add, Home } from "@material-ui/icons";

const Search = (props) => {
  const { valueSearch, handleChangeInput, handleAddUser, goBack } = props;
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
        name="ADD"
        title="Add"
        className={classes.button}
        onClick={handleAddUser}
        startIcon={<Add />}
      />
      <ButtonComponent
        name="home"
        title="Home"
        className={classes.button}
        startIcon={<Home />}
        onClick={goBack}
      />
    </Box>
  );
};

Search.propTypes = {
  valueSearch: PropTypes.string,
  handleChangeInput: PropTypes.func,
  handleSearch: PropTypes.func,
  handleAddUser: PropTypes.func,
};

export default Search;
