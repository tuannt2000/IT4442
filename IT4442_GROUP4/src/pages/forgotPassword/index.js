import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { useThemes } from "./style";
import Form from "./Form";
import Message from "../../components/Message";
import { useFormik } from "formik";
import * as Yup from "yup";
import LoginLeft from "../login/LoginLeft";
import { useDispatch } from "react-redux";
import { postEmailForgot } from "../../redux/actions/password";
import { useEffect } from "react";
import { TITLE_FORGOT_PASSWORD } from "../../constants/listTitle";

const ForgotPassword = () => {
  const classes = useThemes();
  const dispatch = useDispatch();

  const [infoMessage, setInfoMessage] = useState({
    isOpen: false,
    message: "",
    status: "",
  });
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    document.title = TITLE_FORGOT_PASSWORD;
  }, []);
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("No email format!")
        .required("Email cannot be blank!"),
    }),
    onSubmit: (values) => {
      setLoading(true);
      dispatch(
        postEmailForgot(
          values,
          (message) => onSuccess(message),
          (message) => onError(message)
        )
      );
    },
  });

  const handleClose = () => {
    setInfoMessage({ isOpen: false });
  };

  const onSuccess = (message) => {
    setLoading(false);
    setInfoMessage({
      isOpen: true,
      status: "success",
      message: message,
    });
  };

  const onError = (message) => {
    setLoading(false);
    setInfoMessage({
      isOpen: true,
      status: "error",
      message: message,
    });
  };

  return (
    <>
      <Grid className={classes.root} container>
        <Grid item xs={6}>
          <LoginLeft />
        </Grid>
        <Grid item xs={6} className={classes.rightPadding}>
          <Form
            check={false}
            valueEmail={formik.values.email}
            onChangeEmail={formik.handleChange}
            handleClick={formik.handleSubmit}
            errorEmail={formik.errors.email}
            isLoading={isLoading}
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

export default ForgotPassword;
