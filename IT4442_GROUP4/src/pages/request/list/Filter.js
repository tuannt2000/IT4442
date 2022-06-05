import FilterListIcon from "@material-ui/icons/FilterList";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  useTheme,
} from "./style/filter";
import Title from "../../../components/Title";
import {
  Box,
  CircularProgress,
  MenuItem,
  Paper,
  TextField,
} from "@material-ui/core";
import InputTitle from "../../../components/InputTitle";
import SelectTitle from "../../../components/SelectTitle";
import Button from "../../../components/Button";
import PropTypes from "prop-types";
import { statusRequest } from "../../../constants/request";
import { Autocomplete } from "@material-ui/lab";
import { ADMIN } from "../../../constants/listRole";

const Filter = (props) => {
  const {
    handleChangeExpand,
    expanded,
    onHandleClearModal,
    onHandleFilterModal,
    category,
    assignee,
    user,
    isLoading,
    department,
  } = props;
  const classes = useTheme();
  const [inputSelected, setInputSelected] = useState({
    author: "",
    assignee: "",
    category: "",
    department: "",
  });
  const [form, setForm] = useState({
    name: "",
    content: "",
    due_date: "",
    status_request: " ",
    user_id: "",
    assignee: "",
    category_id: "",
    deparment_id: "",
  });

  const handleFilterModal = () => {
    onHandleFilterModal(form);
  };
  const handleClearModal = () => {
    setForm({
      name: "",
      content: "",
      due_date: "",
      status_request: " ",
      user_id: "",
      assignee: "",
      category_id: "",
      deparment_id: "",
    });
    setInputSelected({
      author: "",
      assignee: "",
      category: "",
      department: "",
    });
    onHandleClearModal(form);
  };

  const handleChange = (event) => {
    const id = event.target.id;
    const value = event.target.value;
    setForm({ ...form, [id]: value });
  };
  const handleChangeSelect = (event, key) => {
    setForm({ ...form, [key]: event.target.value });
  };
  const onChangeAutocomplete = (selected, key) => {
    selected !== null
      ? setForm({ ...form, [key]: selected.id })
      : setForm({ ...form, [key]: "" });
  };

  const onChangeInputSelect = (newValueInput, key) => {
    setInputSelected({ ...inputSelected, [key]: newValueInput });
  };

  return (
    <Accordion
      square
      expanded={expanded === "panel1"}
      onChange={handleChangeExpand("panel1")}
    >
      <AccordionSummary id="filter-btn" expandIcon={<ExpandMoreIcon />}>
        <FilterListIcon />
        <Title
          title="Filter options"
          variant="subtitle1"
          className={classes.btn__options__text}
        />
      </AccordionSummary>
      <AccordionDetails className={classes.modal}>
        <Box p={5} width="100%">
          <form className={classes.modal__form} id="modal__form">
            {/* NAME */}
            <InputTitle
              type={false}
              title="Name"
              valueInput={form.name}
              handleChangeInput={handleChange}
              idInput="name"
              style={classes.modal__form__item}
              typeInput="text"
            />
            {/* CONTENT */}
            <InputTitle
              type={false}
              title="Content"
              valueInput={form.content}
              handleChangeInput={handleChange}
              idInput="content"
              style={classes.modal__form__item}
              typeInput="text"
            />
            {/* DATE */}
            <InputTitle
              type={false}
              title="Due date"
              valueInput={form.due_date}
              handleChangeInput={handleChange}
              idInput="due_date"
              style={classes.modal__form__item}
              typeInput="date"
            />
            {/* STATUS */}
            <SelectTitle
              type={false}
              title="Status"
              valueSelect={form.status_request}
              handleChangeSelect={(event) =>
                handleChangeSelect(event, "status_request")
              }
              idSelect="status"
              style={classes.modal__form__item}
            >
              <MenuItem value=" ">Not Closed</MenuItem>
              {statusRequest.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </SelectTitle>
            {/* AUTHOR */}
            <Paper className={classes.modal__form__item} elevation={0}>
              <Title title="Author" />
              <Autocomplete
                onChange={(event, selected) =>
                  onChangeAutocomplete(selected, "user_id")
                }
                inputValue={inputSelected.author}
                onInputChange={(event, inputChange) =>
                  onChangeInputSelect(inputChange, "author")
                }
                getOptionLabel={(item) => item.name}
                id="author"
                options={user.filter((human) => human.role_id !== ADMIN)}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" />
                )}
              />
            </Paper>
            {/* ASSIGNEE */}
            <Paper className={classes.modal__form__item} elevation={0}>
              <Title title="Assignee" />
              <Autocomplete
                onChange={(event, selected) =>
                  onChangeAutocomplete(selected, "assignee")
                }
                inputValue={inputSelected.assignee}
                onInputChange={(event, inputChange) =>
                  onChangeInputSelect(inputChange, "assignee")
                }
                getOptionLabel={(item) => item.name}
                id="assignee"
                options={assignee}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" />
                )}
              />
            </Paper>
            {/* CATEGORY */}
            <Paper className={classes.modal__form__item} elevation={0}>
              <Title title="Category" />
              <Autocomplete
                onChange={(event, selected) =>
                  onChangeAutocomplete(selected, "category_id")
                }
                inputValue={inputSelected.category}
                onInputChange={(event, inputChange) =>
                  onChangeInputSelect(inputChange, "category")
                }
                getOptionLabel={(item) => item.name}
                id="category"
                options={category}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" />
                )}
              />
            </Paper>

            {/* DEPARTMENT */}
            <Paper className={classes.modal__form__item} elevation={0}>
              <Title title="Department" />
              <Autocomplete
                onChange={(event, selected) =>
                  onChangeAutocomplete(selected, "deparment_id")
                }
                inputValue={inputSelected.department}
                onInputChange={(event, inputChange) =>
                  onChangeInputSelect(inputChange, "department")
                }
                getOptionLabel={(item) => item.name}
                id="department"
                options={department}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" />
                )}
              />
            </Paper>
          </form>
        </Box>
        <Box component="div" className={classes.box__btn}>
          <Button
            title="Clear"
            color="default"
            onClick={handleClearModal}
            classes={{ root: classes.box__btn__item }}
          />
          <Button
            color="primary"
            title={
              isLoading ? (
                <CircularProgress color="inherit" size="27px" />
              ) : (
                "Filter"
              )
            }
            className={classes.box__btn__item}
            onClick={handleFilterModal}
          />
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};
Filter.defaultProps = {
  category: [],
  assignee: [],
  user: [],
  department: [],
};
Filter.propTypes = {
  handleChangeExpand: PropTypes.func.isRequired,
  expanded: PropTypes.node.isRequired,
  onHandleFilterModal: PropTypes.func,
  onHandleClearModal: PropTypes.func,
  category: PropTypes.array,
  assignee: PropTypes.array,
  user: PropTypes.array,
  isLoading: PropTypes.bool,
  department: PropTypes.array,
};

export default Filter;
