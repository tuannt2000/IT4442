import React, { useState, useEffect } from "react";
import Search from "./Search";
import List from "./List";
import { useTheme } from "./style";
import { Box } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import Layout from "../../layouts/Layout";
import Message from "../../components/Message";
import Modal from "./ModalAddUpdate";
import Title from "../../components/Title";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategory,
  postCategory,
  putCategory,
  searchCategory,
} from "../../redux/actions/category";
import { getListAssignee } from "../../redux/actions/user";
import { ADD, NAME, ENABLE, DISABLE } from "../../constants/category";
import { useHistory } from "react-router-dom";
import { TITLE_LIST_CATEGORY } from "../../constants/listTitle";

const ListCategory = () => {
  const classes = useTheme();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.list.data);
  const assignee = useSelector((state) => state.user.listAssignee);
  const history = useHistory();

  const [rows, setRows] = useState([]);
  const [valueAutocomplate, setValueAutocomplate] = useState();
  const [isModal, setModal] = useState(false);
  const [valueSearch, setValueSearch] = useState("");
  const [action, setAtion] = useState("");
  const [valueForm, setValueForm] = useState();
  const [infoMessage, setInfoMessage] = useState({
    isOpen: false,
    status: "",
    message: "",
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: valueForm?.name || "",
      assignee: valueForm?.assignee || "",
      description: valueForm?.description || "",
      status: valueForm?.status || "",
      assigneeId: valueForm?.assigneeId || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name cannot be blank!"),
      assignee: Yup.string().required("Assignee cannot be blank!"),
      status: Yup.string().required("Status cannot be blank!"),
      assigneeId: Yup.string().required("Required!"),
      description: Yup.string().required("Please add description!"),
    }),
    onSubmit: (values) => {
      const newValue = {
        assignee: values.assignee,
        user_id: values.assigneeId,
        description: values.description,
        name: values.name,
        status: values.status === ENABLE ? 1 : 0,
      };
      if (action === ADD) {
        dispatch(
          postCategory(
            newValue,
            (message) => onSuccess(message),
            (message) => onError(message)
          )
        );
      } else {
        dispatch(
          putCategory(
            { id: valueForm.id, data: newValue },
            (message) => onSuccess(message),
            (message) => onError(message)
          )
        );
      }
    },
  });

  useEffect(() => {
    document.title = TITLE_LIST_CATEGORY;
    dispatch(getCategory());
    dispatch(getListAssignee());
  }, [dispatch]);

  useEffect(() => {
    setRows(
      categories?.data.map((category) => ({
        ...category,
        id: category.id,
        name: category.name,
        description: category.description,
        assignee: category.users[0]?.name,
        status: category.status === 0 ? DISABLE : ENABLE,
      }))
    );
  }, [categories]);

  const onError = (message) => {
    setInfoMessage({
      isOpen: true,
      message: message,
      status: "error",
    });
  };

  const onSuccess = (message) => {
    setInfoMessage({
      isOpen: true,
      message: message,
      status: "success",
    });
    setModal(false);
    action === ADD ?
      dispatch(getCategory()) :
      dispatch(searchCategory({ keyword: valueSearch, page: categories?.current_page }))
  };

  const handleClose = () => {
    setInfoMessage({ isOpen: false });
  };

  const handleChangePagination = (event, pageNumber) => {
    dispatch(searchCategory({ keyword: valueSearch, page: pageNumber }));
  };

  const handleChangeInput = (e) => {
    const val = e.target.value;
    setValueSearch(val);
    dispatch(searchCategory({ keyword: val }));
  };

  const onChangeSelect = (e) => {
    const val = e.target.value;
    formik.setFieldValue("status", val);
    setValueForm({
      ...valueForm,
      status: val,
    });
  };

  const handleInputModal = (action, event) => {
    const val = event.target.value;
    if (action === NAME) {
      setValueForm({
        ...valueForm,
        name: val,
      });
    } else {
      setValueForm({
        ...valueForm,
        description: val,
      });
    }
  };

  const handleAutocomplate = (e, value) => {
    const id = value.id;
    const assignee = value.name;
    setValueForm({
      ...valueForm,
      assignee: assignee,
      assigneeId: id,
      status: ENABLE,
    });
  };

  const close = () => {
    setModal(false);
  };

  const handleAddUser = (action) => {
    setValueForm({});
    setValueAutocomplate({});
    formik.resetForm();
    setAtion(action);
    setModal(true);
  };

  const onHandleChooseRow = (row, action) => {
    setValueForm({
      name: row.name,
      assignee: row.assignee,
      description: row.description,
      status: row.status,
      assigneeId: row.users[0].user_id,
      id: row.id
    });
    setModal(true);
    const valueAutocomplate = assignee.filter(
      (item) => item.id === row.users[0].user_id
    );
    setValueAutocomplate(valueAutocomplate[0]);
    setAtion(action);
  };

  const goBack = () => {
    history.push('/');
  };

  return (
    <Layout>
      <Box p={10} className={classes.root}>
        <Box p={5} className={classes.main}>
          <Title title="List Category" variant="h6" align="center" />
          <Box className={classes.header}>
            <Search
              valueSearch={valueSearch}
              handleChangeInput={handleChangeInput}
              handleAddUser={() => handleAddUser(ADD)}
              goBack={goBack}
            />
          </Box>
          <Box className={classes.wapperTable}>
            <List
              page={+categories?.current_page}
              rows={rows}
              onHandleChooseRow={onHandleChooseRow}
            />
          </Box>
          <Pagination
            count={categories?.last_page}
            page={+categories?.current_page}
            onChange={handleChangePagination}
            color="primary"
            className={classes.pagination}
          />
        </Box>
        <Modal
          defaultvalue={valueAutocomplate}
          action={action}
          assignee={assignee}
          handleAutocomplate={handleAutocomplate}
          values={formik.values}
          isOpen={isModal}
          onCancel={close}
          onChangeSelect={onChangeSelect}
          onChangeInput={handleInputModal}
          onUpdate={formik.handleSubmit}
          errorName={formik.errors.name}
          errorDescription={formik.errors.description}
          errorAssignee={formik.errors.assignee}
          errorStatus={formik.errors.status}
          valueAssignee={formik.values.assignee}
          handleClose={close}
        />
        <Message
          open={infoMessage.isOpen}
          handleClose={handleClose}
          status={infoMessage.status}
          title={infoMessage.message}
        />
      </Box>
    </Layout>
  );
};
export default ListCategory;
