import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { useThemes } from "./style";
import Form from "./Form";
import Message from "../../components/Message";
import { useFormik } from "formik";
import * as Yup from "yup";
import LoginLeft from "../login/LoginLeft";
import { useHistory, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { TITLE_RESET_PASSWORD } from "../../constants/listTitle";
import { useDispatch } from 'react-redux';
import { putEmailReset } from '../../redux/actions/password';

const ResetPassword = () => {
  const classes = useThemes();
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();

  const [isLoading, setLoading] = useState(false);
  const [infoMessage, setInfoMessage] = useState({
    isOpen: false,
    message: "",
    status: "",
  });

  useEffect(() => {
    document.title = TITLE_RESET_PASSWORD;
  }, []);

  const formik = useFormik({
    initialValues: {
      password: "",
      passwordConfirm: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, "Must have at least 6 characters!")
        .required("Please add new password!"),
      passwordConfirm: Yup.string()
        .when("password", {
          is: (val) => (val && val.length > 0 ? true : false),
          then: Yup.string().oneOf(
            [Yup.ref("password")],
            "Incorrect, please check again!"
          ),
        })
        .required("Please add new password confirmation!"),
    }),
    onSubmit: (values) => {
      setLoading(true);
      setLoading(true);
      const token = location.search.slice(7);
      const newArr = {
        token: token,
        password: values.password,
        password_confirmation: values.passwordConfirm
      }
      dispatch(
        putEmailReset(
          newArr,
          (message) => onSuccess(message),
          (message) => onError(message)
        )
      );
    },
  });

  const handleClose = () => {
    setInfoMessage({ isOpen: false });
  };

  const login = () => {
    history.push("/login");
  };

  const onSuccess = (message) => {
    setInfoMessage({
      isOpen: true,
      message: message,
      status: 'success'
    });
    history.push('/login');
  };

  const onError = (message) => {
    setInfoMessage({
      isOpen: true,
      message: message,
      status: 'error'
    });
    setLoading(false);
  };

  return (
    <>
      <Grid className={classes.root} container>
        <Grid item xs={6}>
          <LoginLeft />
        </Grid>
        <Grid item xs={6} className={classes.rightPadding}>
          <Form
            value={formik.values}
            handleClick={formik.handleSubmit}
            onChangePassword={formik.handleChange}
            errorPassword={formik.errors.password}
            handleBack={login}
            errorConfirm={formik.errors.passwordConfirm}
            isLoading={isLoading}
            touchedPassword={formik.touched.password}
            touchedPasswordConfirm={formik.touched.passwordConfirm}
          />
        </Grid>
        <Message
          open={infoMessage.isOpen}
          handleClose={handleClose}
          title={infoMessage.message}
          status={infoMessage.status}
        />
      </Grid>
    </>
  );
};

export default ResetPassword;
