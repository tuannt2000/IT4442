import Layout from "../../layouts/Layout";
import { Box } from "@material-ui/core";
import { useTheme } from "./style";
import DepartmentUI from "./DepartmentUI";
import ModalAddUpdate from "./ModalAddUpdate";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ACTIVE } from "../../constants/department";
import Message from "../../components/Message";
import { connect } from "react-redux";
import {
  createDepartment,
  getDepartment,
  updateDepartment,
} from "../../redux/actions/department";
import { TITLE_LIST_DEPARTMENT } from "../../constants/listTitle";

const Department = (props) => {
  const { department, fetchDepartment, createDepartment, updateDepartment } =
    props;
  const classes = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [rowUpdate, setRowUpdate] = useState();
  const [hasUpdate, setHasUpdate] = useState(false);
  const [idRow, setIdRow] = useState();
  const [infoMessage, setInfoMessage] = useState({
    isOpen: false,
    message: "",
    status: "",
  });
  /**
   * CALL_API
   */
  useEffect(() => {
    document.title = TITLE_LIST_DEPARTMENT;
    fetchDepartment();
  }, [fetchDepartment]);
  /**
   * PAGINATION
   */
  const handleChangePage = (event, numberOfPage) => {
    fetchDepartment({ params: { page: numberOfPage } });
  };
  /**
   * FORMIK
   */
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: rowUpdate?.name || "",
      description: rowUpdate?.description || "",
      status: rowUpdate?.status.toString() || "",
    },
    onSubmit: (values) => {
      hasUpdate ? handleUpdate(values) : handleCreate(values);
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name department cannot be blank!"),
      description: Yup.string().required("Please add description!"),
      status: Yup.string(),
    }),
  });
  /**
   * NOTIFICATION
   */
  const returnMessage = (condition) => {
    switch (condition) {
      case true:
        return "Cập nhật department thất bại!";

      case false:
        return "Tạo department thất bại!";

      default:
        return condition;
    }
  };

  const onSuccess = (message) => {
    setInfoMessage({
      isOpen: true,
      message: message,
      status: "success",
    });
    setIsLoading(false);
    handleCloseModal();
    fetchDepartment({
      params: hasUpdate && { page: department?.current_page },
    });
  };
  const onError = () => {
    setInfoMessage({
      message: returnMessage(hasUpdate),
      isOpen: true,
      status: "error",
    });
    setIsLoading(false);
  };
  /**
   * CREATE
   */
  const handleShowCreate = () => {
    setHasUpdate(false);
    setIsOpen(true);
  };
  const handleCreate = (values) => {
    setIsLoading(true);
    createDepartment({
      params: { ...values, status: ACTIVE },
      onSuccess: (message) => onSuccess(message),
      onError: () => onError(),
    });
  };
  /**
   * UPDATE
   */
  const handleChooseRow = (row) => {
    setHasUpdate(true);
    setIdRow(row.id);
    setRowUpdate(row);
    setIsOpen(true);
  };
  const handleUpdate = (values) => {
    setIsLoading(true);
    updateDepartment({
      id: idRow,
      params: values,
      onSuccess: (message) => onSuccess(message),
      onError: () => onError(),
    });
  };
  /**
   * MODAL
   */
  const handleCloseModal = () => {
    setRowUpdate(null);
    formik.resetForm();
    setIsOpen(false);
  };
  const handleClose = () => {
    setInfoMessage({ ...infoMessage, isOpen: false });
  };
  return (
    <Layout>
      <Box p={10} className={classes.root}>
        <Box p={5} className={classes.main}>
          <DepartmentUI
            rows={department?.data}
            count={department?.last_page}
            page={department?.current_page}
            handleChangePage={handleChangePage}
            handleChooseRow={handleChooseRow}
            handleShowCreate={handleShowCreate}
          />

          <ModalAddUpdate
            isLoading={isLoading}
            isOpen={isOpen}
            handleCloseModal={handleCloseModal}
            hasUpdate={hasUpdate}
            handleChange={formik.handleChange}
            name="name"
            nameValue={formik.values.name}
            nameError={formik.errors.name}
            nameTouched={formik.touched.name}
            description="description"
            descriptionValue={formik.values.description}
            descriptionError={formik.errors.description}
            descriptionTouched={formik.touched.description}
            status="status"
            statusValue={formik.values.status}
            handleUpdate={formik.submitForm}
            handleCreate={formik.submitForm}
          />

          <Message
            open={infoMessage.isOpen}
            handleClose={handleClose}
            title={infoMessage.message}
            status={infoMessage.status}
          />
        </Box>
      </Box>
    </Layout>
  );
};

Department.defaultProps = {
  department: {},
};

Department.propTypes = {
  department: PropTypes.object,
  fetchDepartment: PropTypes.func,
  createDepartment: PropTypes.func,
  updateDepartment: PropTypes.func,
};

const mapStateToProps = (store) => {
  return {
    department: store.department.department,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchDepartment: (params) => {
      dispatch(getDepartment(params));
    },
    createDepartment: (params) => {
      dispatch(createDepartment(params));
    },
    updateDepartment: (params) => {
      dispatch(updateDepartment(params));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Department);
