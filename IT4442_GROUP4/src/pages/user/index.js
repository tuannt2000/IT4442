import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUser,
  postUser,
  putUser,
  searchUser,
} from "../../redux/actions/user";
import { getListDepartment } from "../../redux/actions/department";

import { Box } from "@material-ui/core";
import {
  ADD,
  NAME,
  ACTIVE,
  IN_ACTIVE,
  ROLE,
  DEPARMENT,
} from "../../constants/user";
import { Pagination } from "@material-ui/lab";
import { useTheme } from "./style";
import Title from "../../components/Title";
import Layout from "../../layouts/Layout";
import Search from "./Search";
import List from "./List";
import Modal from "./ModalAddEdit";
import Message from "../../components/Message";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { TITLE_LIST_USER } from "../../constants/listTitle";

const ListUser = () => {
  const users = useSelector((state) => state.user.user);
  const department = useSelector((state) => state.department.listDepartments);
  const dispatch = useDispatch();
  const classes = useTheme();
  const history = useHistory();

  const [valueSearch, setValueSearch] = useState("");
  const [isModal, setModal] = useState(false);
  const [detailUser, setDetailUser] = useState();
  const [rows, setRows] = useState([]);
  const [action, setAction] = useState("");
  const [infoMessage, setInfoMessage] = useState({
    isOpen: false,
    message: "",
    status: "",
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: detailUser?.email || "",
      name: detailUser?.name || "",
      deparment: detailUser?.deparment || "",
      status: detailUser?.status || "",
      role_id: detailUser?.role_id || "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("No email format!").required("Email cannot be blank!"),
      name: Yup.string()
        .min(5, "More than or equal to 6 characters!")
        .max(255, "Less than 255 characters!")
        .required("Name user cannot be blank!"),
      role_id: Yup.string().required("Please add role for user!"),
      deparment: Yup.string().required("Please add department for user!"),
      status: Yup.string().required("Status cannot be blank!"),
    }),
    onSubmit: (values) => {
      const departmentItem = department.filter(
        (item) => item.name === detailUser.deparment
      );
      const newValue = {
        email: values.email,
        name: values.name,
        role_id: values.role_id,
        status: values.status === ACTIVE ? 1 : 0,
        deparment_id: departmentItem[0].id,
      };
      if (action === ADD) {
        dispatch(
          postUser(
            newValue,
            (message) => onSuccess(message),
            (message) => onError(message)
          )
        );
      } else {
        dispatch(
          putUser(
            { id: detailUser.id, data: newValue },
            (message) => onSuccess(message),
            (message) => onError(message)
          )
        );
      }
    },
  });

  useEffect(() => {
    document.title = TITLE_LIST_USER;
    dispatch(getUser());
    dispatch(getListDepartment());
  }, [dispatch]);

  useEffect(() => {
    Object.keys(users).length > 0 &&
      setRows(
        users?.data.map((user) => ({
          ...user,
          name: user?.name,
          id_user: user?.id_user,
          deparment: user?.deparment?.name,
          role: user?.role?.name,
          status: user?.status === 1 ? ACTIVE : IN_ACTIVE,
        }))
      );
  }, [users]);

  const onSuccess = (message) => {
    setInfoMessage({
      isOpen: true,
      status: "success",
      message: message,
    });
    setModal(false);
    action === ADD ?
      dispatch(getUser()) :
      dispatch(searchUser({ keyword: valueSearch, page: users?.current_page }))
  };

  const onError = (message) => {
    setInfoMessage({
      isOpen: true,
      status: "error",
      message: message,
    });
  };

  const handleAddUser = (action) => {
    setAction(action);
    setDetailUser({});
    formik.resetForm();
    setModal(true);
  };

  const closeAddModel = () => {
    setModal(false);
  };

  const handleChangePagination = (event, pageNumber) => {
    dispatch(searchUser({ keyword: valueSearch, page: pageNumber }));
  };

  const handleChangeInput = (event) => {
    const val = event.target.value;
    setValueSearch(val);
    dispatch(searchUser({ keyword: val }));
  };

  const closeModal = () => {
    setModal(false);
  };

  const handleClose = () => {
    setInfoMessage({ isOpen: false });
  };

  const handleChangeForm = (action, event) => {
    const val = event.target.value;
    switch (action) {
      case NAME:
        setDetailUser({
          ...detailUser,
          name: val,
        });
        break;
      default:
        setDetailUser({
          ...detailUser,
          email: val,
        });
        break;
    }
  };

  const handleChangeSelect = (action, event) => {
    const val = event.target.value;
    switch (action) {
      case ROLE:
        setDetailUser({
          ...detailUser,
          role_id: val,
          status: ACTIVE,
        });
        break;
      case DEPARMENT:
        setDetailUser({
          ...detailUser,
          deparment: val,
        });
        break;
      default:
        setDetailUser({
          ...detailUser,
          status: val,
        });
        break;
    }
  };

  const goHome = () => {
    history.push("/");
  };

  const onHandleChooseRow = (row) => {
    setAction("UPDATE");
    setDetailUser(row);
    setModal(true);
  };

  return (
    <Layout>
      <Box p={10} className={classes.root}>
        <Box p={5} className={classes.main}>
          <Title title="List users" variant="h6" align="center" />
          <Box className={classes.header}>
            <Search
              valueSearch={valueSearch}
              handleChangeInput={handleChangeInput}
              goHome={goHome}
              handleAddUser={() => handleAddUser(ADD)}
            />
          </Box>
          <Box className={classes.wapperTable}>
            <List
              page={+users.current_page}
              rows={rows}
              onHandleChooseRow={onHandleChooseRow}
            />
          </Box>
          <Pagination
            count={users.last_page}
            page={+users.current_page}
            onChange={handleChangePagination}
            color="primary"
            className={classes.pagination}
          />
          <Modal
            action={action}
            isOpen={isModal}
            department={department}
            errorName={formik.errors.name}
            errorEmail={formik.errors.email}
            errorDepartment={formik.errors.deparment}
            errorRole={formik.errors.role_id}
            errorStatus={formik.errors.status}
            onCancel={closeAddModel}
            handleClose={closeModal}
            valueInput={formik.values}
            onChangeSelect={handleChangeSelect}
            onChangeInput={handleChangeForm}
            onUpdate={formik.handleSubmit}
          />
        </Box>
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

export default ListUser;
